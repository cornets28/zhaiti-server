import mongoose from "mongoose";
import fs from "fs";
import articleModel from "../models/article.model.js";

import path from "path";
import { v4 as uuidv4 } from 'uuid';

const filename =  path.join(path.dirname(new URL(import.meta.url).pathname), "articles.json");

export const createArticlesFromJson = async () => {
 
  try {
    await mongoose.connect("mongodb+srv://Samy:MyPassword@cluster0.soiroik.mongodb.net/zhaitinewsdata")
    const jsonData = fs.readFileSync(filename, "utf8");
    const articles = JSON.parse(jsonData);
    const existingArticles = JSON.parse(jsonData);


    const newArticles = [];
        for (let i = 0; i < 5; i++) {
            const newId = new mongoose.Types.ObjectId(); 
            const newArticle = {
              "_id": newId,
              "title": `Title ${i + 1}`,
              "subtitle": `Subtitle ${i + 1}`,
              "status": "UNREAD",
              "description": `Description ${i + 1}`,
              "image": `www.example.com/image${i + 1}`,
              "categories": [`category${i + 1}`, `category${i + 2}`],
              "readCount": 0,
              "createdBy": "65f5f23ba71afc3c5ad899cb",
              "createdAt": new Date().toISOString(),
              "updatedAt": new Date().toISOString(),
              "__v": 0,
              "authors": [`Author ${i + 1}`, `Author ${i + 2}`]
                
            };
            newArticles.push(newArticle);
        }

        // Append the new articles to the existing articles
        const updatedArticles = existingArticles.concat(newArticles);

        // Write the updated articles back to the file
        fs.writeFileSync(filename, JSON.stringify(updatedArticles, null, 2));

        console.log("65 more articles added to articles.json successfully.");

    for (const articleData of articles) {
      await articleModel.create(articleData);
    }

    console.log("Articles created successfully.");
  } catch (error) {
    console.error("Error creating articles:", error);
  } finally {
    mongoose.disconnect();
  }
};

// import mongoose from "mongoose";
// import fs from "fs";
// import articleModel from "../models/article.model.js";
// import path from "path";
// import { v4 as uuidv4 } from 'uuid';

// const filename = path.join(path.dirname(new URL(import.meta.url).pathname), "articles.json");

// export const createArticlesFromJson = async () => {
//   try {
//     await mongoose.connect("mongodb+srv://Samy:MyPassword@cluster0.soiroik.mongodb.net/zhaitinewsdata");

//     // Read existing articles from the file
//     const jsonData = fs.readFileSync(filename, "utf8");
//     const existingArticles = JSON.parse(jsonData);

//     // Generate 65 new articles
//     const newArticles = [];
//     for (let i = 0; i < 65; i++) {
//       const newId = new mongoose.Types.ObjectId(); // Generate a new UUID
//       const newArticle = {
//         "_id": newId, // Convert UUID to string
//         "title": `Title ${i + 1}`,
//         "subtitle": `Subtitle ${i + 1}`,
//         "status": "UNREAD",
//         "description": `Description ${i + 1}`,
//         "image": `www.example.com/image${i + 1}`,
//         "categories": ["lasyans", "kilti"], // Adjust categories according to your requirements
//         "readCount": 0,
//         "createdBy": "65f5f23ba71afc3c5ad899ab",
//         "createdAt": new Date().toISOString(),
//         "updatedAt": new Date().toISOString(),
//         "__v": 0,
//         "authors": [`Author ${i + 1}`, `Author ${i + 2}`]
//       };
//       newArticles.push(newArticle);
//     }

//     // Combine existing articles with new articles
//     const allArticles = existingArticles.concat(newArticles);

//     // Validate and insert all articles into the database
//     await articleModel.insertMany(allArticles);

//     console.log("Articles created successfully.");
//   } catch (error) {
//     console.error("Error creating articles:", error);
//   } finally {
//     mongoose.disconnect();
//   }
// };
