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
router.put("/todo/:_id", async (req, res) => {
  try {
    const id = req.params._id;
    const update = { done: req.body.done };
    const updatedBody = await Model.findByIdAndUpdate(id, update, {
      new: true,
    });
    res.json(updatedBody);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete todo
router.delete("/todo/:_id", async (req, res) => {
  try {
    const id = req.params._id;
    const data = await Model.findByIdAndDelete(id);
    res.send("ToDo has been deleted successfully!");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
