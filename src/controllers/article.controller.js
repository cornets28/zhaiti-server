import articleModel from "../models/article.model.js";

// ======= CREATE ARTICLE =========
export const createArticleController = async (req, res, next) => {
  const { image, categories } = req.body;

  if (!image || categories.length === 0) {
    next("Please Provide All Fields");
  }

  // Add createdBy field to request body
  req.body.createdBy = req.user.userId;

  // Create article
  const article = await articleModel.create(req.body);

  // Return success response
  res
    .status(201)
    .json({ success: true, message: "Article created successfully", article });
};

// ======= GET ARTICLES BY USER =========
export const getUserArticlesController = async (req, res, next) => {
  const articles = await articleModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    totalArticles: articles.length,
    articles,
  });
};

// ======= GET ARTICLES BY USER =========
export const getAllArticlesController = async (req, res, next) => {
    const articles = await articleModel.find();
    res.status(200).json({
      totalArticles: articles.length,
      articles,
    });
  };
