import cors from 'cors';
import express, { Request, Response } from 'express';
import { errorHandler } from './middlewares/errorHandler';
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(cors());

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use("/api/users", userRoutes);

app.use(errorHandler);

export default app;

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://<db_username>:<db_password>@e-pharmacy-admin-dashbo.cl8z7v3.mongodb.net/?appName=E-Pharmacy-Admin-Dashboard";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
