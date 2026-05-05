import { Schema, model, Document } from 'mongoose';

export interface ISupplier extends Document {
  name: string; // Інформація про постачальника
  address: string;
  suppliers: string;
  date: Date;
  amount: string;
  status: string;
}

const SupplierSchema = new Schema<ISupplier>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    suppliers: { type: String, required: true },
    date: { type: Date, required: true },
    amount: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true },
);

export default model<ISupplier>('Supplier', SupplierSchema);
