import express from "express";
import bcrypt from "bcryptjs";
import AuthModel from "../model/auth.js";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  try {
    const employees = AuthModel.create(req.body);
    res.json(employees);
  } catch (err) {
    res.json(err);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthModel.findOne({ email: email });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        res.json("Success");
      } else {
        res.json("Password is incorrect");
      }
    } else {
      res.json("No record existed");
    }
  } catch (err) {
    res.json(err);
  }
});

export default authRouter;
