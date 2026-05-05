import { Schema, model, Document } from "mongoose";

export interface IOrder extends Document {
  photo: string;
  name: string;
  address: string;
  products: string;
  price: number;
  status: string;
  order_date: Date;
}

const orderSchema = new Schema<IOrder>({
  photo: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  products: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, required: true },
  order_date: { type: Date, required: true },
});

export const Order = model<IOrder>("Order", orderSchema);
