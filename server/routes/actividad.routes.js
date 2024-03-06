import { Router } from "express";
import { getActividad,createActividad,updateActividad,deleteActividad,cambiarEstadoActividad } from "../controllers/actividad.controller.js";

const router = Router();

router.get("/actividad",getActividad);
router.post("/actividad",createActividad);
router.put("/actividad/:act_id",updateActividad);
router.put("/actividad1/:act_id",cambiarEstadoActividad);
router.delete("/actividad/:act_id",deleteActividad);
export default router;