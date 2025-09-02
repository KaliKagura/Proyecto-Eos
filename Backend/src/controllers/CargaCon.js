import { parseBuffer } from "../services/parse.js";
import { detectColumns } from "../services/colDet.js";
import { buildQualityReport, normalizeRows } from "../services/standarize.js";

export async function analyzeUpload(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: "file_required" });

    const { rows, headers } = await parseBuffer(req.file);
    const detection = detectColumns(headers, rows);
    const report = buildQualityReport(rows, detection.suggestedMapping);

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

    return res.json({ ok: true, uploadId: id});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "ingest_failed", detail: err.message });
  }
}