import articleModel from "../models/article.model.js";

// ======= CREATE ARTICLE =========
export const createArticleController = async (req, res, next) => {
  const { image, categories, authors } = req.body;

  if (!image || categories.length === 0 || authors.length === 0) {
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

// ======= UPDATE ARTICLE =========
export const updateArticlesController = async (req, res, next) => {
  const { id } = req.params;
  const { title, subtitle, description, image, authors } = req.body;
  //validation
  if (!title || !subtitle || !description || !image || !authors) {
    next("Please Provide All Fields");
  }
  //find job
  const article = await articleModel.findOne({ _id: id });
  //validation
  if (!article) {
    next(`No article found with this id ${id}`);
  }

if (req.user.userId !== article.createdBy.toString() 
    // || req.user.role !== "SUPER_ADMIN"
    ) {
    return next("You are not authorized to update this article");
  }
  const updateArticle = await articleModel.findOneAndUpdate(
    { _id: id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  //res
  res.status(200).json({ updateArticle });
};
