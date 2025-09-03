import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import AuthPage from "./pages/Auth";
import Reporte from "./pages/reportes";
import Navbar from "./components/Navbar";

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
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/reportes" element={<Reporte />} />
            <Route path="/predicciones" element={<Predictions />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
