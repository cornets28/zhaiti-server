import express from "express";
import {
  updateUserController,
  getUserController,
} from "../controllers/user.controller.js";
import userAuth from "../middlewares/auth.middleware.js";

const router = express.Router();

// routes

// GET USER DATA || POST
router.post("/getUser", userAuth, getUserController);

// UPDATE USER DATA || PuT
router.put("/update-user", userAuth, updateUserController);

export default router;
