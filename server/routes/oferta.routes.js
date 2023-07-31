import { Router } from "express";
import { getOferta } from "../controllers/oferta.controller.js";

const router = Router();

router.get("/oferta",getOferta);
export default router;