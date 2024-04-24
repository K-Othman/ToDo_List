import express from "express";

const port = 8800;

const app = express();
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("TESTingg");
});

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
