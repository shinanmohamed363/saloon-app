// src/routes/user.routes.ts
import express from 'express';
import * as userController from '../controllers/user.controller';
import { validateSchema } from '../middlewares/validationMiddlewares';
import { userZodSchema } from '../models/user.model';
import verifyToken from '../middlewares/verifyuser';

const router = express.Router();

// Protect the register route with verifyToken middleware
router.post('/register',  validateSchema(userZodSchema), userController.createuser);
router.post('/login', userController.loginuser);


export default router;
