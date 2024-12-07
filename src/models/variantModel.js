import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    size: { type: String, required: true }, // For example: "Small", "Medium", "Large"
    color: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    discountPercentage: { type: Number },
    discountPrice: { type: Number },
  },
  { timestamps: true }
);


const Variant = mongoose.models.Variant || mongoose.model("Variant", variantSchema);
export default Variant;



/*
name: {
    type: String,
    required: true,
    trim: true,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    default: 0,
  },
  discountPrice: {
    type: Number,
    default: function () {
      return this.price - (this.price * this.discountPercentage) / 100;
    },
  },
  stock: {
    type: Number,
    required: true,
  },
  dimensions: {
    width: Number,
    height: Number,
    depth: Number,
  },
  weight: {
    type: Number,
    required: false,
  },
  tags: [String],
  images: [
    {
      url: String,
      public_id: String,
    },
  ],
  isCustomize: {
    type: Boolean,
    default: false,
  },
  */