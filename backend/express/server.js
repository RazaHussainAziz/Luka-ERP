process.loadEnvFile("./.env");

import express from "express";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: "Content-Type",
    methods: "post",
  })
);
app.use(express.json());
app.use("/api/v1", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
