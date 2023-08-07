import { Router } from "express";
import { getCampoEspecifico,createCampoEspecifico,updateCampoEspecifico,deleteCampoEspecífico } from "../controllers/campo_especifico.controller.js";

const router = Router();

router.get("/campoEspecifico",getCampoEspecifico);
router.post("/campoEspecifico",createCampoEspecifico);
router.put("/campoEspecifico/:ce_id",updateCampoEspecifico);
router.delete("/campoEspecifico/:ce_id",deleteCampoEspecífico);
export default router;