import mongoose, { Schema, Document } from 'mongoose';

export interface BlogCategory extends Document {
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

const BlogCategorySchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
}, {
    timestamps: true
});


const BlogCategory = mongoose.models.BlogCategory || mongoose.model<BlogCategory>('BlogCategory', BlogCategorySchema);

export default BlogCategory;


