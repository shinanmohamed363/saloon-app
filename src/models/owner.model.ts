import mongoose, { Document, Schema } from 'mongoose';
import { z } from 'zod';

export const ownerZodSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  totalRevenue: z.number().nonnegative().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  note: z.string().optional(),
  email: z.string().email({ message: 'Invalid email format' }),
  password: z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number' })
  .regex(/[\W_]/, { message: 'Password must contain at least one special character' }),

});

export interface Owner extends Document {
  ownerID: string;
  name: string;
  totalRevenue: number;
  phone: string;
  address: string;
  note: string;
  email: string;
}

const ownerSchema: Schema = new Schema(
  {
    ownerID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    totalRevenue: { type: Number, default: 0 },
    phone: { type: String },
    address: { type: String },
    note: { type: String },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

const Owner = mongoose.model<Owner>('Owner', ownerSchema);
export default Owner;
