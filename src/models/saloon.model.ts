        import mongoose, { Document, Schema } from 'mongoose';
        import { z } from 'zod';

        // Zod validation schema
        export const salonZodSchema = z.object({
        
        name: z.string().min(1, "Salon name is required").max(255, "Salon name is too long"),
        
        gallery: z.array(z.string().url("Each gallery image must be a valid URL")).optional(),
        rating: z.number().min(0, "Rating cannot be less than 0").max(5, "Rating cannot exceed 5").optional(),
        totalRevenue: z.number().min(0, "Total revenue must be a positive number").optional(),
        servicesOffered: z.array(z.string().min(1)).optional(),
        address: z.string().min(1, "Address is required").max(500, "Address is too long").optional(),
        
        // Opening hours validation for Monday to Friday required, Saturday and Sunday optional
        openingHours: z.array(
            z.object({
            day: z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]),
            from: z.string().regex(/^([0-9]{2}):([0-9]{2})$/, "Invalid time format, use HH:mm"),  // validate time format
            to: z.string().regex(/^([0-9]{2}):([0-9]{2})$/, "Invalid time format, use HH:mm")    // validate time format
            })
        )
        .refine(
            (openingHours) => {
            const weekdays = openingHours.filter(hour => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(hour.day));
            return weekdays.length === 5;  // Ensure Monday to Friday are always included
            },
            { message: "You must provide opening hours for all weekdays (Monday to Friday)." }
        )
        .optional(),  // Entire array is optional, but weekday check is enforced
        location: z.string().min(1, "Location is required").max(255, "Location is too long").optional(),
        photo: z.string().url("Photo URL must be a valid URL").optional(),
        category: z.string().min(1, "Category is required").max(255, "Category is too long").optional(),
        isOpen: z.boolean().optional(),
        });

        // TypeScript interface for Salon based on Mongoose Document
        export interface Salon extends Document {
        salonID: string;
        name: string;
        created_by: string;
        gallery: string[];
        rating: number;
        totalRevenue: number;
        servicesOffered: string[];
        address: string;
        openingHours: { day: string, from: string, to: string }[];  // Updated structure
        location: string;
        photo: string;
        category: string;
        isOpen: boolean;
        }

        // Mongoose schema definition for Salon
        const salonSchema: Schema = new Schema(
        {
            salonID: { type: String, required: true, unique: true },
            name: { type: String, required: true },
            created_by: { type: String, required: true },
            gallery: [{ type: String }],
            rating: { type: Number },
            totalRevenue: { type: Number },
            servicesOffered: [{ type: String }],
            address: { type: String },
            openingHours: [
            {
                day: { type: String, required: true },
                from: { type: String, required: true },
                to: { type: String, required: true },
            }
            ],
            location: { type: String },
            photo: { type: String },
            category: { type: String },
            isOpen: { type: Boolean },
        },
        { timestamps: true }
        );

        // Mongoose model for Salon
        const Salon = mongoose.model<Salon>('Salon', salonSchema);

        export default Salon;
