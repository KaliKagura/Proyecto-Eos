import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import registro from "./routes/Registro.js"; 
import login from "./routes/Login.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Rutas base (ejemplo)
app.get("/", (req, res) => {
  res.send("🚀 Backend de Eos funcionando!");
});

// Rutas
app.use("/api/register", registro);
app.use("/api/login", login);

app.listen(port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${port}`);
});