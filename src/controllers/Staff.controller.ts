import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/user.model';
import Staff from '../models/staff.model';
import mongoose from 'mongoose';

export const createStaff = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const {
        name, email, password, role, workLocation, salary, phone, availability,
        experience, specialization, hireDate, performanceRating,
      } = req.body;
  
      
      const user = (req as any).user as { userID: string };
      const createdBy = user.userID;
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const userID = `staff-${uuidv4()}`;
  
      const newUser = new User({
        userID,
        name,
        email,
        password: hashedPassword,
        role: 'Staff', 
      });
  
      await newUser.save({ session });
  
      const newStaff = new Staff({
        employeeID: newUser.userID,
        name,
        created_by: createdBy, 
        role,
        workLocation,   
        salary,
        phone,
        email,
        availability,   
        experience,
        specialization,
        hireDate,
        performanceRating,
      });
  
      await newStaff.save({ session });
      await session.commitTransaction();
  
      res.status(201).json({ data: { staff: newStaff, user: newUser } });
    } catch (error) {
      await session.abortTransaction();
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      res.status(500).json({ errors: [{ message: errorMessage }] });
    } finally {
      session.endSession();
    }
  };

  export const updateStaff = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const { employeeID } = req.params; // Assuming employeeID is passed in the route params
      const { name, email, password, role, workLocation, salary, phone, availability, experience, specialization, hireDate, performanceRating } = req.body;
  
      // Find and update the User document for name, email, password
      const userUpdateData: any = {};
      if (name) userUpdateData.name = name;
      if (email) userUpdateData.email = email;
      if (password) userUpdateData.password = await bcrypt.hash(password, 10);
  
      const user = await User.findOneAndUpdate(
        { userID: employeeID },
        { $set: userUpdateData },
        { new: true, session }
      );
  
      if (!user) {
        throw new Error("User not found");
      }
  
      // Find and update the Staff document with other fields
      const staffUpdateData: any = {
        role,
        workLocation,
        salary,
        phone,
        availability,
        experience,
        specialization,
        hireDate,
        performanceRating,
      };
  
      const staff = await Staff.findOneAndUpdate(
        { employeeID },
        { $set: staffUpdateData },
        { new: true, session }
      );
  
      if (!staff) {
        throw new Error("Staff not found");
      }
  
      await session.commitTransaction();
      res.status(200).json({ data: { staff, user } });
    } catch (error) {
      await session.abortTransaction();
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      res.status(500).json({ errors: [{ message: errorMessage }] });
    } finally {
      session.endSession();
    }
  };

  export const deleteStaff = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const { employeeID } = req.params;
  
      // Find and delete the User document associated with this employeeID
      const user = await User.findOneAndDelete({ userID: employeeID }, { session });
      if (!user) {
        throw new Error('User not found');
      }
  
      // Find and delete the Staff document associated with this employeeID
      const staff = await Staff.findOneAndDelete({ employeeID }, { session });
      if (!staff) {
        throw new Error('Staff not found');
      }
  
      await session.commitTransaction();
      res.status(200).json({ message: 'Staff and associated user successfully deleted' });
    } catch (error) {
      await session.abortTransaction();
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      res.status(500).json({ errors: [{ message: errorMessage }] });
    } finally {
      session.endSession();
    }
  };


  export const getStaffByEmployeeID = async (req: Request, res: Response): Promise<void> => {
    try {
      const { employeeID } = req.params;
  
      // Find the Staff document by employeeID
      const staff = await Staff.findOne({ employeeID });
      if (!staff) {
        res.status(404).json({ error: 'Staff member not found' });
        return;
      }
  
      res.status(200).json({ data: staff });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the staff member.' });
    }
  };


export const getStaffByWorkLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { workLocation } = req.params;

    // Find all staff members with the specified work location
    const staffList = await Staff.find({ workLocation });
    if (staffList.length === 0) {
      res.status(404).json({ error: 'No staff found for the specified work location' });
      return;
    }

    res.status(200).json({ data: staffList });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the staff members.' });
  }
};



