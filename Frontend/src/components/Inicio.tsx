import React from "react";

const Inicio: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full bg-gray-50 gap-6">
      {/* Bienvenida + imágenes */}
      <section
        className="w-full bg-cover h-96 flex items-center"
        style={{ backgroundImage: "url('/dawn.jpg')" }}
      >
        <div className="flex justify-between items-center w-full px-10">
          {/* Texto de bienvenida */}
          <div className="text-left max-w-4xl">
            <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-2xl">
              Bienvenido a Proyecto Eos
            </h1>
            <p className="text-xl text-white drop-shadow-2xl">
              Esta plataforma te permite cargar archivos CSV y obtener análisis
              personalizados para tu empresa. Empieza explorando las
              instrucciones de uso y sube tu primer archivo de prueba.
            </p>
          </div>

          {/* Imágenes de ejemplo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="rounded-2xl shadow-lg bg-white p-10 flex flex-col items-center">
              <img
                src="/Carga.svg"
                alt="Carga de archivo"
                className="w-20 h-20 mb-2 rounded-lg"
              />
              <p className="text-gray-700 text-s text-center">
                Sube tu archivo
              </p>
            </div>
            <div className="rounded-2xl shadow-lg bg-white p-10 flex flex-col items-center">
              <img
                src="/Data.svg"
                alt="Vista previa de datos"
                className="w-20 h-20 mb-2 rounded-lg"
              />
              <p className="text-gray-700 text-s text-center">
                Vista previa de datos
              </p>
            </div>
            <div className="rounded-2xl shadow-lg bg-white p-10 flex flex-col items-center">
              <img
                src="/Reporte.svg"
                alt="reportes"
                className="w-20 h-20 mb-2 rounded-lg"
              />
              <p className="text-gray-700 text-s text-center">
                Reportes personalizados
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instrucciones */}
      <section
        className="w-11/12 mx-auto mb-10"
        style={{ minHeight: "calc(100vh - 28rem)" }}
      >
        <div className="flex justify-between h-full">
          {/* Lado izquierdo: tarjeta blanca */}
          <div className="bg-white shadow-xl rounded-2xl p-6 flex-1 pr-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-left">
              ¿Cómo usar la plataforma?
            </h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>Regístrate o inicia sesión en tu cuenta.</li>
              <li>
                Accede a la sección <strong>Cargar Archivos</strong>.
              </li>
              <li>Selecciona tu archivo CSV o Excel (máx. 20MB).</li>
              <li>Procesa los datos y genera reportes personalizados.</li>
              <li>Descarga o visualiza tus resultados.</li>
            </ol>
          </div>

          {/* Lado derecho: botones sobre el fondo de la sección */}
          <div className="flex-1 pl-20 flex flex-col justify-start">
            <div className="grid grid-cols-2 gap-10">
              <button className="bg-blue-600 text-white w-80 h-40 text-3xl rounded-lg hover:bg-blue-700">
                Cargar Archivo
              </button>
              <button className="bg-green-600 text-white w-80 h-40 text-3xl rounded-lg hover:bg-green-700">
                Ver Reportes
              </button>
              <button className="bg-purple-600 text-white w-80 h-40 text-3xl rounded-lg hover:bg-purple-700">
                Analizar Datos
              </button>
              <button className="bg-orange-500 text-white w-80 h-40 text-3xl rounded-lg hover:bg-orange-600">
                Iniciar Sesion
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;
