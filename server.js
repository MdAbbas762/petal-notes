require("dotenv").config();
const app = require("./app");
const connectDatabase = require("./config/db");

async function startServer() {
    try {
        await connectDatabase();
    
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running at PORT: ${process.env.PORT}`);
        })
        
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
}

startServer();