import mongoose from "mongoose";
import "dotenv/config";

const MongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017";

// console.log("Mongo url:", MongoUrl);
// connect to the data base using mongoose
mongoose
  .connect(MongoUrl, {
    connectTimeoutMS: 60000,
    retryWrites: true,
    w: "majority",
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
