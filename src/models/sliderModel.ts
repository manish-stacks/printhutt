import { ISlider } from '@/lib/types';
import mongoose, { Schema } from 'mongoose';



const SliderSchema: Schema = new Schema({
    title: { type: String, required: true },
    imageUrl: {
        url: { type: String },
        public_id: { type: String },
        fileType: { type: String },
    },
    link: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    level: { type: Number }
}, {
    timestamps: true
});


const Slider = mongoose.models.Slider || mongoose.model<ISlider>('Slider', SliderSchema);

export default Slider;
