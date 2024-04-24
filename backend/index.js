import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
dotenv.config();
const mongoString = process.env.DATABASE_URL;
const app = express();
app.use(express.json());
app.use("/api", routes);

const port = 8800;

mongoose.connect(mongoString, { dbName: "ToDo_List" }).then(() => {
  console.log("Database is Connected Successfully!");
});

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
