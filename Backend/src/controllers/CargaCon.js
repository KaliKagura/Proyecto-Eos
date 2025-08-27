import { parseBuffer } from "../services/parse.js";
import { detectColumns } from "../services/colDet.js";
import { buildQualityReport, normalizeRows } from "../services/standarize.js";
// importa tu supabase client si vas a persistir: import { supabase } from "../supabaseClient.js";

export async function analyzeUpload(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: "file_required" });

    const { rows, headers } = await parseBuffer(req.file);
    const detection = detectColumns(headers, rows);
    const report = buildQualityReport(rows, detection.suggestedMapping);

    // Aquí podrías crear registro en `uploads` y devolver uploadId
    // const { data } = await supabase.from("uploads").insert(...).select().single();

    return res.json({
      // uploadId: data?.id,
      suggestedMapping: detection.suggestedMapping,
      issues: [...detection.issues, ...report.issues],
      preview: rows.slice(0, 10),
      rowCount: rows.length
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "analyze_failed", detail: err.message });
  }
}

export async function confirmMapping(req, res) {
  try {
    const { id } = req.params;
    const { mapping, saveAsDefault } = req.body;

    if (!mapping?.date || !mapping?.sales) {
      return res.status(400).json({ error: "invalid_mapping" });
    }

    // Guardar mapping en uploads / column_mappings si saveAsDefault=true...
    return res.json({ ok: true, uploadId: id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "confirm_failed", detail: err.message });
  }
}

export async function ingestUpload(req, res) {
  try {
    const { id } = req.params;
    const { mapping } = req.body;

    if (!mapping?.date || !mapping?.sales) {
      return res.status(400).json({ error: "invalid_mapping" });
    }

    // 1) recuperar archivo (en MVP, usa el buffer recibido en analyze; en prod, guarda en S3)
    // 2) parsear completo y normalizar:
    // const { rows } = await parseBuffer(buffer);
    // const normalized = normalizeRows(rows, mapping);

    // 3) insertar en ventas (chunked/batch)
    // await supabase.from("ventas").insert(normalized);

    // 4) guardar reporte final en uploads.status='ingested'
    return res.json({ ok: true, uploadId: id /*, inserted: normalized.length */ });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "ingest_failed", detail: err.message });
  }
}