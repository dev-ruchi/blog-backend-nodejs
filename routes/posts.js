import "dotenv/config";
import express from "express";
import { validationResult } from "express-validator";
import { auth } from "./middlewares/auth.middleware.js";
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

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  // Validate if the `id` is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  try {
    // Query the database for the post
    const post = await Post.findById(id);

    if (!post) {
      // Handle case when the post is not found
      return res.status(404).json({ message: "Post not found" });
    }

    // If the post exists, return it
    res.status(200).json(post);
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/", ...createPostRules, auth, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, body, tags, likes } = req.body;

  // Create the new post
  const newPost = new Post({
    title,
    body,
    author: req.userId,
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

router.post("/:id/comments", async (req, res) => {
  const { id } = req.params;

  // Validate if the `id` is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  try {
    // Find the post by its ID and push the new comment into the comments array
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $push: { comments: req.body } },
      { new: true } // Return the updated document
    )
      .populate("comments.author", "name") // Populate author field if needed
      .exec();

    if (!updatedPost) {
      console.log("Post not found!");
      return null;
    }

    // TODO: Send the added comment in response
    return res.json({ message: "Comment added successfully" });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
});

export default router;
