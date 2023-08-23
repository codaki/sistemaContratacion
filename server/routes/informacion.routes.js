import express from "express";
import {
  uploadPdf,
  getPdf,
  getAllFiles,
  getFileByPostulationId,
} from "../controllers/informacion.controller.js";

const router = express.Router();

router.post("/upload", uploadPdf);
router.get("/files", getAllFiles);
router.get("/files/:fileId", getPdf);
router.get("/files/postulacion/:idPostulation", getFileByPostulationId);

export default router;
