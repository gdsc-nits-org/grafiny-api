import { User } from "@prisma/client";

declare global {
  namespace Express {
    export interface User {
      id: string;
      name: string;
      email: string;
      password: string;
      isAdmin?: number;
    }
    export interface Request {
      session?: any;
    }
  }
}
