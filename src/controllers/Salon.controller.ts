import { Request, Response } from 'express';
import Salon from '../models/saloon.model';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Controller for creating a Salon
export const createSalon = async (req: Request, res: Response): Promise<void> => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Extract user ID from the token payload
        const user = (req as any).user as { userID: string };
        const createdBy = user.userID;
        

        // Generate a unique salonID
        const salonID = `salon-${uuidv4()}`;

        // Create a new Salon document
        const {
            name, gallery, rating, totalRevenue, servicesOffered, address, openingHours,
            location, photo, category, isOpen,
        } = req.body;

        const newSalon = new Salon({
            salonID,  // Unique salon ID in the format "salon-<unique-id>"
            name,
            created_by: createdBy,  // Store the userID from token in created_by
            gallery,
            rating,
            totalRevenue,
            servicesOffered,
            address,
            openingHours,
            location,
            photo,
            category,
            isOpen,
        });

        // Save the new salon document
        await newSalon.save({ session });
        await session.commitTransaction();

        res.status(201).json({ message: 'Salon created successfully', salon: newSalon });
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ error: 'An error occurred while creating the salon' });
    } finally {
        session.endSession();
    }
};

export const updateSalon = async (req: Request, res: Response): Promise<void> => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { salonID } = req.params;

        // Parse the authenticated user's ID from the token
        const user = (req as any).user as { userID: string };
        const userID = user.userID;

        // Find the salon by salonID and ensure the user is the creator
        const salon = await Salon.findOne({ salonID, created_by: userID });
        if (!salon) {
            res.status(404).json({ error: 'Salon not found or you are not authorized to update this salon' });
            return;
        }
        // Update salon data from request body, with only provided fields
        const updates = req.body;
        await Salon.updateOne({ salonID }, { $set: updates }, { session });
        await session.commitTransaction();

        res.status(200).json({ message: 'Salon updated successfully' });
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ error: 'An error occurred while updating the salon' });
    } finally {
        session.endSession();
    }
};

export const getSalonByID = async (req: Request, res: Response): Promise<void> => {
    try {
        const { salonID } = req.params;

        // Find the salon by salonID
        const salon = await Salon.findOne({ salonID });
        
        if (!salon) {
            res.status(404).json({ error: 'Salon not found' });
            return;
        }

        // Return the salon details
        res.status(200).json({ salon });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the salon details' });
    }
};

export const getSalonsByUserID = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extract user ID from the token payload (set by middleware)
        const user = (req as any).user as { userID: string };
        const userid = user.userID;


        // Find salons created by this user
        const salons = await Salon.find({ created_by: userid });

        // If no salons found, return a 404 message
        if (salons.length === 0) {
            res.status(404).json({ message: 'No salons found for this user.' });
            return;
        }

        // Return the list of salons
        res.status(200).json({ salons });
    } catch (error) {
        console.error('Error while retrieving salons:', error); // Log detailed error
        res.status(500).json({ error: 'An error occurred while retrieving salons' });
    }
};



