import express from "express";
import cors from "cors";

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
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

export default app;