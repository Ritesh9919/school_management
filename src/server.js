import dotenv from "dotenv";
dotenv.config();
import express from "express";
import schoolRouter from "./routes/school.route.js";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Live School management API");
});

app.use("/api/school", schoolRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
