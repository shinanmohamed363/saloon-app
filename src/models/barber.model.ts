import mongoose, { Document, Schema } from 'mongoose';
import { z } from 'zod';

// Zod validation schema 
export const barberZodSchema = z.object({
    availability: z.array(
        z.object({
            time: z.string().regex(/^([0-9]{2}):([0-9]{2})$/, "Invalid time format, use HH:mm"),
            date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, use YYYY-MM-DD"),
            taskName: z.array(z.string()).nonempty("Task name is required"),
            reservedStatus: z.enum(["booked", "completed", "in_progress", "canceled"]),
            appointmentID: z.string().optional(),
            rating: z.number().min(0, "Rating cannot be less than 0").max(5, "Rating cannot exceed 5").optional(),
            tips: z.array(z.string()).optional(),
        })
    ).optional(),
    rating: z.number().min(0, "Rating cannot be less than 0").max(5, "Rating cannot exceed 5").optional(),
    name: z.string().min(1, "Name is required").max(255, "Name is too long"),
    notes: z.string().optional(),
    activeStatus: z.boolean().optional(),
    tips: z.array(z.string()).optional(),
});

// TypeScript interface for Barber based on Mongoose Document
export interface Barber extends Document {
    barberID: string;
    employeeID: string;
    salonID: string;
    createdBy: string;
    availability: {
        time: string;
        date: string;
        taskName: string[];
        reservedStatus: string;
        appointmentID?: string;
        rating?: number;
        tips?: string[];
    }[];
    rating: number;
    name: string;
    notes?: string;
    activeStatus: boolean;
    tips: string[];
}

// Mongoose schema definition for Barber
const barberSchema: Schema = new Schema(
    {
        barberID: { type: String, required: true, unique: true },
        employeeID: { type: String, ref: 'Staff' },
        salonID: { type: String, ref: 'Salon' },
        createdBy: { type: String, required: true },  // New field for tracking who created the barber entry
        availability: [
            {
                time: { type: String,  },
                date: { type: String,  },
                taskName: [{ type: String,  }],
                reservedStatus: { type: String, enum: ["booked", "completed", "in_progress", "canceled"]},
                appointmentID: { type: String },
                rating: { type: Number },
                tips: [{ type: String }],
            }
        ],
        rating: { type: Number },
        name: { type: String, },
        notes: { type: String },
        activeStatus: { type: Boolean},
        tips: [{ type: String }],
    },
    { timestamps: true }
);

// Mongoose model for Barber
const Barber = mongoose.model<Barber>('Barber', barberSchema);

export default Barber;
