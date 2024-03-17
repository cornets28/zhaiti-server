import express from 'express';
import { updateUserController } from '../controllers/update.user.controller.js';
import userAuth from '../middlewares/auth.middleware.js';


const router = express.Router();

// routes
router.put('/update-user', userAuth, updateUserController)


export default router;