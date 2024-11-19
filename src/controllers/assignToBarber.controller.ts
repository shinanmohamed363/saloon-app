import { Request, Response } from 'express';
import { assign_schedule_date_and_slot_to_barber } from '../services/assignToBarber';

export const assign_schedule_date_and_slot_to_barberController = async (req: Request, res: Response): Promise<void> => {
    try {
        // Pass both req and res to the service function
        await assign_schedule_date_and_slot_to_barber(req, res);

        // No need to send a response here since the service handles it
    } catch (error) {
        // Handle known error type (Error)
        if (error instanceof Error) {
            console.error('Error in assignToEmployeeController:', error.message);
            res.status(500).json({ error: error.message }); // Return the error message
        } else {
            // Handle unexpected error type (non-Error object)
            console.error('Unexpected error:', error);
            res.status(500).json({ error: 'An unexpected error occurred.' });
        }
    }
};
