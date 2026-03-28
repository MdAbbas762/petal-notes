require("dotenv").config();
const app = require("./app");
const connectDatabase = require("./config/db");

console.log("DB URI at runtime:", process.env.DB_URI); // DEBUG

async function startServer() {
  try {
    await mongoose.connect(process.env.DB_URI, {
      serverSelectionTimeoutMS: 5000
    });

    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ MongoDB Connection FAILED:", err.message);
    process.exit(1); // stop app if DB fails
  }
}

startServer();