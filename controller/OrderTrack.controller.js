import Order from "../model/order.model.js";
import Product from "../model/product.model.js";

const orderPlace = async (req, res) => {
  try {
    const { items } = req.body;

    // ✅ Step 1: Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items are required" });
    }

    let totalAmount = 0;
    let orderItems = [];

    // ✅ Step 2: Loop + Product validation
    for (let item of items) {
      const { productId, quantity } = item;

      // check fields
      if (!productId || !quantity || quantity <= 0) {
        return res.status(400).json({ message: "Invalid item data" });
      }

      // find product
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // check stock
      if (product.stock < quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`,
        });
      }

      // calculate total
      totalAmount += product.price * quantity;

      // prepare order items
      orderItems.push({
        productId: product._id,
        quantity,
        price: product.price,
      });
    }

    // 👉 Abhi yahin tak (next step me order create + stock update karenge)

    return res.status(200).json({
      message: "Validation successful",
      totalAmount,
      items: orderItems,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default orderPlace;
