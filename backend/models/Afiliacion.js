import mongoose from "mongoose";

const afiliacionSchema = new mongoose.Schema({
  nombre: String,
  cedula: String,
  tipoAfiliacion: String,
  subtipo: String,

  documentos: {
    cedula: String,
    escolar: String,
    discapacidad: String
  },

  fecha: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Afiliacion", afiliacionSchema);