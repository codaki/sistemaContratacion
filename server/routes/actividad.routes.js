import { Router } from "express";
import { getActividad,createActividad,updateActividad,deleteActividad } from "../controllers/actividad.controller.js";

const router = Router();

router.get("/actividad",getActividad);
router.post("/actividad",createActividad);
router.put("/actividad/:act_id",updateActividad);
router.delete("/actividad/:act_id",deleteActividad);
export default router;