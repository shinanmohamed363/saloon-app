import mongoose, { Schema, Document } from 'mongoose';

interface Break {
    start: string;
    end: string;
    type: string;
}

interface Holiday {
    date: string; // Format: YYYY-MM-DD
    reason: string;
    locations: string[];
}

interface Slot {
    start: string; // Format: HH:mm
    end: string;   // Format: HH:mm
    isBreak: boolean;
    type?: string; // Type of break if `isBreak` is true
}

interface DaySchedule {
    date: string; // Format: YYYY-MM-DD
    holiday?: { reason: string }; // If it's a holiday, include reason
    slots?: Slot[]; // Array of slots for non-holiday days
}

interface LocationSchedule {
    locations: string[]; // Grouped locations with identical schedules
    schedule: DaySchedule[]; // Schedules for the duration
}

interface AvailabilityDocument extends Document {
    createdBy: string; // User ID of the person who created the record
    request: {
        averageMinutesPerCustomer: number;
        breaks: Break[];
        locations: string[];
        durationInDays: number;
        holidays: Holiday[];
    }; // The input request details
    response: LocationSchedule[]; // The calculated availability schedules grouped by identical schedules
    createdAt: Date; // Timestamp for creation
    updatedAt: Date; // Timestamp for the last update
    notes?: string; // Optional field for notes or comments
    metadata?: Record<string, any>; // Optional field for additional information (e.g., app version)
}

const AvailabilitySchema = new Schema<AvailabilityDocument>(
    {
        createdBy: { type: String, required: true, index: true }, // Indexed for faster queries
        request: {
            type: {
                averageMinutesPerCustomer: { type: Number, required: true },
                breaks: {
                    type: [
                        {
                            start: { type: String, required: true },
                            end: { type: String, required: true },
                            type: { type: String, required: true },
                        },
                    ],
                    required: true,
                    _id: false, // Disable _id for breaks
                },
                locations: { type: [String], required: true },
                durationInDays: { type: Number, required: true },
                holidays: {
                    type: [
                        {
                            date: { type: String, required: true },
                            reason: { type: String, required: true },
                            locations: { type: [String], required: true },
                        },
                    ],
                    required: true,
                    _id: false, // Disable _id for holidays
                },
            },
            required: true,
            _id: false, // Disable _id for request
        },
        response: {
            type: [
                {
                    locations: { type: [String], required: true },
                    schedule: {
                        type: [
                            {
                                date: { type: String, required: true },
                                holiday: {
                                    type: {
                                        reason: { type: String, required: true },
                                    },
                                    required: false,
                                    _id: false, // Disable _id for holiday in schedule
                                },
                                slots: {
                                    type: [
                                        {
                                            start: { type: String, required: true },
                                            end: { type: String, required: true },
                                            isBreak: { type: Boolean, required: true },
                                            type: { type: String, required: false },
                                        },
                                    ],
                                    required: false,
                                    _id: false, // Disable _id for slots
                                },
                            },
                        ],
                        required: true,
                        _id: false, // Disable _id for schedule
                    },
                },
            ],
            required: true,
            _id: false, // Disable _id for response
        },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        notes: { type: String },
        metadata: { type: Schema.Types.Mixed }, // Support mixed/structured metadata
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt
    }
);

export default mongoose.model<AvailabilityDocument>('Availability', AvailabilitySchema);
