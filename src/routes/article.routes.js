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

/**
 * @swagger
 * components:
 *  schemas:
 *    Article:
 *      type: object
 *      required:
 *        - title
 *        - subtitle
 *        - description
 *        - authors
 *        - categories
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated ID of the article
 *          example: 60985e194cd57b71b0d88251
 *        title:
 *          type: string
 *          description: The title of the article
 *          example: Introduction to Swagger
 *        subtitle:
 *          type: string
 *          description: The subtitle of the article
 *          example: A beginner's guide
 *        status:
 *          type: string
 *          description: The status of the article
 *          enum: [READ, SAVE, UNREAD]
 *          default: UNREAD
 *        description:
 *          type: string
 *          description: The description of the article
 *          example: This is a detailed description of the article content.
 *        image:
 *          type: string
 *          description: The URL of the article image
 *        authors:
 *          type: array
 *          items:
 *            type: string
 *          description: The authors of the article
 *          example: ["John Doe", "Jane Smith"]
 *        categories:
 *          type: array
 *          items:
 *            type: string
 *          description: The categories of the article
 *          enum: 
 *            - lasyans
 *            - kilti
 *            - edikasyon
 *            - politik
 *            - relijyon
 *            - Espò
 *            - espirityalite
 *          example: ["kilti", "politik"]
 *        readCount:
 *          type: number
 *          description: The number of times the article has been read
 *          default: 0
 *        createdBy:
 *          type: string
 *          description: The ID of the user who created the article
 *          example: 60985e194cd57b71b0d88251
 *      example:
 *        _id: 60985e194cd57b71b0d88251
 *        title: Introduction to Swagger
 *        subtitle: A beginner's guide
 *        status: UNREAD
 *        description: This is a detailed description of the article content.
 *        image: https://example.com/article.jpg
 *        authors: ["John Doe", "Jane Smith"]
 *        categories: ["kilti", "politik"]
 *        readCount: 0
 *        createdBy: 60985e194cd57b71b0d88251
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 *  @swagger
 *  tags:
 *    name: Article
 *    description: Article APIs
 */

/**
 * @swagger
 * /api/v1/article/create-article:
 *    post:
 *      summary: Create a new article
 *      tags: [Article]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Article'
 *      responses:
 *        200:
 *          description: Article created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Article'
 *        400:
 *          description: Bad request. Invalid article data provided.
 *        401:
 *          description: Unauthorized. Authentication token is missing or invalid.
 *        500:
 *          description: Internal server error
 */

// CREATE ARTICLE || POST
router.post("/create-article", userAuth, createArticleController);

/**
 * @swagger
 * components:
 *  schemas:
 *    Article:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated ID of the article
 *          example: 60985e194cd57b71b0d88251
 *        title:
 *          type: string
 *          description: The title of the article
 *          example: Introduction to Swagger
 *        subtitle:
 *          type: string
 *          description: The subtitle of the article
 *          example: A beginner's guide
 *        status:
 *          type: string
 *          description: The status of the article
 *          enum: [READ, SAVE, UNREAD]
 *          default: UNREAD
 *        description:
 *          type: string
 *          description: The description of the article
 *          example: This is a detailed description of the article content.
 *        image:
 *          type: string
 *          description: The URL of the article image
 *        authors:
 *          type: array
 *          items:
 *            type: string
 *          description: The authors of the article
 *          example: ["John Doe", "Jane Smith"]
 *        categories:
 *          type: array
 *          items:
 *            type: string
 *          description: The categories of the article
 *          enum: 
 *            - lasyans
 *            - kilti
 *            - edikasyon
 *            - politik
 *            - relijyon
 *            - Espò
 *            - espirityalite
 *          example: ["kilti", "politik"]
 *        readCount:
 *          type: number
 *          description: The number of times the article has been read
 *          default: 0
 *        createdBy:
 *          type: string
 *          description: The ID of the user who created the article
 *          example: 60985e194cd57b71b0d88251
 *      example:
 *        _id: 60985e194cd57b71b0d88251
 *        title: Introduction to Swagger
 *        subtitle: A beginner's guide
 *        status: UNREAD
 *        description: This is a detailed description of the article content.
 *        image: https://example.com/article.jpg
 *        authors: ["John Doe", "Jane Smith"]
 *        categories: ["kilti", "politik"]
 *        readCount: 0
 *        createdBy: 60985e194cd57b71b0d88251
 */

/**
 *  @swagger
 *  tags:
 *    name: Article
 *    description: Article APIs
 */

/**
 * @swagger
 * /api/v1/article/get-articles:
 *    get:
 *      summary: Get all articles
 *      tags: [Article]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Successfully retrieved articles
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Article'
 *        401:
 *          description: Unauthorized. Authentication token is missing or invalid.
 *        500:
 *          description: Internal server error
 */

// GET ARTICLES || GET
router.get("/get-articles", userAuth, getAllArticlesController);

// GET USER ARTICLES || GET
router.get("/user/get-articles", userAuth, getUserArticlesController);

/**
 *  @swagger
 *  tags:
 *    name: Article
 *    description: Article APIs
 */

/**
 * @swagger
 * /api/v1/article/update-article/{id}:
 *    patch:
 *      summary: Update an article
 *      tags: [Article]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: The ID of the article to update
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ArticleUpdate'
 *      responses:
 *        200:
 *          description: Article updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Article'
 *        400:
 *          description: Bad request. Invalid article data provided.
 *        401:
 *          description: Unauthorized. Authentication token is missing or invalid.
 *        404:
 *          description: Not found. Article with the provided ID not found.
 *        500:
 *          description: Internal server error
 */

// UPDATE ARTICLE ||  PATCH || PUT
router.patch("/update-article/:id", userAuth, updateArticlesController);


/**
 *  @swagger
 *  tags:
 *    name: Article
 *    description: Article APIs
 */

/**
 * @swagger
 * /api/v1/article/delete-article/{id}:
 *    delete:
 *      summary: Delete an article
 *      tags: [Article]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: The ID of the article to delete
 *      responses:
 *        200:
 *          description: Article deleted successfully
 *        401:
 *          description: Unauthorized. Authentication token is missing or invalid.
 *        404:
 *          description: Not found. Article with the provided ID not found.
 *        500:
 *          description: Internal server error
 */
// DELETE ARTICLE || DELETE
router.delete("/delete-article/:id", userAuth, deleteArticleController);

// ARTICLES STATS AND FILTER|| GET
router.get("/article-stats", userAuth, articleStatsController);


export default router;
