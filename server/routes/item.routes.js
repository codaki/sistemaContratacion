import { Router } from "express";
import { getItem,createItem,updateItem,deleteItem } from "../controllers/item.controller.js";

const router = Router();

router.get("/item",getItem);
router.post("/item",createItem);
router.put("/item/:it_id",updateItem);
router.delete("/item/:it_id",deleteItem);

export default router;