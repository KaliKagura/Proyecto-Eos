import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

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
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      console.log("Supabase login response:", data);

      if (!res.ok) {
        setMensaje(data.error || "Error en el inicio de sesión");
        return;
      }

      setMensaje("Inicio de sesión exitoso");
      setEmail("");
      setPassword("");
      if (data.session && data.session.access_token) {
        localStorage.setItem("token", data.session.access_token);
      }
    } catch (err) {
      setMensaje("No se pudo conectar al servidor");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md p-4 border rounded shadow">
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
    </div>
  );
}
