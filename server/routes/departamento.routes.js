import { Router } from "express";
import { getDepartamento } from "../controllers/departamento.controller.js";

const router = Router();

router.get("/departamento",getDepartamento);
export default router;