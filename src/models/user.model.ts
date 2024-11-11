
import mongoose, { Document, Schema } from 'mongoose';
import { string, z } from 'zod';


export const userZodSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }) 
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' }) 
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[\W_]/, { message: 'Password must contain at least one special character' }) 
});


// Mongoose schema for defining the MongoDB collection structure
export interface Iuser extends Document {
  name: string;
  email: string;
  password:string;
  role:string;
  
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password:{type:String, required:true},
  role:{type:String,required:true,default:'Customer'}
 
});

const user = mongoose.model<Iuser>('user', userSchema);

export default user;
