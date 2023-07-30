import { Router } from "express";
import { getCampoAmplio } from "../controllers/campo_amplio.controller.js";

const router = Router();

router.get("/campoAmplio",getCampoAmplio);
export default router;