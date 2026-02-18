import { z } from 'zod';
import  { USER_SCHEMA } from '../utils/validation';

// Infer the TypeScript type from Zod schema (single source of truth)
export type User    = z.infer<typeof USER_SCHEMA> & { id: string };
export type UserDTO = z.infer<typeof USER_SCHEMA>;

export interface ApiResponse<T> {
  data:    T;
  status:  number;
  message: string;
}