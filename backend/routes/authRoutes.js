import express from "express";
import bcrypt from "bcryptjs";
import AuthModel from "../model/auth.js";
import jwt from "jsonwebtoken";

const authRouter = express.Router();
const secretKey = process.env.TOKEN_SECRET;

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

// authRouter.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await AuthModel.findOne({ email: email });
//     if (user) {
//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (isPasswordValid) {
//         const userPayload = {
//           id: user._id,
//           email: user.email,
//         };

//         const token = jwt.sign(userPayload, secretKey, { expiresIn: "1h" });
//         res.status(200).json({ token: token });
//       } else {
//         res.status(401).json("Invalid credentials");
//       }
//     } else {
//       res.status(401).json("Invalid credentials");
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json("An error occurred");
//   }
// });

export default authRouter;
