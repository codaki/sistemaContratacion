import { Router } from "express";
import { getCampoEspecifico } from "../controllers/campo_especifico.controller.js";

const router = Router();

router.get("/campoEspecifico",getCampoEspecifico);
export default router;