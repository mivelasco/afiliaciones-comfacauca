import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Formulario from "./pages/Formulario";
import Validacion from "./pages/Validacion";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/formulario" element={<PrivateRoute><Formulario /></PrivateRoute>} />
        <Route path="/validacion" element={<Validacion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;