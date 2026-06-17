import http from "http";
import { MongoClient, ObjectId } from "mongodb";

const PORT = Number(process.env.API_PORT || 3001);
const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB = process.env.MONGO_DB || "quan2qual";
const MONGO_DEBUG = process.env.MONGO_DEBUG === "true";

const SUPPORTED_ACTIONS = new Set([
  "find",
  "findOne",
  "insertOne",
  "updateOne",
  "deleteOne",
  "deleteMany"
]);

if (!MONGO_URI) {
  console.error("Missing MONGO_URI. Configure it in .env.server");
  process.exit(1);
}

const client = new MongoClient(MONGO_URI);

function log(stage, details = {}) {
  if (!MONGO_DEBUG) return;
  console.log(`[api] ${stage}`, details);
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", reject);
  });
}

function convertExtendedJson(value) {
  if (Array.isArray(value)) {
    return value.map(convertExtendedJson);
  }

  if (value && typeof value === "object") {
    if (Object.keys(value).length === 1 && value.$oid) {
      return new ObjectId(value.$oid);
    }

    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [key, convertExtendedJson(nested)])
    );
  }

  return value;
}

function serializeMongoValue(value) {
  if (value instanceof ObjectId) {
    return value.toString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (Array.isArray(value)) {
    return value.map(serializeMongoValue);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [key, serializeMongoValue(nested)])
    );
  }

  return value;
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  res.end(JSON.stringify(payload));
}

async function executeAction(db, action, payload) {
  const collection = db.collection(payload.collection);
  const filter = convertExtendedJson(payload.filter || {});
  const update = convertExtendedJson(payload.update || {});
  const document = convertExtendedJson(payload.document || {});

  switch (action) {
    case "find": {
      const documents = await collection.find(filter).toArray();
      return { documents: serializeMongoValue(documents) };
    }
    case "findOne": {
      const doc = await collection.findOne(filter);
      return { document: serializeMongoValue(doc) };
    }
    case "insertOne": {
      const result = await collection.insertOne(document);
      return { insertedId: result.insertedId.toString() };
    }
    case "updateOne": {
      const result = await collection.updateOne(filter, update);
      return {
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
        upsertedId: result.upsertedId ? result.upsertedId.toString() : null
      };
    }
    case "deleteOne": {
      const result = await collection.deleteOne(filter);
      return { deletedCount: result.deletedCount };
    }
    case "deleteMany": {
      const result = await collection.deleteMany(filter);
      return { deletedCount: result.deletedCount };
    }
    default:
      throw new Error(`Unsupported action: ${action}`);
  }
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "OPTIONS") {
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === "GET" && req.url === "/api/health") {
      const db = client.db(MONGO_DB);
      const ping = await db.command({ ping: 1 });
      sendJson(res, 200, {
        ok: true,
        db: MONGO_DB,
        mongoPing: ping?.ok === 1,
        timestamp: new Date().toISOString()
      });
      return;
    }

    if (req.method !== "POST" || !req.url?.startsWith("/api/mongo/")) {
      sendJson(res, 404, { error: "Not found" });
      return;
    }

    const action = req.url.split("/").pop();

    if (!SUPPORTED_ACTIONS.has(action)) {
      sendJson(res, 400, { error: `Action not supported: ${action}` });
      return;
    }

    const payload = await parseJsonBody(req);

    if (!payload.collection) {
      sendJson(res, 400, { error: "Missing collection" });
      return;
    }

    const dbName = payload.database || MONGO_DB;
    const db = client.db(dbName);

    log("request", {
      action,
      collection: payload.collection,
      database: dbName
    });

    const result = await executeAction(db, action, payload);
    sendJson(res, 200, result);
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Unexpected server error" });
  }
});

await client.connect();

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Set API_PORT in .env.server to another value.`);
    process.exit(1);
  }

  console.error("API server failed to start:", error.message);
  process.exit(1);
});

server.listen(PORT, () => {
  console.log(`Mongo API server running on http://localhost:${PORT}`);
});
