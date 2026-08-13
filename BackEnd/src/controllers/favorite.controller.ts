import { Response } from "express";
import prisma from "../config/prisma.js";
import { AuthRequest } from "../middleware/auth.middleware.js";

export async function getFavorites(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    const favorites = await prisma.favoriteRepository.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      favorites,
    });
  } catch (error) {
    console.error("Get favorites error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
}
export async function saveFavorite(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    const { githubRepoId, name, description, htmlUrl, language, stars, owner } =
      req.body;

    if (!githubRepoId || !name || !htmlUrl || !owner) {
      res.status(400).json({
        message: "githubRepoId, name, htmlUrl and owner are required",
      });
      return;
    }

    const existingFavorite = await prisma.favoriteRepository.findUnique({
      where: {
        userId_githubRepoId: {
          userId,
          githubRepoId,
        },
      },
    });

    if (existingFavorite) {
      res.status(409).json({
        message: "Repository is already saved",
      });
      return;
    }

    const favorite = await prisma.favoriteRepository.create({
      data: {
        githubRepoId,
        name,
        description: description ?? null,
        htmlUrl,
        language: language ?? null,
        stars: stars ?? 0,
        owner,
        userId,
      },
    });

    res.status(201).json({
      message: "Repository saved successfully",
      favorite,
    });
  } catch (error) {
    console.error("Save favorite error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
}
export async function deleteFavorite(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user?.id;
    const favoriteId = Number(req.params.id);

    if (!userId) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    if (Number.isNaN(favoriteId)) {
      res.status(400).json({
        message: "Invalid favorite id",
      });
      return;
    }

    const favorite = await prisma.favoriteRepository.findFirst({
      where: {
        id: favoriteId,
        userId,
      },
    });

    if (!favorite) {
      res.status(404).json({
        message: "Favorite repository not found",
      });
      return;
    }

    await prisma.favoriteRepository.delete({
      where: {
        id: favoriteId,
      },
    });

    res.status(200).json({
      message: "Repository removed from favorites",
    });
  } catch (error) {
    console.error("Delete favorite error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
}
