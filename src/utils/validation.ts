import { z } from 'zod';

export const USER_SCHEMA = z.object({
  firstName: z
    .string()
    .min(2,  'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name contains invalid characters'),

  lastName: z
    .string()
    .min(2,  'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name contains invalid characters'),

  phone: z
    .string()
    .min(7,  'Phone number must be at least 7 digits')
    .max(20, 'Phone number must not exceed 20 characters')
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}([-\s.][0-9]{1,9})*$/,
      'Please enter a valid phone number'
    ),

  email: z
    .string()
    .email('Please enter a valid email address')
    .max(100, 'Email must not exceed 100 characters'),

  // ─── Add new fields here when extending the schema ───────────────
  // dateOfBirth: z.string().optional(),
  // address:     z.string().max(200, 'Address too long').optional(),
});