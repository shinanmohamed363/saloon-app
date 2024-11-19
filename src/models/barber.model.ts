import mongoose, { Document, Schema } from 'mongoose';
import { start } from 'repl';
import { z } from 'zod';

// Zod validation schema 
export const barberZodSchema = z.object({
    availability: z.array(
        z.object({
            start_time: z.string().regex(/^([0-9]{2}):([0-9]{2})$/, "Invalid time format, use HH:mm"),
            end_time: z.string().regex(/^([0-9]{2}):([0-9]{2})$/, "Invalid time format, use HH:mm"),
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

// TypeScript interface for Barber
export interface Barber extends Document {
    barberID: string;
    employeeID: string;
    salonID: mongoose.Schema.Types.ObjectId;
    createdBy: string;
    availability?: {
        date: string;
        entries: {
            start_time: string;
            end_time: string;
            taskName: string[];
            reservedStatus: "booked" | "completed" | "in_progress" | "canceled" | "available";
            appointmentID?: string;
            rating?: number;
            tips?: string[];
        }[];
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
        employeeID: { type: String, ref: 'Staff', required: true },
        salonID: { type: String, ref: 'Salon'},
        createdBy: { type: String, required: true },
        availability: [
            {
                date: { type: String, required: true },
                entries: [
                    {
                        start_time: { type: String, required: true },
                        end_time: { type: String, required: true },
                        taskName: [{ type: String }],
                        reservedStatus: {
                            type: String,
                            enum: ["booked", "completed", "in_progress", "canceled", "available"],
                        },
                        appointmentID: { type: String },
                        rating: { type: Number, min: 0, max: 5 },
                        tips: [{ type: String }],
                    },
                ],
            },
        ],
        rating: { type: Number, default: 0, min: 0, max: 5 },
        name: { type: String, required: true },
        notes: { type: String },
        activeStatus: { type: Boolean, default: true },
        tips: [{ type: String }],
    },
    { timestamps: true }
);

const Barber = mongoose.model<Barber>('Barber', barberSchema);
export default Barber;