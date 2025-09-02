import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Inicio from "./components/Inicio";
import Login from "./components/Login";
import Registro from "./components/Registro";
import Carga from "./components/Carga";
import Reporte from "./components/Reporte";

function Home() {
  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Inicio</h1>
      <p>
        Bienvenido a Eos: plataforma para cargar, validar y analizar ventas con
        predicciones.
      </p>
    </div>
  );
}

function Predictions() {
  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Predicciones</h1>
      <p>
        HU: Como usuario quiero visualizar mis métricas de ventas y aplicar un
        modelo de prediccion.
      </p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="flex">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/cargar" element={<Carga />} />
            <Route path="/reportes" element={<Reporte />} />
            <Route path="/predicciones" element={<Predictions />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registro />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
