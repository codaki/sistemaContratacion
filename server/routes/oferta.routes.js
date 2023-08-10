import { Router } from "express";
import {
  getOferta,
  createOferta,
  updateOferta,
  deleteOferta,
} from "../controllers/oferta.controller.js";

const router = Router();

router.get("/oferta", getOferta);
router.post("/oferta", createOferta);
router.put("/oferta/:id", updateOferta);
router.delete("/oferta/:id", deleteOferta);
export default router;
