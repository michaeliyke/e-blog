if (process.env.NODE_ENV !== "production") {
  const dotenv = await import("dotenv");
  dotenv.config();
}

import express, { json } from "express";
import mongoose from "mongoose";
import indexRoute from "./routes/index.js";
import usersRoute from "./routes/route_user.js";
import blogsRoute from "./routes/route_blog.js";

const app = express();
app.use(json());

app.use(indexRoute);
app.use("/api/users", usersRoute);
app.use("/api/blogs", blogsRoute);

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log("DB connected");
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`App listening on port: ${port}`));
  })
  .catch((err) => console.log("Failed to connect to db:", err));
