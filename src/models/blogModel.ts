import { ImageData } from '@/lib/types/category';
import mongoose, { Schema } from 'mongoose';
const imageSchema = new Schema<ImageData>(
  {
    url: { type: String },
    public_id: { type: String },
    fileType: { type: String },
  },
  { _id: false }
);

const blogSchema = new mongoose.Schema({
  title: {
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
  category: {
    type: Schema.Types.ObjectId,
    ref: 'BlogCategory',
    required: true,
  },
  short_description: {
    type: String
  },
  description: {
    type: String
  },
  author: {
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
  status: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });



const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
export default Blog;
