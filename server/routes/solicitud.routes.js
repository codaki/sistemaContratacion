import { Router } from "express";
import { getSolicitud } from "../controllers/solicitud.controller.js";

const router = Router();

router.post("/solicitud", createSolicitud);
router.put("/solicitud/:id", updateSolicitud);
router.delete("/solicitud/:id", deleteSolicitud);
router.get("/solicitud", getSolicitud);
export default router;
