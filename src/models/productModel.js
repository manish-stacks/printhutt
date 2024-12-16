import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  size: { type: String, required: true },
  color: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      min: [0, "Price cannot be negative"],
    },
    discountType: {
      type: String,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: [true, "Please add stock quantity"],
      min: [0, "Stock cannot be negative"],
    },
    tags: [String],
    brand: {
      type: String,
      default: "PrintHutt",
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    weight: Number,
    dimensions: String,
    isVarientStatus: Boolean,
    varient: [variantSchema],
    availabilityStatus: {
      type: String,
      enum: ["in_stock", "low_stock", "out_of_stock"],
      default: "in_stock",
    },
    minimumOrderQuantity: {
      type: Number,
      default: 1,
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
      keywords: [String],
      meta_description: {
        type: String,
        max: [160, "Meta discription 160"],
      },
    },
    thumbnail: {
      url: String,
      public_id: String,
      fileType: String,
    },
    images: [
      {
        url: String,
        public_id: String,
        fileType: String,
        _id:false
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
