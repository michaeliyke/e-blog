/**
 * This module connects to MongoDB using the Mongoose library.
 *
 * Environment variables:
 * - `MONGO_URL`: The URL of the MongoDB instance to connect to.
 */

import mongoose from "mongoose";
import "dotenv/config";

const MongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017";

export async function connectToDB() {
  // this function will call it self after 5 seconds on error
  // connect to Mongodb atlas
  try {
    await mongoose.connect(MongoUrl, {
      connectTimeoutMS: 60000,
      retryWrites: true,
      appName: "e-blog-db",
    });
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database failed to connect due to this error:", err);
    console.log("Retrying to connect to the database in 5 seconds...");
    setTimeout(connectToDB, 5000); // Retry connection after 5 seconds
  }
}
