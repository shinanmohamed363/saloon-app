import mongoose, { Document, Schema } from 'mongoose';
import { z } from 'zod';

export const staffZodSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    role: z.string().optional(),
    workLocation: z.string().optional(),
    salary: z.number().positive({ message: "Salary must be a positive number" }),
    phone: z.string().regex(/^[0-9]{10}$/, { message: "Phone number must be 10 digits" }),
    email: z.string().email({ message: "Invalid email format" }),
    availability: z.number().int().min(0).max(100).optional().default(100),
    experience: z.number().int().min(0, { message: "Experience cannot be negative" }),
    specialization: z.string().optional(),
    hireDate: z.preprocess((arg) => {
      if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
    }, z.date().refine((date) => !isNaN(date.getTime()), { message: "Invalid date" })),
    performanceRating: z.number().min(0).max(5).optional(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' })
      .regex(/[\W_]/, { message: 'Password must contain at least one special character' }),
  });

export interface Staff extends Document {
  employeeID: string;
  created_by:string;
  name: string;
  role: string;
  workLocation: string;
  salary: number;
  phone: string;
  email: string;
  availability: number;
  experience: number;
  specialization: string;
  hireDate: Date;
  performanceRating: number;
}

const staffSchema: Schema = new Schema(
  {
    employeeID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    created_by: { type: String, required: true },
    role: { type: String },
    workLocation: { type: String },
    salary: { type: Number },
    phone: { type: String },
    email: { type: String },
    availability: { type: Number },
    experience: { type: Number },
    specialization: { type: String },
    hireDate: { type: Date },
    performanceRating: { type: Number },
  },
  { timestamps: true }
);

const Staff = mongoose.model<Staff>('Staff', staffSchema);
export default Staff;
