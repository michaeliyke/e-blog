import { Router } from "express";

const indexRoute = Router();

indexRoute.get("/", (req, res) => {
  return res.send("Hello e-blog!");
});

export default indexRoute;
