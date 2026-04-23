import { useLocation } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";

function Validacion() {
  const location = useLocation();
  const data = location.state || {};

  const ocrData = {
    nombre: data.nombre,
    cedula: data.cedula,
    tipoAfiliado: data.tipoAfiliado,
  };

  return (
    <div>

      <header style={headerStyle}>
        <img src="/logo.png" alt="logo" style={{ height: "50px" }} />
      </header>

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

      <div style={{ padding: "2rem", display: "flex", gap: "2rem", justifyContent: "center" }}>
        
        <div style={cardStyle}>
          <h3>Datos ingresados</h3>
          <p><b>Nombre:</b> {data.nombre}</p>
          <p><b>Cédula:</b> {data.cedula}</p>
          <p><b>Tipo:</b> {data.tipoAfiliado}</p>
        </div>

        <div style={cardStyle}>
          <h3>Datos OCR</h3>
          <p><b>Nombre:</b> {ocrData.nombre}</p>
          <p><b>Cédula:</b> {ocrData.cedula}</p>
          <p><b>Tipo:</b> {ocrData.tipoAfiliado}</p>
        </div>

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
  justifyContent: "center",
  gap: "2rem",
  padding: "0.8rem",
  background: "#f1f5f9",
  fontSize: "0.9rem",
  fontWeight: "bold"
};

const cardStyle = {
  background: "white",
  padding: "1.5rem",
  borderRadius: "8px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  width: "300px"
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

export default Validacion;