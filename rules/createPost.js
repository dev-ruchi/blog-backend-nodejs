import User from "../models/user.js";
import { body } from "express-validator";

export default [
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ max: 100 })
    .withMessage("Title must be at most 100 characters long"),
  body("body").notEmpty().withMessage("Body is required"),
  // body("author")
  //   .isMongoId()
  //   .withMessage("Author must be a valid ObjectId")
  //   .custom(async (value) => {
  //     // Check if the author exists in the database
  //     const user = await User.findById(value);
  //     if (!user) {
  //       throw new Error("Author does not exist");
  //     }
  //   }),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array of strings")
    .custom((tags) => {
      tags.forEach((tag) => {
        if (typeof tag !== "string") {
          throw new Error("Each tag must be a string");
        }
      });
      return true;
    }),
  body("likes")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Likes must be a non-negative integer"),
];
