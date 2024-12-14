import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  size: { type: String, required: true },
  color: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  // discountPercentage: { type: Number },
  // discountPrice: { type: Number },
});

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
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: Number,
    discountType: Number,
    discountPrice: Number,
    rating: Number,
    stock: Number,
    tags: [String],
    brand: {
      type: String,
      default: "PrintHutt",
    },
    sku: String,
    weight: Number,
    isVarientStatus: Boolean,
    varient: [variantSchema],
    availabilityStatus: String,
    minimumOrderQuantity: Number,
    dimensions: String,
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
    thumbnail: {
      url: String,
      public_id: String,
      fileType: String,
    },
    images: [
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
    isCustomize: {
      type: Boolean,
      default: false,
    },
    demoVideo: {
      type: String,
    },
    imgAlt: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
