import { Router } from "express";
import {
  createPostulacion,
  getPostulacion,updatePostulacion,deletePostulacion
} from "../controllers/postulacion.controller.js";

const router = Router();

router.get("/postulacion", getPostulacion);
router.post("/postulacion", createPostulacion);
router.put("/postulacion/:id", updatePostulacion);
router.delete("/postulacion/:id", deletePostulacion);
export default router;
