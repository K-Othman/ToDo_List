import express, { Router } from "express";
import cors from "cors";
import AuthModel from "../model/auth.js";

const authRouter = express.Router();

authRouter.get("/login", cors(), (req, res) => {});

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
      if (user.password === password) {
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
