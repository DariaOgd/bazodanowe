import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value > 0;
        },
        message: "Cena musi być liczbą dodatnią.",
      },
    },
    images: {
      type: [String], // Store URLs of uploaded images
      required: false,
    },
    state: {
      type: String,
      required: true,
      enum: ["new", "used", "broken"],
    },
    bought: {
      type: Boolean,
      default: false, // Default to false, indicating the product has not been bought yet
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false, // Wyłączamy domyślne znaczniki czasowe
  }
);

export default mongoose.model("Product", ProductSchema);
