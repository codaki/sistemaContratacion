import { Router } from "express";
import { getSede } from "../controllers/sede.controller.js";

const router = Router();

router.get("/sede",getSede);
export default router;