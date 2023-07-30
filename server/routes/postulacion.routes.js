import { Router } from "express";
import { getPostulacion } from "../controllers/postulacion.controller.js";

const router = Router();

router.get("/postulacion",getPostulacion);
export default router;