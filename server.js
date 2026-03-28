require("dotenv").config();
const app = require("./app");
const connectDatabase = require("./config/db");

console.log("DB URI at runtime:", process.env.DB_URI);

async function startServer() {
  try {
    await connectDatabase();

    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ MongoDB Connection FAILED:", err.message);
    process.exit(1);
  }
}

startServer();