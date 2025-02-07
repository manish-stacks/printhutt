import mongoose, { Document, Model, Schema } from "mongoose";

interface IImage {
  url?: string;
  public_id?: string;
  fileType?: string;
}

interface ISubCategory extends Document {
  name: string;
  slug: string;
  description?: string;
  metaKeywords?: string;
  metaTitle?: string;
  metaDescription?: string;
  image?: IImage;
  parentCategory?: mongoose.Types.ObjectId;
  level: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const subCategorySchema = new Schema<ISubCategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String },
    metaKeywords: { type: String },
    metaTitle: { type: String },
    metaDescription: { type: String },
    image: {
      url: { type: String },
      public_id: { type: String },
      fileType: { type: String },
    },
    parentCategory: {
      type: Schema.Types.ObjectId,
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

const SubCategory: Model<ISubCategory> =
  mongoose.models.SubCategory ||
  mongoose.model<ISubCategory>("SubCategory", subCategorySchema);

export default SubCategory;
