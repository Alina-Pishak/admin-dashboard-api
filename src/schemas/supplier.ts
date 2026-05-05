import { z } from 'zod';

export const supplierSchema = z.object({
  name: z
    .string('Suppliers Info is required')
    .min(2, 'Suppliers Info must be at least 2 characters'),

  address: z
    .string('Address is required')
    .min(3, 'Address must be at least 3 characters'),

  suppliers: z
    .string('Company is required')
    .min(2, 'Company must be at least 2 characters'),

  date: z.string('Delivery date is required').datetime('Invalid date format'),

  amount: z
    .string('Amount is required')
    .min(1, 'Amount is required'),

  status: z
    .string('Status is required')
    .min(2, 'Status must be at least 2 characters'),
});

// Типи для TS
export type SupplierData = z.infer<typeof supplierSchema>;
