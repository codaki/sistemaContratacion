import { Router } from "express";
import { getTituloExp,createTituloExp,updateTituloExp,deleteTituloExp } from "../controllers/titulo_exp.controller.js";

const router = Router();

router.get("/tituloExp", getTituloExp);
router.post("/titulo_exp", createTituloExp);
router.put("/titulo_exp/:tx_id", updateTituloExp);
router.delete("/titulo_exp/:tx_id", deleteTituloExp);
export default router;
