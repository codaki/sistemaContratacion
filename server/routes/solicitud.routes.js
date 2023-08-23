import { Router } from "express";
import { updateSolicitud,createSolicitud,deleteSolicitud,getSolicitud, infoRecursos } from "../controllers/solicitud.controller.js";

const router = Router();

router.post("/solicitud", createSolicitud);
router.put("/solicitud/:id", updateSolicitud);
router.delete("/solicitud/:id", deleteSolicitud);
router.get("/solicitud", getSolicitud);
router.get("/infoRecursos",infoRecursos);
export default router;
