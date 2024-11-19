import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid'; 
import Owner from '../models/owner.model';
import User from '../models/user.model';
import Staff from '../models/staff.model';
import mongoose from 'mongoose';


export const createOwner = async (req: Request, res: Response) => {
  const session = await mongoose.startSession(); 
  session.startTransaction(); 

  try {
    const { name, email, password, phone, address, note, totalRevenue } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userID = `owner-${uuidv4()}`;
    const newUser = new User({
      userID,
      name,
      email,
      password: hashedPassword,
      role: 'Owner',
    });

    await newUser.save({ session }); // Save User within transaction
    // Create new Owner document
    const newOwner = new Owner({
      ownerID: newUser.userID,
      name,
      email,
      phone,
      totalRevenue,
      address,
      note,
    });
    await newOwner.save({ session }); // Save Owner within transaction
    await session.commitTransaction(); // Commit the transaction
    // Return response with structured format
    res.status(201).json({ data: { owner: newOwner, user: newUser } });
  } catch (error) {
    await session.abortTransaction(); // Rollback the transaction on error
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    res.status(500).json({ errors: [{ message: errorMessage }] });
  } finally {
    session.endSession();
  }
};

export const updateOwnerByUserID = async (req: Request, res: Response): Promise<void> => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const { userID } = req.params;
      const { name, email, phone, address, note, totalRevenue } = req.body;
  
      // Update the user document
      const updatedUser = await User.findOneAndUpdate(
        { userID },
        { name, email },
        { new: true, session }
      );
  
      if (!updatedUser) {
        res.status(404).json({ error: 'User not found' });
        await session.abortTransaction();
        return;
      }
  
      // Update the owner document
      const updatedOwner = await Owner.findOneAndUpdate(
        { ownerID: userID },
        { name, email, phone, address, note, totalRevenue },
        { new: true, session }
      );
  
      if (!updatedOwner) {
        res.status(404).json({ error: 'Owner not found' });
        await session.abortTransaction();
        return;
      }
  
      await session.commitTransaction();
      res.status(200).json({ data: { owner: updatedOwner, user: updatedUser } });
    } catch (error) {
      await session.abortTransaction();
      res.status(500).json({ error: 'An error occurred during the update process.' });
    } finally {
      session.endSession();
    }
  };

export const deleteOwnerByUserID = async (req: Request, res: Response): Promise<void> => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const { userID } = req.params;
  
      // Find and delete the User document
      const deletedUser = await User.findOneAndDelete({ userID }, { session });
      if (!deletedUser) {
        res.status(404).json({ error: 'User not found' });
        await session.abortTransaction();  
        return;                           
      }                                   
  
      // Find and delete the Owner document
      const deletedOwner = await Owner.findOneAndDelete({ ownerID: userID }, { session });
      if (!deletedOwner) {
        res.status(404).json({ error: 'Owner not found' });
        await session.abortTransaction();
        return;
      }
  
      await session.commitTransaction();
      res.status(200).json({ message: 'Owner and associated user deleted successfully' });
    } catch (error) {
      await session.abortTransaction();
      res.status(500).json({ error: 'An error occurred during deletion.' });
    } finally {
      session.endSession();
    }
};

export const getOwnerByUserID = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userID } = req.params;
  
     
      const owner = await Owner.findOne({ ownerID: userID });
      if (!owner) {
        res.status(404).json({ error: 'Owner not found' });
        return;
      }
  
      
      // const user = await User.findOne({ userID: userID });
  
      res.status(200).json({ data: owner });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the owner.' });
    }
};

export const checkBeforeDeleteAccount = async (req: Request, res: Response): Promise<void> => {
    const { userID } = req.params;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Step 1: Check if any staff exist under this owner's userID (created_by field)
        const staff = await Staff.findOne({ created_by: userID });
        
        if (staff) {
            // If staff exists, return a message that deletion can't proceed
            res.status(400).json({
                message: 'You cannot delete this owner account because there are staff members under your ownership.'
            });
            return;
        }

        // Step 2: No staff found, proceed with deletion of Owner and User
        // Delete the Owner document
        const deletedOwner = await Owner.findOneAndDelete({ ownerID: userID }, { session });
        if (!deletedOwner) {
            res.status(404).json({ error: 'Owner not found' });
            await session.abortTransaction();
            return;
        }

        // Delete the associated User document
        const deletedUser = await User.findOneAndDelete({ userID }, { session });
        if (!deletedUser) {
            res.status(404).json({ error: 'User not found' });
            await session.abortTransaction();
            return;
        }

        // Step 3: Commit the transaction to ensure atomicity
        await session.commitTransaction();
        res.status(200).json({ message: 'Owner and associated user successfully deleted.' });

    } catch (error) {
        // Abort the transaction if any error occurs
        await session.abortTransaction();
        res.status(500).json({ error: 'An error occurred while deleting the owner and user.' });
    } finally {
        // End the session regardless of success or failure
        session.endSession();
    }
};

export const forceDeleteOwnerAccount = async (req: Request, res: Response): Promise<void> => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { userID } = req.params;

        // Step 1: Delete all staff associated with this owner (created_by = userID)
        const deletedStaff = await Staff.deleteMany({ created_by: userID }, { session });
        if (deletedStaff.deletedCount === 0) {
            res.status(404).json({ error: 'No staff found under this owner.' });
            await session.abortTransaction();
            return;
        }

        // Step 2: Delete the Owner document
        const deletedOwner = await Owner.findOneAndDelete({ ownerID: userID }, { session });
        if (!deletedOwner) {
            res.status(404).json({ error: 'Owner not found.' });
            await session.abortTransaction();
            return;
        }

        // Step 3: Delete the associated User document
        const deletedUser = await User.findOneAndDelete({ userID }, { session });
        if (!deletedUser) {
            res.status(404).json({ error: 'User not found.' });
            await session.abortTransaction();
            return;
        }

        // Commit the transaction if everything goes well
        await session.commitTransaction();
        res.status(200).json({ message: 'Owner, associated staff, and user successfully deleted.' });
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ error: 'An error occurred during the deletion process.' });
    } finally {
        session.endSession();
    }
};
