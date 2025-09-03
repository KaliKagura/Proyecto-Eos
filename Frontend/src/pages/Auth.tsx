import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-left mb-8 text-black">
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </h2>

        <form className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Nombre completo"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            />
          )}

          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition"
          >
            {isLogin ? "Ingresar" : "Crear cuenta"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <button
            type="button"
            className="text-white font-semibold hover:underline bg-gray-400"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Regístrate aquí" : "Inicia sesión aquí"}
          </button>
        </p>
      </div>
    </div>
  );
}