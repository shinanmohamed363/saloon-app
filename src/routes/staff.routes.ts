import express from 'express';
import * as StaffController from '../controllers/Staff.controller';
import { validateSchema } from '../middlewares/validationMiddlewares';
import { staffZodSchema } from '../models/staff.model';
import verifyToken from '../middlewares/verifyuser';

const router = express.Router();

// Protect the register route with verifyToken middleware
router.post('/register',verifyToken,validateSchema(staffZodSchema), StaffController.createStaff);
router.put('/:employeeID',verifyToken,validateSchema(staffZodSchema),StaffController.updateStaff);
router.delete('/:employeeID',verifyToken, StaffController.deleteStaff);
router.get('/:employeeID',verifyToken, StaffController.getStaffByEmployeeID);
router.get('/:workLocation',verifyToken, StaffController.getStaffByWorkLocation);

export default router;
