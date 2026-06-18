import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
const MONGO_DB = process.env.MONGO_DB || "quan2qual";

let cachedClient;
let cachedClientPromise;

async function getClient() {
  if (!MONGO_URI) {
    throw new Error("Missing Mongo URI env var. Set MONGO_URI or MONGODB_URI in Vercel Project Settings -> Environment Variables.");
  }

  if (cachedClient) {
    try {
      await cachedClient.db(MONGO_DB).command({ ping: 1 });
      return cachedClient;
    } catch {
      cachedClient = undefined;
      cachedClientPromise = undefined;
    }
  }

  if (!cachedClientPromise) {
    const client = new MongoClient(MONGO_URI);
    cachedClientPromise = client
      .connect()
      .then(() => {
        cachedClient = client;
        return client;
      })
      .catch(async (error) => {
        cachedClientPromise = undefined;
        try {
          await client.close();
        } catch {
          // Ignore cleanup errors.
        }
        throw error;
      });
  }

  return cachedClientPromise;
}

export default async function handler(_req, res) {
  try {
    const client = await getClient();
    const db = client.db(MONGO_DB);
    const ping = await db.command({ ping: 1 });

    return res.status(200).json({
      ok: true,
      db: MONGO_DB,
      mongoPing: ping?.ok === 1,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message || "Health check failed",
      timestamp: new Date().toISOString()
    });
  }
}