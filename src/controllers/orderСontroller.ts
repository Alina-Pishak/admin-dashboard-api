import { Request, Response } from "express";
import { Order } from "../models/Order";

export const getOrders = async (req: Request, res: Response) => {
  try {
    const {
      sortBy,
      order,
      status,
      name,
      minPrice,
      maxPrice,
      action,
      dateFrom,
      dateTo,
    } = req.query;

    const filter: any = {};

    // --- Case-insensitive STATUS ---
    if (status) {
      filter.status = { $regex: new RegExp(`^${status}$`, "i") };
    }

    // --- Case-insensitive ACTION ---
    if (action) {
      filter.action = { $regex: new RegExp(`^${action}$`, "i") };
    }

    // --- Case-insensitive USERNAME ---
    if (name) {
      filter.name = { $regex: new RegExp(name as string, "i") };
    }

    // --- PRICE FILTER ---
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // --- DATE FILTER ---
    if (dateFrom || dateTo) {
      filter.order_date = {};
      if (dateFrom) filter.order_date.$gte = new Date(dateFrom as string);
      if (dateTo) filter.order_date.$lte = new Date(dateTo as string);
    }

    // --- BASE QUERY ---
    let query = Order.find(filter);

    // --- SORTING ---
    if (sortBy) {
      query = query.sort({
        [sortBy as string]: order === "desc" ? -1 : 1,
      });
    }
    console.log(filter)

    const orders = await query.exec();

    return res.status(200).json(orders);
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ message: "Error fetching orders" });
  }
};
