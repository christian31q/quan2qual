import { MongoClient, ObjectId } from "mongodb";

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
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

let cachedClient;

function log(stage, details = {}) {
  if (!MONGO_DEBUG) return;
  console.log(`[api] ${stage}`, details);
}

async function getClient() {
  if (cachedClient) return cachedClient;

  if (!MONGO_URI) {
    throw new Error("Missing Mongo URI env var. Set MONGO_URI or MONGODB_URI in Vercel Project Settings -> Environment Variables.");
  }

  cachedClient = new MongoClient(MONGO_URI);
  await cachedClient.connect();
  return cachedClient;
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

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const action = req.query?.action;

    if (!SUPPORTED_ACTIONS.has(action)) {
      return res.status(400).json({ error: `Action not supported: ${action}` });
    }

    const payload = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};

    if (!payload.collection) {
      return res.status(400).json({ error: "Missing collection" });
    }

    const client = await getClient();
    const dbName = payload.database || MONGO_DB;
    const db = client.db(dbName);

    log("request", {
      action,
      collection: payload.collection,
      database: dbName
    });

    const result = await executeAction(db, action, payload);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message || "Unexpected server error" });
  }
}
