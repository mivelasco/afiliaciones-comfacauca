import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import Afiliacion from "./models/Afiliacion.js";
import Tesseract from "tesseract.js";
// Remember to give "Sharp" a try, it can help with image preprocessing before OCR, improving accuracy significantly.

/* INTENTO CONEXION OCR TESSERACT*/

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

// CONEXIÓN A MONGO DB
mongoose.connect("mongodb://mongo:27017/afiliaciones")
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

      const rutaCedula = req.files.cedula?.[0]?.path;

      let textoOCR = "";
      let cedulaExtraida = "";
      let nombreExtraido = "";

      if (rutaCedula) {

        const resultado = await Tesseract.recognize(
          rutaCedula,
          "spa"
        );

        textoOCR = resultado.data.text;

        console.log("=== TEXTO OCR ===");
        console.log(textoOCR);

        // EXTRAER DATOS
        const matchCedula = textoOCR.match(/\d{3}\.?\d{3}\.?\d{3}/);

        nombreExtraido = textoOCR;

        cedulaExtraida = matchCedula?.[0] || "";

        console.log("=== DATOS EXTRAIDOS ===");

        console.log({
          cedula: cedulaExtraida,
          nombre: nombreExtraido
        });
      }

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

      res.json({
        mensaje: "Afiliación procesada",

        ocr: {
          texto: textoOCR,
          cedula: cedulaExtraida,
          nombre: nombreExtraido
        }
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        error: "Error al guardar"
      });
    }
});

/* PUERTO */
app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});