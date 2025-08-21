import express from "express";
import supabase from "../SupabaseClient.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  // Validación básica
  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son requeridos." });
  }

  try {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      user: data.user,
      session: data.session,
      message: "Usuario registrado exitosamente."
    });
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

export default router;