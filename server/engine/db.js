/**
 * This module connects to MongoDB using the Mongoose library.
 *
 * Environment variables:
 * - `MONGO_URL`: The URL of the MongoDB instance to connect to.
 */

import mongoose from "mongoose";
import "dotenv/config";

const MongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017";

// connect to the data base using mongoose
mongoose
  .connect(MongoUrl, {
    connectTimeoutMS: 60000,
    retryWrites: true, // Allows MongoDB to retry failed write operations
    appName: "e-blog-db",
  })
  .then(() => {
    console.log("Database connected successfuly");
  })
  .catch((err) => {
    console.log("Database failed to load do to this err:\n");
    console.log(err);
  });

export default mongoose;
