import express from "express";
import {
  createActivity,
  getActivities,
  deleteActivity,
} from "../services/activityServices.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getActivities);
router.post("/", protect, createActivity);
router.delete("/:id", protect, deleteActivity);

export default router;