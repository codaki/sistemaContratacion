import express from "express";
import { uploadPdf } from "../controllers/informacion.controller.js";

const router = express.Router();

router.post("/upload", uploadPdf);

export default router;
