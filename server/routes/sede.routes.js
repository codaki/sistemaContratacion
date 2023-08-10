import { Router } from "express";
import { getSede } from "../controllers/sede.controller.js";

const router = Router();

router.post("/sede", createSede);
router.get("/sede", getSede);
router.put("/sede/:sede_id", updateSede);
router.delete("/sede/:sede_id", deleteSede);
export default router;
