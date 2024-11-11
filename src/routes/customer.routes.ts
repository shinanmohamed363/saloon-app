// src/routes/customer.routes.ts
import express from 'express';
import * as customerController from '../controllers/customer.controller';
import { validateSchema } from '../middlewares/validationMiddlewares';
import { customerZodSchema } from '../models/customer.model';

const router = express.Router();

router.post('/', validateSchema(customerZodSchema), customerController.createCustomer);
router.get('/', customerController.getCustomers);

export default router;
