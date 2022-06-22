import express from "express";
import cors from "cors";
import PreguntaRouter from "./src/controllers/preguntaController.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/pregunta", PreguntaRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });