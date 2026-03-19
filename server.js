require("dotenv").config();
const app = require("./app");
const connectDatabase = require("./config/db");

async function startServer() {
    try {
        await connectDatabase();
    
        const PORT = process.env.PORT || 3000;
        
        app.listen(PORT, () => {
            console.log(`Server is running at PORT: ${PORT}`);
        })
        
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
}

startServer();