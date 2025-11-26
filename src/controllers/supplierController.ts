import { Request, Response } from "express";
import Supplier from "../models/Supplier";

// ===============================
// GET /api/suppliers
// Список постачальників
// ===============================
export const getSuppliers = async (req: Request, res: Response) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching suppliers", error });
  }
};

// ===============================
// POST /api/suppliers
// Додавання нового постачальника
// ===============================
export const createSupplier = async (req: Request, res: Response) => {
  try {
    const supplier = new Supplier(req.body);
    const savedSupplier = await supplier.save();

    res.status(201).json(savedSupplier);
  } catch (error) {
    res.status(400).json({ message: "Error creating supplier", error });
  }
};

// ===============================
// PUT /api/suppliers/:supplierId
// Оновлення даних постачальника
// ===============================
export const updateSupplier = async (req: Request, res: Response) => {
  try {
    const { supplierId } = req.params;

    const updatedSupplier = await Supplier.findByIdAndUpdate(
      supplierId,
      req.body,
      { new: true }
    );

    if (!updatedSupplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(400).json({ message: "Error updating supplier", error });
  }
};
