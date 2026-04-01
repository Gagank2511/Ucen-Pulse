import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import metricRoutes from "./routes/metricRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import { setupSwagger } from "./swagger/swaggerDocs.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("/{*path}", cors(corsOptions)); // ← fixed for Express v5

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/metrics", metricRoutes);
app.use("/api/weather", weatherRoutes);
setupSwagger(app);
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

export default app;