import mongoose, { Schema, Document } from 'mongoose';

export interface BlogCategory extends Document {
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const BlogCategorySchema: Schema = new Schema({
    name: { type: String, required: true },
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true
});


const BlogCategory = mongoose.models.BlogCategory || mongoose.model<BlogCategory>('BlogCategory', BlogCategorySchema);

export default BlogCategory;


