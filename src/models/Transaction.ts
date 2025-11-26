import { Schema, model, Document, Types } from 'mongoose';

export interface ITransaction extends Document {
  name: string;
  user?: Types.ObjectId; // якщо клієнт
  amount: number;
  type: 'income' | 'expense';
  createdAt: Date;
}

const TransactionSchema = new Schema<ITransaction>({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Transaction = model<ITransaction>('Transaction', TransactionSchema);