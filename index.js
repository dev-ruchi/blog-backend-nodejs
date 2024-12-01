import express from "express";
const app = express();
const port = 3000;

import postsRouter from "./routes/posts.js";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/posts", postsRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
