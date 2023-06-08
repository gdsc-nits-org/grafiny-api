import { User, LEVEL } from "@prisma/client";

declare global {
  namespace Express {
    export interface User {
      id: string;
      name: string;
      email: string;
      password: string;
      authorisationLevel: LEVEL;
    }
    export interface Request {
      session?: any;
    }
  }
}
