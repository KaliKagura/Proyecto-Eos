import React, { useState } from "react";

export default function Registro() {
  // Estado para los inputs
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Validación mínima y submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !email || !password) {
      setMensaje("Todos los campos son obligatorios");
      return;
    }

    // Validación básica de email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setMensaje("Email no válido");
      return;
    }

    // Simulamos registro (console.log)
    console.log("Registro enviado:", { nombre, email, password });
    setMensaje("Usuario registrado correctamente (simulado)");

    // Limpiar formulario
    setNombre("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-4">Registro de Usuario</h2>
      {mensaje && <p className="mb-2 text-red-500">{mensaje}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border p-2 rounded"
        />
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
  );
}