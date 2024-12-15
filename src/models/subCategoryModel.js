import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String },
    metaKeywords: { type: String },
    metaDescription: { type: String },
    image: {
      url: { type: String },
      public_id: { type: String },
      fileType: { type: String },
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

const SubCategory =
  mongoose.models.SubCategory || mongoose.model("SubCategory", subCategorySchema);

export default SubCategory;
