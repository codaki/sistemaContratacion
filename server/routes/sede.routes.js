import { Router } from "express";
import { getSede,createSede,updateSede,deleteSede,cambiarEstadoSede } from "../controllers/sede.controller.js";

const router = Router();

router.post("/sede", createSede);
router.get("/sede", getSede);
router.put("/sede/:sede_id", updateSede);
router.put("/sede1/:sede_id", cambiarEstadoSede);
router.delete("/sede/:sede_id", deleteSede);
export default router;
