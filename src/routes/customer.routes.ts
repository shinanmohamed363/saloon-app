import express from 'express';
import * as customerController from '../controllers/customer.controller';

const router = express.Router();

router.post('/', customerController.createCustomer);
router.get('/', customerController.getCustomers);

// add more routes as needed

export default router;
