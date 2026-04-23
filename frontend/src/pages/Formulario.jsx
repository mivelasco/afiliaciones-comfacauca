import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";

function Formulario() {
  const navigate = useNavigate();

  const [cedulaFile, setCedulaFile] = useState(null);
  const [escolarFile, setEscolarFile] = useState(null);
  const [discapacidadFile, setDiscapacidadFile] = useState(null);

  const [formData, setFormData] = useState({
    nombre: "",
    cedula: "",
    tipoAfiliacion: "",
    subtipo: "",
  });

  const opciones = {
    Trabajador: ["Dependiente", "Independiente", "Pensionado"],
    Beneficiario: ["Cónyuge", "Hijo", "Hijastro", "Padre", "Hermano"]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si cambia el tipo, reiniciamos el subtipo
    if (name === "tipoAfiliacion") {
        setFormData({
        ...formData,
        tipoAfiliacion: value,
        subtipo: ""
        });
    } else {
        setFormData({
        ...formData,
        [name]: value,
        });
    }
  };

  const handleSubmit = async () => {
    try {
      const form = new FormData();

      form.append("nombre", formData.nombre);
      form.append("cedula", formData.cedula);
      form.append("tipoAfiliacion", formData.tipoAfiliacion);
      form.append("subtipo", formData.subtipo);

      if (cedulaFile) form.append("cedula", cedulaFile);
      if (escolarFile) form.append("escolar", escolarFile);
      if (discapacidadFile) form.append("discapacidad", discapacidadFile);

      const res = await fetch("http://localhost:3000/afiliacion", {
        method: "POST",
        body: form
      });

      const data = await res.json();
      console.log(data);

      navigate("/validacion");

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>

      {/* HEADER */}
      <header style={headerStyle}>
        <img src="/logo.png" alt="logo" style={{ height: "50px" }} />
      </header>

      {/* NAVBAR */}
      <nav style={navStyle}>
        <div style={navLinksStyle}>
          <span>INFORMACION</span>
          <span style={{ color: "green" }}>SOLICITUD DE AFILIACIÓN</span>
        </div>
        
        {/* ICONOS DE LAS REDES SOCIALES (Aun no me decido si esto es necesario)*/}
        <div style={socialIconsStyle}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={iconLinkStyle}>
            <FaFacebook size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={iconLinkStyle}>
            <FaInstagram size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={iconLinkStyle}>
            <FaTwitter size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={iconLinkStyle}>
            <FaLinkedin size={20} />
          </a>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" style={iconLinkStyle}>
            <FaWhatsapp size={20} />
          </a>
        </div>
      </nav>

      {/* CONTENIDO */}
      <div style={containerStyle}>
        <h2>Solicitud de Afiliación</h2>

        <h3>Datos del afiliado</h3>

        <input name="nombre" placeholder="Nombre completo" onChange={handleChange} style={inputStyle} />
        <input name="cedula" placeholder="Cédula" onChange={handleChange} style={inputStyle} />

        <label>Tipo de Afiliacion</label>
        <select name="tipoAfiliacion" onChange={handleChange} value={formData.tipoAfiliacion} style={inputStyle}>
          <option value="">Tipo de afiliación</option>
          <option>Trabajador</option>
          <option>Beneficiario</option>
        </select>
        
        {formData.tipoAfiliacion && (
          <select name="subtipo" onChange={handleChange} value={formData.subtipo} style={inputStyle}
          >
            <option value="">Seleccione subtipo</option>
            {opciones[formData.tipoAfiliacion].map((op, index) => (
            <option key={index}>{op}</option>
            ))}
          </select>
        )}

        <h3>Documentos</h3>

        <label>Cédula (PNG/PDF)</label>
        <input type="file" style={inputStyle} onChange={(e) => setCedulaFile(e.target.files[0])} />

        <label>Certificado escolar</label>
        <input type="file" style={inputStyle} onChange={(e) => setEscolarFile(e.target.files[0])} />

        <label>Certificado discapacidad (opcional)</label>
        <input type="file" style={inputStyle} onChange={(e) => setDiscapacidadFile(e.target.files[0])} />

        <label>Certificado Supervivencia (opcional?)</label> {/* Aun no recuerdo si esto es necesario, pero lo dejo por si acaso */}
        <input type="file" style={inputStyle} />

        <button onClick={handleSubmit} style={buttonStyle}>
          Procesar
        </button>
      </div>

    </div>
  );
}

const headerStyle = {
  background: "white",
  textAlign: "center",
  padding: "1rem",
  borderBottom: "1px solid #ddd"
};

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0.8rem 2rem",
  background: "#f1f5f9",
  fontSize: "0.9rem",
  fontWeight: "bold"
};

const navLinksStyle = {
  display: "flex",
  gap: "2rem",
};

const socialIconsStyle = {
  display: "flex",
  gap: "1.5rem",
  alignItems: "center"
};

const iconLinkStyle = {
  color: "#1f2937",
  cursor: "pointer",
  transition: "color 0.3s ease",
  textDecoration: "none",
  display: "flex",
  alignItems: "center"
};

const containerStyle = {
  maxWidth: "700px",
  margin: "2rem auto",
  background: "white",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
};

const inputStyle = {
  width: "100%",
  padding: "0.6rem",
  marginBottom: "1rem",
  border: "1px solid #ccc",
  borderRadius: "4px"
};

const buttonStyle = {
  width: "100%",
  padding: "0.8rem",
  background: "#facc15",
  border: "none",
  borderRadius: "5px",
  fontWeight: "bold",
  cursor: "pointer"
};

export default Formulario;