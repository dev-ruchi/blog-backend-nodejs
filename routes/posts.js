import "dotenv/config";
import express from "express";
import Post from "../models/post.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:id", (req, res) => {
  res.send("Fetch post by id");
});

router.post("/", (req, res) => {
  res.send("Create new post");
});

router.put("/:id", (req, res) => {
  res.send("Update post by id");
});

router.delete("/:id", (req, res) => {
  res.send("Delete post by id");
});

export default router;
