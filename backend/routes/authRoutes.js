import express, { Router } from "express";
import cors from "cors";
import AuthModel from "../model/auth.js";

const authRouter = express.Router();

authRouter.get("/login", cors(), (req, res) => {});

// authRouter.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const check = await Model.findOne({ email: email });
//     if (check) {
//       res.json("exist");
//     } else {
//       res.json("Not exist");
//     }
//   } catch (err) {
//     res.json("Not exist");
//   }
// });
authRouter.post("/register", async (req, res) => {
  try {
    const employees = AuthModel.create(req.body);
    res.json(employees);
  } catch (err) {
    res.json(err);
  }
});

// authRouter.post("/signup", async (req, res) => {
//   const { email, password } = req.body;
//   const data = {
//     email: email,
//     password: password,
//   };

//   try {
//     const check = await Model.findOne({ email: email });
//     if (check) {
//       res.json("exist");
//     } else {
//       res.json("Not exist");
//       await Model.insertMany([data]);
//     }
//   } catch (err) {
//     res.json("Not exist");
//   }
// });

export default authRouter;
