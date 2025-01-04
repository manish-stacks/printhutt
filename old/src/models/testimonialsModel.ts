import mongoose, { Document, Schema } from 'mongoose';

interface ITestimonials extends Document {
    feedback: string;
    image: {
        url: string;
        public_id: string;
        fileType: string;
    };
    name: string;
}

const testimonialsSchema: Schema = new mongoose.Schema({
    feedback: {
        type: String,
        required: true
    },
    image: {
        url: String,
        public_id: String,
        fileType: String,
    },
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Testimonials = mongoose.models.Testimonials || mongoose.model<ITestimonials>('Testimonials', testimonialsSchema);

export default Testimonials;
