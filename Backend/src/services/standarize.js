function parseDateIso(s) {
  if (s == null) return null;
  const str = String(s).trim();
  // intentos simples
  const dmy = str.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{2,4})$/);
  if (dmy) {
    const [ , dd, mm, yy ] = dmy;
    const yyyy = yy.length === 2 ? `20${yy}` : yy;
    return `${yyyy.padStart(4,"0")}-${mm.padStart(2,"0")}-${dd.padStart(2,"0")}`;
  }
  const ymd = str.match(/^(\d{4})[\/.-](\d{1,2})[\/.-](\d{1,2})$/);
  if (ymd) {
    const [ , yyyy, mm, dd ] = ymd;
    return `${yyyy}-${mm.padStart(2,"0")}-${dd.padStart(2,"0")}`;
  }
  const monY = str.match(/^([A-Za-z]{3,9})[ -](\d{4})$/);
  if (monY) {
    const months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
    const m = months.indexOf(monY[1].substring(0,3).toLowerCase())+1;
    if (m>0) return `${monY[2]}-${String(m).padStart(2,"0")}-01`;
  }
  // fallback Date
  const d = new Date(str);
  return isNaN(+d) ? null : d.toISOString().slice(0,10);
}

function toNumber(s) {
  if (s == null) return null;
  let x = String(s).trim();
  if (!x) return null;
  // quitar moneda y miles, dejar decimal con punto
  x = x.replace(/[\s'$/€]/g,"");
  // si tiene both . y , decidir por último separador como decimal
  if (x.includes(",") && x.includes(".")) {
    const lastComma = x.lastIndexOf(",");
    const lastDot = x.lastIndexOf(".");
    if (lastComma > lastDot) x = x.replace(/\./g,"").replace(",",".");
    else x = x.replace(/,/g,"");
  } else if (x.includes(",")) {
    // probablemente decimal europeo
    x = x.replace(/\./g,"").replace(",",".");
  }
  const n = Number(x);
  return Number.isFinite(n) ? n : null;
}

export function buildQualityReport(rows, mapping) {
  const issues = [];
  let rowsOk = 0, missingDate = 0, missingSales = 0;

  for (const r of rows.slice(0, 5000)) {
    const d = mapping.date ? parseDateIso(r[mapping.date]) : null;
    const s = mapping.sales ? toNumber(r[mapping.sales]) : null;
    if (!d) missingDate++;
    if (s == null) missingSales++;
    if (d && s != null) rowsOk++;
  }

  if (missingDate > 0) issues.push({ level:"warn", code:"missing_dates", count: missingDate });
  if (missingSales > 0) issues.push({ level:"warn", code:"missing_sales", count: missingSales });

  return {
    issues,
    summary: { rowsAnalyzed: Math.min(rows.length, 5000), rowsOk }
  };
}

export function normalizeRows(rows, mapping) {
  const out = [];
  for (const r of rows) {
    const d = parseDateIso(r[mapping.date]);
    const s = toNumber(r[mapping.sales]);
    if (!d || s == null) continue; // descartar filas inválidas
    const qty = mapping.quantity ? toNumber(r[mapping.quantity]) : null;
    const prod = mapping.product ? String(r[mapping.product] ?? "").trim() || null : null;
    out.push({ fecha_venta: d, ventas: s, cantidad: qty, producto: prod });
  }
  return out;
}