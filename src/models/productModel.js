import mongoose from "mongoose";

const dimensionsSchema = new mongoose.Schema(
  {
    width: Number,
    height: Number,
    depth: Number,
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true, 
      trim: true 
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
    dimensions: dimensionsSchema,
    warrantyInformation: String,
    shippingInformation: String,
    availabilityStatus: String,
    returnPolicy: String,
    minimumOrderQuantity: Number,
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
        ref: "Review" 
      }
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
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);

//  size: accoding price|(stock)
// verient status

// offer->category and product accoding
//  warrantyInformation relation create new schema
//  shippingInformation->relation create new schema
// returnPolicy ->relation create new schema

// shipping  -> true abd shipping fee



/*

const productSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true, 
      trim: true 
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
    dimensions: dimensionsSchema,
    warrantyInformation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WarrantyInformation", // Reference to WarrantyInformation schema
    },
    shippingInformation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShippingInformation", // Reference to ShippingInformation schema
    },
    returnPolicy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReturnPolicy", // Reference to ReturnPolicy schema
    },
    availabilityStatus: String,
    minimumOrderQuantity: Number,
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
        ref: "Review" 
      }
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer", // Reference to Offer schema
      }
    ],
    shippingFee: { 
      type: Number, 
      required: function() {
        return this.shippingInformation && !this.shippingInformation.isFreeShipping;
      }
    }, // Optional field for shipping fee if the product has one
  },
  { timestamps: true }
);








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
    price: { type: Number }, // Default price (if not using variants)
    variants: [variantSchema], // Array of variants for the product
    tags: [String],
    brand: String,
    sku: String,
    weight: Number,
    dimensions: dimensionsSchema,
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
    availabilityStatus: String,
    minimumOrderQuantity: Number,
    meta: {
      discription: {
        type: String,
        max: [160, "Meta description should be 160 characters max"],
      },
      keywords: [String],
    },
    files: [
      {
        url: String,
        public_id: String,
        fileType: String,
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
    shippingFee: { 
      type: Number, 
      required: function () {
        return this.shippingInformation && !this.shippingInformation.isFreeShipping;
      },
    }, 
  },
  { timestamps: true }
);





const exampleProduct = {
  title: "T-Shirt",
  category: "60c72b2f5f3c2b001c5b5a38", // category ID
  price: 20, // Default price (if no variants)
  variants: [
    {
      size: "Small",
      price: 18,
      stock: 50,
      color: "Red",
      weight: 0.2,
      sku: "TSHIRT-S-RED",
      discountPercentage: 10,
      discountPrice: 16.2,
      images: [
        { url: "image1_url", public_id: "image1_id" },
      ],
    },
    {
      size: "Medium",
      price: 20,
      stock: 30,
      color: "Red",
      weight: 0.25,
      sku: "TSHIRT-M-RED",
      discountPercentage: 0,
      discountPrice: 20,
      images: [
        { url: "image2_url", public_id: "image2_id" },
      ],
    },
    {
      size: "Large",
      price: 22,
      stock: 40,
      color: "Red",
      weight: 0.3,
      sku: "TSHIRT-L-RED",
      discountPercentage: 5,
      discountPrice: 20.9,
      images: [
        { url: "image3_url", public_id: "image3_id" },
      ],
    },
  ],
};

*/