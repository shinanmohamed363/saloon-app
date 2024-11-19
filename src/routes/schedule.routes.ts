import express from 'express';
import * as availabilityController from '../controllers/availability.controller';
import { validateSchema } from '../middlewares/validationMiddlewares';
import { salonZodSchema } from '../models/saloon.model';
import verifyToken from '../middlewares/verifyuser';

const router = express.Router();

// Protect the register route with verifyToken middleware
router.post('/createschedule',verifyToken, availabilityController.saveAvailabilityController);
router.put('/updateschedule',verifyToken, availabilityController.updateAvailability );// this will work exsisting shedule delete and new shedule will be added
export default router;