import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
const MONGO_DB = process.env.MONGO_DB || "quan2qual";

let cachedClient;

async function getClient() {
  if (cachedClient) return cachedClient;

  if (!MONGO_URI) {
    throw new Error("Missing Mongo URI env var. Set MONGO_URI or MONGODB_URI in Vercel Project Settings -> Environment Variables.");
  }

  cachedClient = new MongoClient(MONGO_URI);
  await cachedClient.connect();
  return cachedClient;
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