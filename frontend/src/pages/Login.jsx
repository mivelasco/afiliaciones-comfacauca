import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = () => {
    // login incompleto por ahora
    if (user.email && user.password) {
      localStorage.setItem("auth", "true");
      navigate("/formulario");
    } else {
      alert("Completa los campos");
    }
  };

  return (
    <div style={pageStyle}>

      {/* HEADER */}
      <header style={headerStyle}>
        <img src="/logo.png" alt="logo" style={{ height: "50px" }} />
      </header>

      {/* LOGIN CARD */}
      <div style={cardStyle}>
        <h2 style={{ textAlign: "center" }}>Iniciar sesión</h2>

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          style={inputStyle}
        />

        <button onClick={handleLogin} style={buttonStyle}>
          Ingresar
        </button>
      </div>

    </div>
  );
}

/* ESTILOS */

const pageStyle = {
  minHeight: "100vh",
  background: "#eef2f7"
};

const headerStyle = {
  background: "white",
  textAlign: "center",
  padding: "1rem",
  borderBottom: "1px solid #ddd"
};

const cardStyle = {
  maxWidth: "400px",
  margin: "4rem auto",
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

export default Login;