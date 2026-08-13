import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import {
  getFavorites,
  saveFavorite,
  deleteFavorite,
} from "../controllers/favorite.controller.js";

const router = Router();

router.use(authenticateToken);

router.get("/favorites", getFavorites);
router.post("/favorites", saveFavorite);
router.delete("/favorites/:id", deleteFavorite);

export default router;
