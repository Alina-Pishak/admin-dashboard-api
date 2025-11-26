import { Schema, model, Document } from "mongoose";

export interface IOrder extends Document {
  userName: string;
  userInfo: {
    email: string;
    phone: string;
  };
  address: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
  orderDate: Date;
  price: number;
  status: string;
  action: string;
}

const orderSchema = new Schema<IOrder>({
  userName: { type: String, required: true },
  userInfo: {
    email: { type: String },
    phone: { type: String },
  },
  address: { type: String, required: true },
  products: [
    {
      productId: String,
      quantity: Number,
    },
  ],
  orderDate: { type: Date, default: Date.now },
  price: { type: Number, required: true },
  status: { type: String, default: "pending" },
  action: { type: String, default: "" },
});

export const Order = model<IOrder>("Order", orderSchema);
