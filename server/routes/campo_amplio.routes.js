import { Router } from "express";
import { getCampoAmplio,createCampoAmplio,updateCampoAmplio,deleteCampoAmplio } from "../controllers/campo_amplio.controller.js";

const router = Router();

router.get("/campoAmplio",getCampoAmplio);
router.post("/campoAmplio",createCampoAmplio);
router.put("/campoAmplio/:ca_id",updateCampoAmplio);
router.delete("/campoAmplio/:ca_id",deleteCampoAmplio);

export default router;