import cors from 'cors';
import express, { Request, Response } from 'express';
import { errorHandler } from './middlewares/errorHandler';
import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes";
import productRoutes from "./routes/productRoutes";

const app = express();
app.use(cors());

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use("/api/users", userRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/products", productRoutes);


app.use(errorHandler);

export default app;
