import { Router } from "express";
import { getRequisito } from "../controllers/requisito.controller.js";

const router = Router();

router.get("/requisito", getRequisito);
router.post("/requisito", createRequisito);
router.put("/requisito/:id", updateRequisito);
router.delete("/requisito/:id", deleteRequisito);
export default router;
