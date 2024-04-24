import express from "express";

const router = express.Router();

// Get ToDos
router.get("/todos", (req, res) => {
  res.send("Get All API");
});

// Add todos
router.post("/todos", (req, res) => {
  res.send("Posting API");
});

// Update todo
router.put("/todo/:id", (req, res) => {});

// Delete todo
router.delete("/todo/:id", (req, res) => {});

export default router;
