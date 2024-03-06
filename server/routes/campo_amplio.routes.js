import { Router } from "express";
import { getCampoAmplio,createCampoAmplio,updateCampoAmplio,deleteCampoAmplio,cambiarEstadoCampoAmplio } from "../controllers/campo_amplio.controller.js";

const router = Router();

router.get("/campoAmplio",getCampoAmplio);
router.post("/campoAmplio",createCampoAmplio);
router.put("/campoAmplio/:ca_id",updateCampoAmplio);
router.put("/campoAmplio1/:ca_id",cambiarEstadoCampoAmplio);
router.delete("/campoAmplio/:ca_id",deleteCampoAmplio);

export default router;