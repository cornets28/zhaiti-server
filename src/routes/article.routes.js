import express from "express";
import {
  createArticleController,
  getAllArticlesController,
  getUserArticlesController,
} from "../controllers/article.controller.js";
import userAuth from "../middlewares/auth.middleware.js";

const router = express.Router();

// routes
// CREATE ARTICLE
router.post("/create-article", userAuth, createArticleController);

// GET ARTICLES
router.get("/get-articles", userAuth, getAllArticlesController);

// GET USER ARTICLES
router.get("/user/get-articles", userAuth, getUserArticlesController);

export default router;
