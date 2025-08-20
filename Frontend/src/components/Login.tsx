import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setMensaje("Todos los campos son obligatorios");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setMensaje("Email no válido");
      return;
    }

    // Simulación de login
    console.log("Login enviado:", { email, password });
    setMensaje("Inicio de sesión simulado con éxito");

    // Limpiar formulario
    setEmail("");
    setPassword("");
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
      {mensaje && <p className="mb-2 text-red-500">{mensaje}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}