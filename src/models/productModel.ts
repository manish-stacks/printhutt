import mongoose, { Model, Schema } from "mongoose";
import { IProduct, IVariant } from "@/lib/types/product";

const variantSchema = new Schema<IVariant>({
  size: { type: String, required: true },
  color: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

const productSchema = new Schema<IProduct>(
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
    short_description: {
      type: String,
      required: [true, "Please add a description"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: Schema.Types.ObjectId,
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
    colors: String,
    inBox: String,
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
      type: Schema.Types.ObjectId,
      ref: "WarrantyInformation",
    },
    shippingInformation: {
      type: Schema.Types.ObjectId,
      ref: "ShippingInformation",
    },
    returnPolicy: {
      type: Schema.Types.ObjectId,
      ref: "ReturnPolicy",
    },
    meta: {
      keywords: String,
      meta_description: {
        type: String,
        maxlength: [160, "Meta description cannot be more than 160 characters"],
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
        _id: false,
      },
    ],
    reviews: [
      {
        type: Schema.Types.ObjectId,
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
    trending: {
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
        type: Schema.Types.ObjectId,
        ref: "Offer",
      },
    ],
    shippingFee: {
      type: Number,
      required: function (this: IProduct) {
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

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product;

