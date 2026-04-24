import express from "express";
import { getWeather } from "../controllers/weatherController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const weather = await getWeather("London");
  res.json(weather);
});

export default router;