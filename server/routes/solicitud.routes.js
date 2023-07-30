import { Router } from "express";
import { getSolicitud } from "../controllers/solicitud.controller.js";

const router = Router();

router.get("/solicitud",getSolicitud);
export default router;