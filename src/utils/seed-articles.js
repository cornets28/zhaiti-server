import mongoose from "mongoose";
import fs from "fs";
import articleModel from "../models/article.model.js";
import path from "path";

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
