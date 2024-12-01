import mongoose from "mongoose";

// Define the Comment schema for embedded comments
const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false } // Comments are not standalone documents, so no _id field
);

// Define the Post schema
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String], // Array of tags
    },
    comments: [commentSchema], // Embedded comments
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Post model
const Post = mongoose.model("Post", postSchema);

export default Post;
