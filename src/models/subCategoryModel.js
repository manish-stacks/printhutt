import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String },
    metaKeywords: String,
    metaDescription: String,
    image: {
      url: {},
      public_id: {},
      fileType: {},
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    level: { type: Number, default: 0 },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Category =
  mongoose.models.SubCategory ||
  mongoose.model("SubCategory", subCategorySchema);
export default Category;
