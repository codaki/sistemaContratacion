import { Router } from "express";
import { getPersonalAcademico } from "../controllers/personal_academico.controller.js";

const router = Router();

router.get("/personalAcademico",getPersonalAcademico);
export default router;