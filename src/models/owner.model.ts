import mongoose, { Document, Schema } from 'mongoose';
import {z} from 'zod';



export const ownerZodSchma=z.object({
    name: z.string().min(1, { message: 'Name is required' }),
})
export interface Owner extends Document {
    ownerID: string;
    name: string;
    totalRevenue: number;
    phone: string;
    email: string;
    
  }
  
  const ownerSchema: Schema = new Schema({
    ownerID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    totalRevenue: { type: Number },
    phone: { type: String },
    email: { type: String, required: true },
    
  });
  const Owner = mongoose.model<Owner>('Customer', ownerSchema);

  export default Owner;