import express, { json } from "express";
import blogRouter from "./routes/BlogRouter.js";
import userRouter from "./routes/UserRouter.js";
import mongoose from "./engine/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";

const app = express();
app.use(json());
app.use(cookieParser());

// allow cors to enable cross origin requests from port 5000
app.use(
  cors({
    origin: "http://127.0.0.1:5000",
    credentials: true,
  })
);

// check the status of the server
app.get("/status", (req, res) => {
  return res.status(200).json({ status: "OK" });
});

// the blogs route
app.use("/blogs", blogRouter);

app.use("/users", userRouter);

// wait until the database is up before running the server
mongoose.connection.once("open", () => {
  app.listen(PORT, HOST, () => {
    console.log("Server is running!");
  });
});
