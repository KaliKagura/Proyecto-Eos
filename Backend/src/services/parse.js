import xlsx from "xlsx";
import csvParser from "csv-parser";

export async function parseBuffer(file) {
  const mime = (file.mimetype || "").toLowerCase();
  const name = (file.originalname || "").toLowerCase();

  if (mime.includes("excel") || name.endsWith(".xlsx") || name.endsWith(".xls")) {
    const wb = xlsx.read(file.buffer, { type: "buffer" });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet, { defval: null }); // array de objetos
    const headers = Object.keys(rows[0] || {});
    return { headers, rows };
  }

  // CSV
  const rows = [];
  const headersSet = new Set();
  await new Promise((resolve, reject) => {
    const stream = csvParser({ separator: ",", mapHeaders: ({ header }) => header?.trim() ?? header });
    stream
      .on("headers", (h) => h.forEach(x => headersSet.add(x)))
      .on("data", (row) => rows.push(row))
      .on("end", () => resolve())
      .on("error", reject);
    stream.write(file.buffer);
    stream.end();
  });

  return { headers: Array.from(headersSet), rows };
}