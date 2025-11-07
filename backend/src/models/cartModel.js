import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: String,
  name: String,
  price: Number,
  qty: Number,
});

const cartSchema = new mongoose.Schema({
  userId: { type: String, default: "u1" },
  items: [cartItemSchema],
});

export default mongoose.model("Cart", cartSchema);
