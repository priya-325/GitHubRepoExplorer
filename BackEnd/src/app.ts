import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import favoriteRoutes from "./routes/favorite.routes.js";

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.PREVIEW_URL,
].filter((origin): origin is string => Boolean(origin));

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "GitHub Repo Explorer API is running",
  });
});

app.use("/auth", authRoutes);
app.use("/user", favoriteRoutes);

export default app;
