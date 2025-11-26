import { Request, Response } from "express";
import Product from "../models/Product";


export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    const categories = await Product.distinct("category");

    res.json({
      products,
      categories,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const filterProducts = async (req: Request, res: Response) => {

  try {
    const {
      sortBy,
      order,
      category,
      name,
      minPrice,
      maxPrice,
      supplier,
    } = req.query;

    const filter: any = {};

    // --- Case-insensitive CATEGORY ---
    if (category) {
      filter.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    // --- Case-insensitive PRODUCT NAME (productInfo) ---
    if (name) {
      filter.productInfo = { $regex: new RegExp(name as string, "i") };
    }

    // --- Case-insensitive SUPPLIER ---
    if (supplier) {
      filter.suppliers = {
        $elemMatch: { $regex: new RegExp(supplier as string, "i") },
      };
    }

    // --- PRICE FILTER ---
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // --- BASE QUERY ---
    let query = Product.find(filter);

    // --- SORTING (same as orders) ---
    if (sortBy) {
      query = query.sort({
        [sortBy as string]: order === "desc" ? -1 : 1,
      });
    }

    const products = await query.exec();

    return res.status(200).json(products);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Error fetching products" });
  }
};




export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Invalid product data", error });
  }
};


export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const updated = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Failed to update", error });
  }
};


export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const deleted = await Product.findByIdAndDelete(productId);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted", deleted });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete", error });
  }
};
