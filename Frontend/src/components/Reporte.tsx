import React from "react";
// Instala jspdf con: npm install jspdf
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const mockVentas = [
  { fecha: "2024-06-01", producto: "Zapatos", cantidad: 3, total: 15000 },
  { fecha: "2024-06-02", producto: "Camisa", cantidad: 2, total: 8000 },
  { fecha: "2024-06-03", producto: "Pantalón", cantidad: 1, total: 12000 },
];

function descargarPDF() {
  const doc = new jsPDF();
  doc.text("Reporte de Ventas", 14, 16);
  autoTable(doc, {
    startY: 22,
    head: [["Fecha", "Producto", "Cantidad", "Total"]],
    body: mockVentas.map((v) => [
      v.fecha,
      v.producto,
      v.cantidad,
      `$${v.total}`,
    ]),
  });
  doc.save("reporte_ventas.pdf");
}

const Reporte: React.FC = () => (
  <div className="max-w-2xl mx-auto p-6 bg-blue-950 rounded shadow mt-8">
    <h2 className="text-xl font-bold mb-4 text-white">Reporte de Ventas</h2>
    <table className="w-full mb-4 border">
      <thead>
        <tr className="bg-orange-800 text-white">
          <th className="p-2 border">Fecha</th>
          <th className="p-2 border">Producto</th>
          <th className="p-2 border">Cantidad</th>
          <th className="p-2 border">Total</th>
        </tr>
      </thead>
      <tbody>
        {mockVentas.map((venta, idx) => (
          <tr key={idx}>
            <td className="p-2 border">{venta.fecha}</td>
            <td className="p-2 border">{venta.producto}</td>
            <td className="p-2 border">{venta.cantidad}</td>
            <td className="p-2 border">${venta.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <button
      onClick={descargarPDF}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Descargar PDF
    </button>
  </div>
);

export default Reporte;
