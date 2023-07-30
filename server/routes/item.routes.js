import { Router } from "express";
import { getItem } from "../controllers/item.controller.js";

const router = Router();

router.get("/item",getItem);
export default router;