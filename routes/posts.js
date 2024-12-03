import "dotenv/config";
import express from "express";
import { validationResult } from "express-validator";
import Post from "../models/post.js";
import createPostRules from "../rules/createPost.js";
import mongoose from "mongoose";

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

router.post("/", ...createPostRules, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, body, tags, likes } = req.body;

  const hardcodedAuthor = new mongoose.Types.ObjectId("674cf4c4885bbc8c0f2202d8");

  // Create the new post
  const newPost = new Post({
    title,
    body,
    author: hardcodedAuthor,
    tags: tags || [], // Default to an empty array if no tags are provided
    likes: likes || 0, // Default to 0 likes if not provided
  });

  try {
    // Save the post to the database
    const savedPost = await newPost.save();
    res.status(201).json({
      message: "Post created successfully",
      post: savedPost,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.put("/:id", (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, body, author, tags } = req.body;

  const updatePost = {
    title,
    body,
    author,
    tags,
  };

  Post.updateOne({ _id: req.params.id }, updatePost)
    .then(() => {
      res.status(200).json({
        message: "Post updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

router.delete("/:id", (req, res) => {
  Post.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

export default router;
