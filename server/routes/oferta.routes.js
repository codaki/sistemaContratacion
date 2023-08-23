import { Router } from "express";
import {
  getOferta,
  createOferta,
  updateOferta,
  deleteOferta,
  postulacionUnica,
  contratacionUnica,
  sedeUnica,
  departamentoUnico,
  campoAmplioUnico,
  campoEspecificoUnico,
  personalUnico,
  actividadUnica,
  obtenerOferta,
} from "../controllers/oferta.controller.js";

const router = Router();

router.get("/oferta", getOferta);
router.post("/oferta", createOferta);
router.put("/oferta/:id", updateOferta);
router.delete("/oferta/:id", deleteOferta);
router.get("/postulacionUnica",postulacionUnica)
router.get("/contratacionUnica/:post_id",contratacionUnica)
router.get("/sedeUnica/:post_id/:con_id",sedeUnica)
router.get("/departamentoUnico/:post_id/:con_id/:sede_id",departamentoUnico)
router.get("/campoAmplioUnico/:post_id/:con_id/:sede_id/:dept_id",campoAmplioUnico)
router.get("/campoEspecificoUnico/:post_id/:con_id/:sede_id/:dept_id/:ca_id",campoEspecificoUnico)
router.get("/personalUnico/:post_id/:con_id/:sede_id/:dept_id/:ca_id/:ce_id",personalUnico)
router.get("/actividadUnica/:post_id/:con_id/:sede_id/:dept_id/:ca_id/:ce_id/:pa_id",actividadUnica)
router.get("/obtenerOferta/:post_id/:con_id/:sede_id/:dept_id/:ca_id/:ce_id/:pa_id/:act_id",obtenerOferta)
export default router;
