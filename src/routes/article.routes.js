import express from 'express';
import { createArticleController, getAllArticlesController } from '../controllers/article.controller.js';
import userAuth from '../middlewares/auth.middleware.js';


const router = express.Router();

// routes
// CREATE ARTICLE
router.post('/create-article', userAuth, createArticleController)

// GET ARTICLES
router.get('/get-articles', userAuth, getAllArticlesController)


export default router;