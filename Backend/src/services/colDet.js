const synonyms = {
  date: ["fecha","date","periodo","period","month","mes","fecha_venta","fechaventa","periodo_mes"],
  sales: ["ventas","total","monto","importe","revenue","amount","total_venta","venta_total","ingresos"],
  quantity: ["cantidad","qty","unidades","q","cantidad_vendida"],
  product: ["producto","item","sku","articulo","servicio","descripcion"]
};

function normalizeHeader(h) {
  return h?.toLowerCase()?.normalize("NFD").replace(/\p{Diacritic}/gu,"").replace(/\s|_|-/g,"") ?? "";
}

function isMostlyDates(values) {
  let ok = 0, total = 0;
  for (const v of values.slice(0, 200)) {
    if (v === null || v === undefined || `${v}`.trim()==="") continue;
    total++;
    const s = String(v).trim();
    if (/^\d{4}[-/]\d{1,2}[-/]\d{1,2}$/.test(s) || /^\d{1,2}[/.-]\d{1,2}[/.-]\d{2,4}$/.test(s) || /^[A-Za-z]{3,9}[-\s]\d{4}$/.test(s)) ok++;
  }
  return total > 0 && (ok/total) >= 0.7;
}

function toNumberSafe(x) {
  if (x === null || x === undefined) return null;
  let s = String(x).trim();
  if (!s) return null;
  s = s.replace(/[$€.,\s']/g, m => (m === "," ? "." : "")); // muy simple para MVP
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function isMostlyNumeric(values) {
  let ok = 0, total = 0;
  for (const v of values.slice(0, 200)) {
    if (v === null || v === undefined || `${v}`.trim()==="") continue;
    total++;
    if (toNumberSafe(v) !== null) ok++;
  }
  return total > 0 && (ok/total) >= 0.7;
}

export function detectColumns(headers, rows) {
  const issues = [];
  const normHeaders = headers.map(h => ({ raw: h, norm: normalizeHeader(h) }));

  const pickByHeader = (type) => {
    const list = synonyms[type];
    const found = normHeaders.find(h => list.includes(h.norm));
    return found?.raw;
  };

  const columnValues = (h) => rows.map(r => r[h]);

  const suggested = {};

  // Header-based
  suggested.date = pickByHeader("date");
  suggested.sales = pickByHeader("sales");
  suggested.quantity = pickByHeader("quantity");
  suggested.product = pickByHeader("product");

  // Content-based fallback
  if (!suggested.date) {
    for (const h of headers) {
      if (isMostlyDates(columnValues(h))) { suggested.date = h; break; }
    }
  }
  if (!suggested.sales) {
    for (const h of headers) {
      if (isMostlyNumeric(columnValues(h))) { suggested.sales = h; break; }
    }
  }

  if (!suggested.date) issues.push({ level:"error", code:"missing_date_column", detail:"No se detectó columna de fecha" });
  if (!suggested.sales) issues.push({ level:"error", code:"missing_sales_column", detail:"No se detectó columna de ventas" });

  return { suggestedMapping: suggested, issues };
}