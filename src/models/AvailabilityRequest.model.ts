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

interface AvailabilityDocument extends Document {
    createdBy: string; // User ID of the person who created the record
    request: {
        averageMinutesPerCustomer: number;
        breaks: Break[];
        locations: string[];
        durationInDays: number;
        holidays: Holiday[];
    }; // The input request details
    response: object[]; // The calculated availability schedules for each location
    createdAt: Date; // Timestamp for creation
    updatedAt: Date; // Timestamp for the last update
    notes?: string; // Optional field for notes or comments
    metadata?: object; // Optional field for additional information (e.g., app version)
}

const AvailabilitySchema = new Schema<AvailabilityDocument>(
    {
        createdBy: { type: String, required: true }, // User who created the record
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
                },
                locations: { type: [String], required: true },
                durationInDays: { type: Number, required: true },
                holidays: {
                    type: [
                        {
                            date: { type: String, required: true }, // Format: YYYY-MM-DD
                            reason: { type: String, required: true },
                            locations: { type: [String], required: true },
                        },
                    ],
                    required: true,
                },
            },
            required: true,
        },
        response: {
            type: [Object],
            required: true,
        },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }, // Automatically updated when the record is modified
        notes: { type: String }, // Optional notes field
        metadata: { type: Object }, // Optional metadata field
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);

export default mongoose.model<AvailabilityDocument>('Availability', AvailabilitySchema);
