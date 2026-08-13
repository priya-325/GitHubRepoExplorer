import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import favoriteRoutes from "./routes/favorite.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "GitHub Repo Explorer API is running",
  });
});

app.use("/auth", authRoutes);
app.use("/user", favoriteRoutes);

export default app;
