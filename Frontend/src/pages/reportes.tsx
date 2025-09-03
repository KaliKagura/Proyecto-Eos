import React, { useState } from "react";

export default function Reporte() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setUploadResult(null); // Limpia el resultado anterior
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:4000/api/carga", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      setUploadResult(result);
    } catch (error) {
      setUploadResult({ error: "Error de conexión con el backend" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Reportes y Predicciones
        </h1>

        {/* Subida de archivos */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <label htmlFor="file-upload">
            <span className="px-6 py-2 bg-white text-blue-600 rounded-lg shadow border border-blue-600 hover:bg-blue-50 cursor-pointer">
              Seleccionar Archivo
            </span>
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".csv,.xlsx"
            onChange={handleFileChange}
            className="hidden"
          />
          {file && (
            <p className="text-sm text-gray-700">
              Archivo seleccionado:{" "}
              <span className="font-semibold">{file.name}</span>
            </p>
          )}
          <button
            onClick={handleUpload}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Subiendo..." : "Subir Archivo"}
          </button>
        </div>

        {/* Preview y issues */}
        {uploadResult && (
          <div className="border-t border-gray-200 pt-6">
            {uploadResult.error ? (
              <p className="text-red-500 font-semibold">{uploadResult.error}</p>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Vista previa de datos
                </h2>
                <div className="overflow-x-auto mb-4">
                  <table className="min-w-full text-sm border">
                    <thead>
                      <tr>
                        {uploadResult.preview &&
                          uploadResult.preview.length > 0 &&
                          Object.keys(uploadResult.preview[0]).map((col) => (
                            <th
                              key={col}
                              className="border px-2 py-1 bg-gray-100"
                            >
                              {col}
                            </th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      {uploadResult.preview &&
                        uploadResult.preview.map((row: any, idx: number) => (
                          <tr key={idx}>
                            {Object.values(row).map((val: any, i: number) => (
                              <td key={i} className="border px-2 py-1">
                                {String(val)}
                              </td>
                            ))}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                {uploadResult.issues && uploadResult.issues.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-red-600 mb-1">
                      Problemas detectados:
                    </h3>
                    <ul className="list-disc pl-5 text-red-500">
                      {uploadResult.issues.map((issue: string, idx: number) => (
                        <li key={idx}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <p className="text-gray-700">
                  Filas totales:{" "}
                  <span className="font-semibold">{uploadResult.rowCount}</span>
                </p>
              </>
            )}
          </div>
        )}

        {/* Zona de gráficos */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Visualización de datos
          </h2>
          <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
            Aquí aparecerán los gráficos 📊
          </div>
        </div>
      </div>
    </div>
  );
}
