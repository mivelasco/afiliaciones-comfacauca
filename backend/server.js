import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import Afiliacion from "./models/Afiliacion.js";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* CONEXIÓN A MONGO */
mongoose.connect("mongodb://127.0.0.1:27017/afiliaciones")
  .then(() => console.log("Mongo conectado"))
  .catch(err => console.log(err));

/* RUTA TEST */
app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.post("/afiliacion",
  upload.fields([
    { name: "cedula" },
    { name: "escolar" },
    { name: "discapacidad" }
  ]),
  async (req, res) => {

    try {
      const nueva = new Afiliacion({
        nombre: req.body.nombre,
        cedula: req.body.cedula,
        tipoAfiliacion: req.body.tipoAfiliacion,
        subtipo: req.body.subtipo,

        documentos: {
          cedula: req.files.cedula?.[0]?.filename,
          escolar: req.files.escolar?.[0]?.filename,
          discapacidad: req.files.discapacidad?.[0]?.filename
        }
      });

      await nueva.save();

      res.json({ mensaje: "Afiliación guardada correctamente" });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al guardar" });
    }
});

/* PUERTO */
app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});