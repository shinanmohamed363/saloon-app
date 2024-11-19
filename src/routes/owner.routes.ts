import express from 'express';
import * as OwnerController from '../controllers/Owner.controller';
import { validateSchema } from '../middlewares/validationMiddlewares';
import { ownerZodSchema } from '../models/owner.model';
import verifyToken from '../middlewares/verifyuser';

const router = express.Router();

// Protect the register route with verifyToken middleware
router.post('/register' ,validateSchema(ownerZodSchema), OwnerController.createOwner);
router.put('/update/:userID',verifyToken,validateSchema(ownerZodSchema),OwnerController.updateOwnerByUserID);
router.delete('/:userID',verifyToken ,OwnerController.deleteOwnerByUserID);
router.get('/:userID', verifyToken, OwnerController.getOwnerByUserID);
router.delete('/delete-owner/:userID',verifyToken,OwnerController. checkBeforeDeleteAccount);
router.delete('/force-delete/:userID',verifyToken, OwnerController.forceDeleteOwnerAccount);

export default router;
