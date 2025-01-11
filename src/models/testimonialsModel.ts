import mongoose, { Document, Schema } from 'mongoose';

interface ITestimonials extends Document {
    feedback: string;
    image: {
        url: string;
        public_id: string;
        fileType: string;
    };
    name: string;
    isActive: boolean;
}

const testimonialsSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    image: {
        url: String,
        public_id: String,
        fileType: String,
    }, isActive: { type: Boolean, default: true },

}, { timestamps: true });

const Testimonials = mongoose.models.Testimonials || mongoose.model<ITestimonials>('Testimonials', testimonialsSchema);

export default Testimonials;
