import express from 'express';
import * as BarberController from '../controllers/barber.controller';
import { validateSchema } from '../middlewares/validationMiddlewares';
import { barberZodSchema } from '../models/barber.model';
import verifyToken from '../middlewares/verifyuser';

const router = express.Router();

// Protect the register route with verifyToken middleware
router.post('/create',verifyToken, BarberController.createBarber);
router.post('/availability',BarberController.calculateAvailability);