const baseUrl = process.env.CHECK_BASE_URL || "http://localhost:3001";

async function run() {
  const healthUrl = `${baseUrl}/api/health`;

  try {
    const response = await fetch(healthUrl);
    const payload = await response.json();

    if (!response.ok || payload.ok !== true) {
      console.error("Health check failed", { status: response.status, payload });
      process.exit(1);
    }

    console.log("Health check passed", {
      status: response.status,
      db: payload.db,
      mongoPing: payload.mongoPing,
      timestamp: payload.timestamp
    });
  } catch (error) {
    console.error("Health check request failed", error.message);
    process.exit(1);
  }
}

run();
