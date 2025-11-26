import cors from 'cors';
import express, { Request, Response } from 'express';
import { errorHandler } from './middlewares/errorHandler';

import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes";
import productRoutes from "./routes/productRoutes";
import suppliersRoutes from "./routes/supplierRoutes";
import customerRoutes from "./routes/customerRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";

const app = express();
app.use(cors());

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use("/api/users", userRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/products", productRoutes);

app.use("/api/suppliers", suppliersRoutes);

app.use("/api/customers", customerRoutes);

app.use('/api/dashboard', dashboardRoutes);

app.use(errorHandler);

export default app;
