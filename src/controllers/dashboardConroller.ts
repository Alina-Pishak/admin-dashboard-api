import { Request, Response } from 'express';
import Customer from '../models/Customer';
import Product from '../models/Product';
import Supplier from '../models/Supplier';
import { Transaction } from '../models/Transaction';

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const [productCount, supplierCount, customerCount] = await Promise.all([
      Product.countDocuments(),
      Supplier.countDocuments(),
      Customer.countDocuments(),
    ]);

    const lastClients = await Customer.find()
      .sort({ register_date: -1 })
      .limit(5)
      .select('photo name email spent country address phone register_date')
      .lean();

    const transactions = await Transaction.find().limit(10).lean();

    const transactionList = transactions.map((tx) => ({
      name: tx.name,
      email: null,
      amount: tx.amount,
      type: tx.type.toLowerCase() === 'income' ? 'income' : 'expense',
    }));

    res.json({
      summary: {
        products: productCount,
        suppliers: supplierCount,
        clients: customerCount,
      },
      lastClients,
      transactions: transactionList,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
