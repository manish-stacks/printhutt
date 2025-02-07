import mongoose, { Schema } from "mongoose";
import type { CategoryDocument, ImageData } from "@/lib/types/category";

const imageSchema = new Schema<ImageData>(
  {
    url: { type: String },
    public_id: { type: String },
    fileType: { type: String },
  },
  { _id: false }
);

const categorySchema = new Schema<CategoryDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
    metaTitle: {
      type: String,
      trim: true,
    },
    metaKeywords: {
      type: String,
      trim: true,
    },
    metaDescription: {
      type: String,
      trim: true,
    },
    image: imageSchema,
    level: {
      type: Number,
      default: 0,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Category =
  mongoose.models.Category ||
  mongoose.model<CategoryDocument>("Category", categorySchema);

export default Category;
