import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Availability from '../models/AvailabilityRequest.model'; // Assuming AvailabilitySchema is in models/Availability
import Barber from '../models/barber.model'; // Assuming Barber schema is in models/Barber
import Staff from '../models/staff.model'; // Assuming Staff schema is in models/Staff

// Function to assign schedule date and slot to barber
export const assign_schedule_date_and_slot_to_barber = async (req: Request, res: Response): Promise<Response<any>> => {
    const user = (req as any).user as { userID: string };
    const createdBy = user.userID;

    try {
        // Step 1: Fetch the availability schedule based on the user ID (createdBy)
        const availabilityRecord = await Availability.findOne({ createdBy });
        if (!availabilityRecord) {
            return res.status(404).json({ error: 'Availability record not found' });
        }

        // Step 2: Find the staff members created by the same user
        const staffMembers = await Staff.find({ created_by: createdBy });
        if (!staffMembers || staffMembers.length === 0) {
            return res.status(404).json({ error: 'No staff members found for the user' });
        }

        // Step 3: Loop through staff members and update barber availability
        for (let staff of staffMembers) {
            const barber = await Barber.findOne({ employeeID: staff.employeeID });
            if (!barber) {
                continue; // Skip if no barber is found
            }

            // Check if the barber's location matches any location in the availability schedule
            for (let locationSchedule of availabilityRecord.response) {
                if (locationSchedule.locations.includes(staff.workLocation)) {
                    // Step 4: Assign schedule dates and slots to the barber's availability
                    const barberAvailability = barber.availability || []; // Ensure availability exists

                    // Use Promise.all to handle asynchronous operations inside the loop
                    const updateAvailabilityPromises = locationSchedule.schedule.map(async (daySchedule) => {
                        const existingAvailability = barberAvailability.find(
                            (avail) => avail.date === daySchedule.date
                        );

                        // Filter out slots where `isBreak` is true
                        const validSlots = Array.isArray(daySchedule.slots)
                            ? daySchedule.slots.filter((slot) => slot.isBreak !== true)
                            : [];

                        if (existingAvailability) {
                            // If the date exists, update the existing availability with new slots
                            existingAvailability.entries.push(...validSlots.map((slot) => ({
                                start_time: slot.start,
                                end_time: slot.end,
                                taskName: [],
                                reservedStatus: "available" as "available", // Ensure valid string literal type
                                appointmentID: "",
                                rating: undefined,
                                tips: [],
                            })));
                        } else {
                            // If no availability for this date, create a new entry for that day
                            barberAvailability.push({
                                date: daySchedule.date,
                                entries: validSlots.map((slot) => ({
                                    start_time: slot.start,
                                    end_time: slot.end,
                                    taskName: [],
                                    reservedStatus: "available" as "available", // Ensure valid string literal type
                                    appointmentID: "",
                                    rating: undefined,
                                    tips: [],
                                })),
                            });
                        }
                    });

                    // Wait for all promises to resolve before moving forward
                    await Promise.all(updateAvailabilityPromises);

                    // Save the barber with the updated availability
                    barber.availability = barberAvailability;
                    await barber.save();
                }
            }
        }

        return res.status(200).json({ message: 'Schedules assigned successfully' });
    } catch (error) {
        console.error('Error assigning schedule to barber:', error);
        return res.status(500).json({ error: 'An error occurred while assigning schedule to barber' });
    }
};
