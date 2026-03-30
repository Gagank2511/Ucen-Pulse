import express from "express";
import {
  getMetrics,
  createMetric,
  deleteMetric,
} from "../controllers/metricController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getMetrics);
router.post("/", protect, createMetric);
router.delete("/:id", protect, deleteMetric);

export default router;