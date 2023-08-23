import express from "express";
import {
  uploadPdf,
  getPdf,
  getAllFiles,
} from "../controllers/informacion.controller.js";

const router = express.Router();

router.post("/upload", uploadPdf);
router.get("/files", getAllFiles);
router.get("/files/:fileId", getPdf);

export default router;
