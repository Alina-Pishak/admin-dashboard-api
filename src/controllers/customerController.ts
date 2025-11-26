import { Request, Response } from "express";
import Customer from "../models/Customer";

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.find();

    res.status(200).json({
      message: "Customers fetched successfully",
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customers",
      error,
    });
  }
};
