import mongoose from "mongoose";

export async function connect() {
    try {
        if (!process.env.MONGO_URL) {
            console.error("MongoDB connection string (MONGO_URL) is not defined in environment variables.");
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection;
        
        connection.on("connected", () => {
            console.log("MongoDB connected");
        });
        connection.on("error", (error) => {
            console.error("MongoDB connection error:", error);
            process.exit(1);
        });
        connection.on("disconnected", () => {
            console.log("MongoDB disconnected");
        });
    } catch (error) {
        console.error("Something went wrong connecting to MongoDB:", error);
        process.exit(1);
    }
}