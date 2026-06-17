const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const MONGO_DEBUG = import.meta.env.VITE_MONGO_DEBUG === "true";

function mongoLog(stage, details = {}) {
  if (!MONGO_DEBUG) return;
  console.log(`[mongo] ${stage}`, details);
}

function summarizeMongoResult(result) {
  return {
    hasDocument: Boolean(result?.document),
    documentsCount: Array.isArray(result?.documents) ? result.documents.length : undefined,
    insertedId: result?.insertedId,
    matchedCount: result?.matchedCount,
    modifiedCount: result?.modifiedCount,
    deletedCount: result?.deletedCount
  };
}

export default async function requestMongo(collection, body, action) {
  const startedAt = Date.now();
  const requestId = `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;

  const payload = {
    collection,
    ...(body && typeof body === "object" ? body : {})
  };

  const endpoint = `${API_BASE_URL}/api/mongo/${action}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const result = await response.json().catch(() => ({}));

  mongoLog("data-response", {
    requestId,
    action,
    collection,
    status: response.status,
    durationMs: Date.now() - startedAt,
    summary: summarizeMongoResult(result)
  });

  if (!response.ok) {
    mongoLog("data-error", {
      requestId,
      action,
      collection,
      status: response.status,
      error: result?.error || response.statusText
    });

    throw new Error(`Mongo request failed (${response.status}): ${result?.error || response.statusText}`);
  }

  return result;
}
