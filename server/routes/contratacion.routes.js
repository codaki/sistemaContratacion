import { Router } from "express";
import { getContratacion } from "../controllers/contratacion.controller.js";

const router = Router();

router.get("/contratacion",getContratacion);
export default router;