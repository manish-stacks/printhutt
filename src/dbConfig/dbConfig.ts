import mongoose from "mongoose";
mongoose.connection.setMaxListeners(50);

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

/*
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
*/