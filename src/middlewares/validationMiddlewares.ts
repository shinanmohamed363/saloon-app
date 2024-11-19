// src/middlewares/validationMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { ZodSchema, z } from 'zod';

export const validateSchema = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: 'Validation error',
        errors: error.errors.map((e) => ({ field: e.path[0], message: e.message })),
      });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};
