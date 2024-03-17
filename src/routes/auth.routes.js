import express from 'express';
import {loginController, registerController} from '../controllers/auth.controller.js';
import userAuth from '../middlewares/auth.middleware.js';


const router = express.Router();

// routes
router.post('/register', registerController)
router.post('/login', loginController)

export default router;