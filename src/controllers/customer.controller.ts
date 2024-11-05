import { Request, Response } from 'express';
import Customer, { ICustomer } from '../models/customer.model';

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const customer: ICustomer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred.' });
    }
  }
};

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers: ICustomer[] = await Customer.find();
    res.json(customers);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred.' });
    }
  }
};

// add more controller functions as needed
