// src/models/customer.model.ts
import mongoose, { Document, Schema } from 'mongoose';
import { z } from 'zod';

// Zod schema for validating request data
export const customerZodSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email format' }),
  // Add more fields as necessary
});

// Mongoose schema for defining the MongoDB collection structure
export interface ICustomer extends Document {
  name: string;
  email: string;
  // Add more fields if necessary
}

const customerSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // Add more fields if necessary
});

const Customer = mongoose.model<ICustomer>('Customer', customerSchema);

export default Customer;
