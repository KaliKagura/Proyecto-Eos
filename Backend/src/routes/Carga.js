import { Router } from "express";
import multer from "multer";
import {
  analyzeUpload,
  confirmMapping,
  ingestUpload,
} from "../controllers/CargaCon.js";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
}); 

router.post("/", upload.single("file"), analyzeUpload);
router.post("/:id/confirm-mapping", confirmMapping);
router.post("/:id/ingest", ingestUpload);

export default router;
