import express from "express";
import cors from "cors";
import PeliculaRouter from "./src/controllers/peliculaController.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/movies", PeliculaRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });