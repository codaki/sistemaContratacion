import { Router } from "express";
import { getTituloExp } from "../controllers/titulo_exp.controller.js";

const router = Router();

router.get("/tituloExp",getTituloExp);
export default router;