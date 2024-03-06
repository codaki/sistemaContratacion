import { Router } from "express";
import { getContratacion,createContratacion,updateContratacion,deleteContratacion,cambiarEstadoContratacion } from "../controllers/contratacion.controller.js";

const router = Router();

router.get("/contratacion",getContratacion);
router.post("/contratacion",createContratacion);
router.put("/contratacion/:con_id",updateContratacion);
router.put("/contratacion1/:con_id",cambiarEstadoContratacion);
router.delete("/contratacion/:con_id",deleteContratacion);

export default router;