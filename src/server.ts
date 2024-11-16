import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import customerRoutes from './routes/customer.routes';
import userRoutes from './routes/user.routes';
import ownerRoutes from './routes/owner.routes';
import staffRoutes from './routes/staff.routes';
import salonRoutes from './routes/salon.routes';
import barberRoutes from './routes/barber.routes';
import scheduleRoutes from './routes/schedule.routes';
dotenv.config();

const app = express();  
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
if (process.env.MONGODB_URL) {
  mongoose.connect(process.env.MONGODB_URL);

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
} else {
  console.error('MONGODB_URL is not defined in the environment variables.');
  process.exit(1);
}
// Middleware
app.use(express.json());

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/owner',ownerRoutes);
app.use('/api/staff',staffRoutes);
app.use('/api/salon',salonRoutes);
app.use('/api/barber',barberRoutes);
app.use('/api/schedule',scheduleRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
