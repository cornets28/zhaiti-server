import articleModel from "../models/article.model.js";
import mongoose from "mongoose";
import moment from "moment";

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
  const { status, search, sort } = req.query;
  //conditions for searching filters
  const queryObject = {
    createdBy: req.user.userId,
  };
  //logic filters
  if (status && status !== "all") {
    queryObject.status = status;
  }
  // if (workType && workType !== "all") {
  //   queryObject.workType = workType;
  // }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  let queryResult = articleModel.find(queryObject);
  const articles = await queryResult;

  //   const articles = await articleModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    totalArticles: articles.length,
    articles,
  });
};

// ======= GET ARTICLES =========
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
  //find article
  const article = await articleModel.findOne({ _id: id });
  //validation
  if (!article) {
    next(`No article found with this id ${id}`);
  }

  console.log("req.user.userRole :", req.user.userRole);

  if (
    req.user.userRole !== "SUPER_ADMIN" ||
    req.user.userId == article.createdBy.toString()
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
  res.status(200).json({ updateArticle });
};

// ======= DELETE ARTICLE ===========
export const deleteArticleController = async (req, res, next) => {
  const { id } = req.params;
  //find article
  const article = await articleModel.findOne({ _id: id });
  //validation
  if (!article) {
    next(`No article Found with this id ${id}.`);
  }
  if (
    req.user.userRole !== "SUPER_ADMIN" ||
    !req.user.userId === article.createdBy.toString()
  ) {
    next("Your not authorize to delete this article!");
    return;
  }
  await article.deleteOne();
  res.status(200).json({ message: "Article Deleted successfully!" });
};

// =======  ARTICLES STATS & FILTERS ===========
export const articleStatsController = async (req, res) => {
  const stats = await articleModel.aggregate([
    // search by user articles
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  //default stats
  const defaultStats = {
    unread: stats.UNREAD || 0,
    read: stats.READ || 0,
    save: stats.SAVE || 0,
  };

  //monthly yearly stats
  let monthlyApplication = await articleModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();
  res
    .status(200)
    .json({ totalArticle: stats.length, defaultStats, monthlyApplication });
};
