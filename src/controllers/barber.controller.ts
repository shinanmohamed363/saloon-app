import { Request, Response } from 'express';
import Barber from '../models/barber.model';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import Salon from '../models/saloon.model';
import _ from 'lodash'; // Import lodash for deep comparison
// Controller to create a new barber
export const createBarber = async (req: Request, res: Response): Promise<void> => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const user = (req as any).user as { userID: string };
        const createdBy = user?.userID;

        if (!createdBy) {
            res.status(401).json({ error: 'Unauthorized: User ID not found in token.' });
            return;
        }

        const barberID = `barber-${uuidv4()}`;
        const { employeeID, salonID, availability, rating, name, notes, activeStatus, tips } = req.body;

        const newBarber = new Barber({
            barberID,
            employeeID,
            salonID,
            availability: availability || [],
            rating: rating || 0,
            name,
            notes,
            activeStatus,
            tips: tips || [],
            createdBy,
        });

        await newBarber.save({ session });
        await session.commitTransaction();

        res.status(201).json({ message: 'Barber created successfully', barber: newBarber });
    } catch (error) {
        console.error('Error creating barber:', error);
        await session.abortTransaction();
        res.status(500).json({ error: 'An error occurred while creating the barber' });
    } finally {
        session.endSession();
    }
};

interface Break {
    start: string;
    end: string;
    type: string;
}

interface Holiday {
    date: string; // Format: YYYY-MM-DD
    reason: string;
    locations: string[]; // Locations to apply the holiday
}

interface AvailabilityRequest {
    averageMinutesPerCustomer: number;
    breaks: Break[];
    locations: string[]; // Array of locations
    durationInDays: number; // Number of days to calculate
    holidays: Holiday[]; // Array of holidays
}

export const calculateAvailability = async (req: Request, res: Response): Promise<void> => {
    const { averageMinutesPerCustomer, breaks, locations, durationInDays, holidays }: AvailabilityRequest = req.body;

    try {
        const locationSchedules = await Promise.all(
            locations.map(async (location: string) => {
                const salon = await Salon.findOne({ location });
                if (!salon || !salon.openingHours) {
                    return {
                        location,
                        error: 'Salon not found or opening hours not available',
                        schedule: [],
                    };
                }

                const schedule: any[] = [];

                for (let i = 0; i < durationInDays; i++) {
                    const currentDate = new Date();
                    currentDate.setDate(currentDate.getDate() + i);
                    const dateStr = currentDate.toISOString().split('T')[0];
                    const dayName = currentDate.toLocaleDateString('en-EN', { weekday: 'long' });

                    const holiday = holidays.find(
                        (h: Holiday) => h.date === dateStr && h.locations.includes(location)
                    );

                    if (holiday) {
                        schedule.push({
                            date: dateStr,
                            holiday: {
                                reason: holiday.reason,
                            },
                        });
                        continue;
                    }

                    const dayHours = salon.openingHours.find((hour: any) => hour.day === dayName);
                    if (!dayHours) {
                        continue;
                    }

                    const openingTime = parseTime(dayHours.from);
                    const closingTime = parseTime(dayHours.to);
                    if (!openingTime || !closingTime) continue;

                    const slots: any[] = [];
                    let currentTime = openingTime;

                    while (currentTime < closingTime) {
                        const nextSlotEnd = new Date(
                            currentTime.getTime() + averageMinutesPerCustomer * 60 * 1000
                        );

                        if (nextSlotEnd > closingTime) break;

                        const overlappingBreak = breaks.find((brk: Break) => {
                            const breakStart = parseTime(brk.start);
                            const breakEnd = parseTime(brk.end);
                            return breakStart && breakEnd && currentTime < breakEnd && nextSlotEnd > breakStart;
                        });

                        if (overlappingBreak) {
                            const breakStart = parseTime(overlappingBreak.start);
                            const breakEnd = parseTime(overlappingBreak.end);
                            if (breakStart && breakEnd) {
                                slots.push({
                                    start: formatTime(breakStart),
                                    end: formatTime(breakEnd),
                                    type: overlappingBreak.type,
                                    isBreak: true,
                                });
                            }
                            currentTime = breakEnd!;
                        } else {
                            slots.push({
                                start: formatTime(currentTime),
                                end: formatTime(nextSlotEnd),
                                isBreak: false,
                            });
                            currentTime = nextSlotEnd;
                        }
                    }

                    schedule.push({
                        date: dateStr,
                        ...(slots.length > 0 ? { slots } : {}), // Include slots only if not empty
                    });
                }

                return { location, schedule };
            })
        );

        const groupedSchedules = groupBySchedule(locationSchedules);

        res.status(200).json({
            request: req.body,
            response: groupedSchedules,
        });
    } catch (error) {
        console.error('Error calculating availability:', error);
        res.status(500).json({ error: 'An error occurred while calculating availability' });
    }
};

// Function to group locations by identical schedules
function groupBySchedule(locationSchedules: any[]) {
    const grouped: Record<string, any> = {};

    locationSchedules.forEach(({ location, schedule, error }) => {
        if (error) {
            // Handle errors separately if needed
            return;
        }

        // Find an existing group with the same schedule
        const existingGroupKey = Object.keys(grouped).find((key) =>
            _.isEqual(grouped[key].schedule, schedule)
        );

        if (existingGroupKey) {
            // Add location to the existing group
            grouped[existingGroupKey].locations.push(location);
        } else {
            // Create a new group
            grouped[location] = {
                locations: [location],
                schedule,
            };
        }
    });

    return Object.values(grouped);
}

// Helper to parse time from "HH:mm" to Date object
function parseTime(timeStr: string): Date | null {
    const [hours, minutes] = timeStr.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) return null;

    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return now;
}

// Helper to format Date object to "HH:mm"
function formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}
