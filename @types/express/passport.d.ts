import { User, AUTH_LEVEL } from "@prisma/client";

declare global {
  namespace Express {
    export interface User {
      id: string;
      name: string;
      email: string;
      password: string;
      authorisationLevel: AUTH_LEVEL;
    }
    export interface Request {
      session?: any;
    }
  }
}
