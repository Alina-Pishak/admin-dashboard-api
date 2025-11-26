import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  productInfo: string;
  category: string;
  stock: number;
  suppliers: string[];
  price: number;
}

const ProductSchema = new Schema<IProduct>(
  {
    productInfo: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, default: 0 },
    suppliers: { type: [String], default: [] },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export default model<IProduct>("Product", ProductSchema);
