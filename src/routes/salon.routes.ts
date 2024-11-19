import express from 'express';
import * as SalonController from '../controllers/Salon.controller';
import { validateSchema } from '../middlewares/validationMiddlewares';
import { salonZodSchema } from '../models/saloon.model';
import verifyToken from '../middlewares/verifyuser';

const router = express.Router();

// Protect the register route with verifyToken middleware
router.post('/create',verifyToken,validateSchema(salonZodSchema), SalonController.createSalon);
router.put('/:salonID',verifyToken,validateSchema(salonZodSchema),SalonController.updateSalon);
router.get('/salons/:salonID',verifyToken,SalonController. getSalonByID);
router.get('/salon/by-user',verifyToken, SalonController. getSalonsByUserID);

export default router;