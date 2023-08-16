import { Router } from "express";
import {
  deletePersonalAcademico,
  getPersonalAcademico,
  updatePersonalAcademico,
  createPersonalAcademico,
} from "../controllers/personal_academico.controller.js";

const router = Router();

router.get("/personalAcademico", getPersonalAcademico);
router.post("/personalAcademico", createPersonalAcademico);
router.put("/personalAcademico/:id", updatePersonalAcademico);
router.delete("/personalAcademico/:id", deletePersonalAcademico);

export default router;
