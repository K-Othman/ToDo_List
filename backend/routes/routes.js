import express from "express";
import Model from "../model/model.js";

const router = express.Router();

// Get ToDos
router.get("/todos", async (req, res) => {
  try {
    const getAllData = await Model.find();
    res.json(getAllData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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
router.put("/todo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const updatedBody = await Model.findByIdAndUpdate(id, update);
    res.json(updatedBody);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete todo
router.delete("/todo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send("ToDo has been deleted successfully!");
  } catch (err) {
    res(400).json({ message: err.message });
  }
});

export default router;
