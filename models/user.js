import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes leading and trailing whitespace
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate emails
      lowercase: true, // Converts email to lowercase
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String, // URL to the user's profile picture
      default: "", // Default value if no picture is provided
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Roles can be extended
      default: "user",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the User model
const User = mongoose.model("User", userSchema);

export default User;
