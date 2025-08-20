import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Registro from "./components/Registro";

function Home() {
  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Inicio</h1>
      <p>Bienvenido a Eos: plataforma para cargar, validar y analizar ventas con predicciones.</p>
    </div>
  );
}

function Upload() {
  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Carga de datos</h1>
      <p>HU: Como usuario quiero cargar mis archivos de ventas en formato Excel/CSV.</p>
    </div>
  );
}

function Reports() {
  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Reportes</h1>
      <p>HU: Como usuario quiero ver reportes de mis ventas.</p>
    </div>
  );
}

function Predictions() {
  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Predicciones</h1>
      <p>HU: Como usuario quiero visualizar mis métricas de ventas y aplicar un modelo de prediccion.</p>
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
            <Route path="/" element={<Home />} />
            <Route path="/cargar" element={<Upload />} />
            <Route path="/reportes" element={<Reports />} />
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