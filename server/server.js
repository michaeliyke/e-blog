import express, { json } from "express";
import blogRouter from "./routes/route_blog";
import userRouter from "./routes/route_user";

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "127.0.0.1";

const app = express();
app.use(json());
app.use("/blogs", blogRouter);
app.use("/users", userRouter);

app.listen(PORT, HOST, () => console.log("listening"));
