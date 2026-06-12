import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import Afiliacion from "./models/Afiliacion.js";
import Tesseract from "tesseract.js";
import { fromPath } from "pdf2pic";
import sharp from "sharp"; // Remember to give "Sharp" a try, it can help with image preprocessing before OCR, improving accuracy significantly.
//import path from "path";

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

      const archivo = req.files.cedula?.[0];
      let rutaCedula = archivo?.path;

      /** DEBUG: Información del archivo recibido */
      console.log("=== INFORMACIÓN DEL ARCHIVO RECIBIDO ===");
      console.log("Archivo:", archivo);
      console.log("Tipo de archivo:", archivo.mimetype);
      console.log("Archivo recibido:", archivo?.originalname);
      console.log("Mimetype:", archivo?.mimetype);
      console.log("Ruta inicial:", rutaCedula);

      let textoOCR = "";
      let cedulaExtraida = "";
      let nombreExtraido = "";

      if (rutaCedula) {

        if (archivo.mimetype === "application/pdf") {

          console.log("Convirtiendo PDF a imagen...");

          const convert = fromPath(rutaCedula, {
            density: 300,
            saveFilename: "pdf_convertido",
            savePath: "./uploads",
            format: "png",
            width: 2000,
            height: 2000
          });

          const pagina = await convert(1);

          rutaCedula = pagina.path;

          console.log("PDF convertido:", rutaCedula);

        } 
        
        try {

          const rutaProcesada = "uploads/procesada.png";

          await sharp(rutaCedula)
            .grayscale()
            .threshold(150)
            //.normalise()
            .sharpen()
            .png()
            .toFile(rutaProcesada);

          rutaCedula = rutaProcesada;

          console.log("Imagen procesada:", rutaCedula);

          console.log("OCR usando archivo:", rutaCedula);
          
          const resultado = await Tesseract.recognize(
            rutaCedula,
            "spa"
          );

          textoOCR = resultado.data.text;

          const textoOriginal = textoOCR;

          textoOCR = textoOCR
            .replace(/[|._»«"“”]/g, " ")
            .replace(/\d+/g, " ")
            .replace(/\s+/g, " ");
          
          const matchCedula = textoOriginal.match(/\d[\d.\s]{7,15}\d/);

          cedulaExtraida = matchCedula?.[0]
            .replace(/\s/g, "")
            || "";

          const palabras = textoOCR.match(/[A-ZÁÉÍÓÚÑ]{3,}/g) || [];

          console.log("=== PALABRAS ===");
          console.log(palabras);

          const ignorar = [
            "REPÚBLICA",
            "COLOMBIA",
            "IDENTIFICACIÓN",
            "PERSONAL",
            "CÉDULA",
            "CIUDADANÍA",
            "APELLIDOS"
          ];

          const nombres = palabras.filter(
            palabra => !ignorar.includes(palabra)
          );

          nombreExtraido = nombres.join(" ");

          console.log("Confianza OCR:", resultado.data.confidence);

          console.log("=== TEXTO OCR ===");
          console.log(textoOCR);

          console.log("=== DATOS EXTRAIDOS ===");

          console.log({
            cedula: cedulaExtraida,
            nombre: nombreExtraido
          });

        } catch (error) {

          console.log("=== ERROR OCR ===");
          console.error(error);

          textoOCR = "";
          nombreExtraido = "";
          cedulaExtraida = "";

        }

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