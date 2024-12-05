import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String },
    metaKeywords:String,
    metaDescription:String,
    image: {
      url: {},
      public_id: {},
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    level: { type: Number, default: 0 }, // 0 for main category, 1+ for subcategories
  },
  { timestamps: true }
);


const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category