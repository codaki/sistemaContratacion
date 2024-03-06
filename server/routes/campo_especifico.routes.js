import { Router } from "express";
import { getCampoEspecifico,createCampoEspecifico,updateCampoEspecifico,deleteCampoEspecífico,cambiarEstadoCampoEspecifico } from "../controllers/campo_especifico.controller.js";

const router = Router();

router.get("/campoEspecifico",getCampoEspecifico);
router.post("/campoEspecifico",createCampoEspecifico);
router.put("/campoEspecifico/:ce_id",updateCampoEspecifico);
router.put("/campoEspecifico1/:ce_id",cambiarEstadoCampoEspecifico);
router.delete("/campoEspecifico/:ce_id",deleteCampoEspecífico);
export default router;