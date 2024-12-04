import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: String,
    description: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: Number,
    discountPercentage: Number,
    discountPrice: Number,
    rating: Number,
    stock: Number,
    tags: [String],
    brand: String,
    sku: String,
    weight: Number,
    availabilityStatus: String,
    minimumOrderQuantity: Number,
    dimensions: {
      width: Number,
      height: Number,
      depth: Number,
    },
    warrantyInformation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WarrantyInformation",
    },
    shippingInformation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShippingInformation",
    },
    returnPolicy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReturnPolicy",
    },
    meta: {
      discription: {
        type: String,
        max: [160, "Meta discription 160"],
      },
      keywords: [String],
    },
    files: [
      {
        url: {},
        public_id: {},
        fileType: {},
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    status: {
      type: Boolean,
      default: false,
    },
    ishome: {
      type: Boolean,
      default: false,
    },
    tranding: {
      type: Boolean,
      default: false,
    },
    hot: {
      type: Boolean,
      default: false,
    },
    sale: {
      type: Boolean,
      default: false,
    },
    new: {
      type: Boolean,
      default: false,
    },
    offers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer",
      },
    ],
    shippingFee: {
      type: Number,
      required: function () {
        return (
          this.shippingInformation && !this.shippingInformation.isFreeShipping
        );
      },
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
