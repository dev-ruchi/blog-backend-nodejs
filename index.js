import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("Failed to connect to DB:", err));

const app = express();
app.use(bodyParser.json());
const port = 3000;

import postsRouter from "./routes/posts.js";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/posts", postsRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
