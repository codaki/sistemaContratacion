import { Router } from "express";
import { getDepartamento,createDepartamento,updateDepartamento,deleteDepartamento,cambiarEstadoDepartamento } from "../controllers/departamento.controller.js";

const router = Router();

router.get("/departamento",getDepartamento);
router.post("/departamento",createDepartamento);
router.put("/departamento/:dept_id",updateDepartamento);
router.put("/departamento1/:dept_id",cambiarEstadoDepartamento);
router.delete("/departamento/:dept_id",deleteDepartamento);
export default router;