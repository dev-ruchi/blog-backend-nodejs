import express from "express";
const router = express.Router();

router.get("/", function (req, res) {
  res.send("Fetch all posts");
});

router.get("/:id", function (req, res) {
  res.send("Fetch post by id");
});

router.post("/", function (req, res) {
  res.send("Create new post");
});

router.put("/:id", function (req, res) {
  res.send("Update post by id");
});

router.delete("/:id", function (req, res) {
  res.send("Delete post by id");
});

export default router;
