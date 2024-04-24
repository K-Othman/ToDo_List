import express from "express";
import Model from "../model/model.js";

const router = express.Router();

// Get ToDos
router.get("/todos", (req, res) => {
  res.send("Get All API");
});

// Add todos
router.post("/todos", async (req, res) => {
  const data = new Model({
    todo: req.body.todo,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update todo
router.put("/todo/:id", (req, res) => {});

// Delete todo
router.delete("/todo/:id", (req, res) => {});

export default router;
