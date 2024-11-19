import { Request, Response } from 'express';
import {saveAvailability}  from '../services/saveAvailability';
import Availability from '../models/AvailabilityRequest.model';


export const saveAvailabilityController = async (req: Request, res: Response): Promise<void> => {
    const user = (req as any).user as { userID: string }; // Extract user info from token
    const createdBy = user.userID;

    const { request, response, notes, metadata } = req.body;

    try {
        await saveAvailability(createdBy, request, response, notes, metadata);

        res.status(200).json({ message: 'Availability saved successfully.' });
    } catch (error) {
        console.error('Error saving availability:', error);
        res.status(500).json({ error: 'Failed to save availability.' });
    }
};

export const updateAvailability = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extract user ID from token
        const user = (req as any).user as { userID: string };
        const createdBy = user.userID;

        // New data from request body
        const {
            request, // { averageMinutesPerCustomer, breaks, locations, durationInDays, holidays }
            response,
            notes,
            metadata,
        } = req.body;

        // Step 1: Delete existing document for this user
        await Availability.findOneAndDelete({ createdBy });

        // Step 2: Save the new data
        const newAvailability = new Availability({
            createdBy,
            request,
            response,
            notes,
            metadata,
        });

        await newAvailability.save();

        res.status(200).json({
            message: 'Availability data updated successfully.',
            data: newAvailability,
        });
    } catch (error) {
        console.error('Error updating availability:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};