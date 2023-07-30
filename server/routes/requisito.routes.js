import { Router } from "express";
import { getRequisito } from "../controllers/requisito.controller.js";

const router = Router();

router.get("/requisito",getRequisito);
export default router;