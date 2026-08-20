import Product from "../model/product.model.js";

const createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    if (!name || !price || !stock) {
      return res.status(400).json({ message: "Missing fileds are required" });
    }
    await Product.create({
      name,
      price,
      stock,
    });
    return res.status(201).json({ message: "Product create Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const Products = await Product.find();
    return res.status(200).json({ message: Products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export { createProduct, getAllProduct };
