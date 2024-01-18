import { Router } from "express";
import { updateSolicitud,createSolicitud,deleteSolicitud,getSolicitud, infoRecursos,updateEstadoSolicitud, updateNotaSolicitud, aprobacion } from "../controllers/solicitud.controller.js";

const router = Router();

router.post("/solicitud", createSolicitud);
router.put("/solicitud/:id", updateSolicitud);
router.delete("/solicitud/:id", deleteSolicitud);
router.get("/solicitud", getSolicitud);
router.get("/infoRecursos",infoRecursos);
router.put("/estadoSolicitud/:id", updateEstadoSolicitud);
router.put("/updateNotaSolicitud/:id/:nota",updateNotaSolicitud)
router.get("/aprobacion",aprobacion)

export default router;
