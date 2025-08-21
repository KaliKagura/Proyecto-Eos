import React from "react";

const Carga: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-blue-950 rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Subir Archivos</h2>
      <p className="text-gray-200 mb-6">Puedes cargar archivos Excel o CSV</p>

      <label
        htmlFor="file-upload"
        className="cursor-pointer flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-orange-800 rounded-lg bg-white hover:bg-gray-100 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-blue-950 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 12V12m0 0l4 4m-4-4l-4 4" />
        </svg>
        <span className="text-gray-600">Haz clic o arrastra tu archivo aquí</span>
      </label>

      {/* Input oculto */}
      <input
        id="file-upload"
        type="file"
        accept=".csv,.xlsx,.xls"
        className="hidden"
      />
    </div>
  );
};

export default Carga;