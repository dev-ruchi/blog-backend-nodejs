import "dotenv/config";
import express from "express";
import { validationResult } from "express-validator";
import User from "../models/user.js";
import createUserRules from "../rules/createUser.js";

const router = express.Router();


router.post("/", ...createUserRules, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;

    // Create and save the user
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
