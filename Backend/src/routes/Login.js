import express from "express";
import supabase from "../SupabaseClient.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son requeridos." });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    console.log("Supabase login response:", data);

    res.status(200).json({
      user: data.user,
      session: data.session,
      message: "Inicio de sesión exitoso"
    });
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

export default router;