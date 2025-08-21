import React, { useState } from "react";

export default function Registro() {
  // Estado para los inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Validación mínima y submit
  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.error || "Error en el registro");
        return;
      }

      setMensaje(data.message || "Usuario registrado correctamente");
      setEmail("");
      setPassword("");
    } catch (err) {
      setMensaje("No se pudo conectar al servidor");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md p-4 border rounded shadow">
        <h2 className="text-xl font-bold mb-4">Registro de Usuario</h2>
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
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}