import mongoose, { Document, Schema } from 'mongoose';

export interface ICustomer extends Document {
  name: string;
  email: string;
  // add more fields as needed
}

const customerSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // add more fields as needed
});

export default mongoose.model<ICustomer>('Customer', customerSchema);
