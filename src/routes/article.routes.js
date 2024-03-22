import express from "express";
import {
  createArticleController,
  getAllArticlesController,
  getUserArticlesController,
  updateArticlesController,
  deleteArticleController,
  articleStatsController
} from "../controllers/article.controller.js";
import userAuth from "../middlewares/auth.middleware.js";

const router = express.Router();

// routes
// CREATE ARTICLE || POST
router.post("/create-article", userAuth, createArticleController);

// GET ARTICLES || GET
router.get("/get-articles", userAuth, getAllArticlesController);

// GET USER ARTICLES || GET
router.get("/user/get-articles", userAuth, getUserArticlesController);

// UPDATE ARTICLE ||  PATCH || PUT
router.patch("/update-article/:id", userAuth, updateArticlesController);

// DELETE ARTICLE || DELETE
router.delete("/delete-article/:id", userAuth, deleteArticleController);

// ARTICLES STATS AND FILTER|| GET
router.get("/article-stats", userAuth, articleStatsController);


export default router;
