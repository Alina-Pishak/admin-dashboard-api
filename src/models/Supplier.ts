import { Schema, model, Document } from "mongoose";

export interface ISupplier extends Document {
  suppliersInfo: string;   // Інформація про постачальника
  address: string;
  company: string;
  deliveryDate: Date;
  amount: number;
  status: string;
}

const SupplierSchema = new Schema<ISupplier>(
  {
    suppliersInfo: { type: String, required: true },
    address: { type: String, required: true },
    company: { type: String, required: true },
    deliveryDate: { type: Date, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<ISupplier>("Supplier", SupplierSchema);
