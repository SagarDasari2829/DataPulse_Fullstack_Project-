const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");
const initializeWebSocketServer = require("./websocket/socket");
const { syncPostsFromExternalAPI } = require("./controllers/postController");

const server = http.createServer(app);
const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    await connectDB();

    try {
      const syncResult = await syncPostsFromExternalAPI();
      console.log(
        `Post sync complete. Fetched: ${syncResult.totalFetched}, Inserted: ${syncResult.inserted}, Updated: ${syncResult.updated}`
      );
    } catch (error) {
      console.error("Post sync skipped:", error.message);
    }

    server.listen(PORT, () => {
      console.log(`HTTP server running on port ${PORT}`);
    });

    initializeWebSocketServer(server);
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
