// src/types/express.d.ts
import { UserPayload } from '../middlewares/verifyuser';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
