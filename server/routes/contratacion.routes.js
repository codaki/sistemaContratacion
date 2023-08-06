import { Router } from "express";
import { getContratacion,createContratacion,updateContratacion,deleteContratacion } from "../controllers/contratacion.controller.js";

const router = Router();

router.get("/contratacion",getContratacion);
router.post("/contratacion",createContratacion);
router.put("/contratacion/:con_id",updateContratacion);
router.delete("/contratacion/:con_id",deleteContratacion);

export default router;