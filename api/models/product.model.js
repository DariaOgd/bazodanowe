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
    category:{
        type:String,
        required : true,

    },
    price: {
      type: Number,
      required: true,
      validate: {
        validator: function(value) {
          return value > 0;
        },
        message: "Cena musi być liczbą dodatnią.",
      },
    },
    
    images: {
      type: [String],
      required: false,
    },
    state:{
      type: String,
      required: true,
      enum: ["nowy", "używany", "uszkodzony"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  {
    timestamps: false, // Wyłączamy domyślne znaczniki czasowe
  }
);

export default mongoose.model("Product", ProductSchema);
