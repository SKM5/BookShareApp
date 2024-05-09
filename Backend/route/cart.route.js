import express from "express";
import { addbook, usercart, removeItem } from "../controller/cart.controller.js";
const router = express.Router();

router.post("/addbook", addbook);
router.post("/usercart", usercart);
router.post("/removeItem", removeItem);

export default router;