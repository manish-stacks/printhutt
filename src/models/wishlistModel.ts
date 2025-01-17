import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        addedAt: {
            type: Date,
            default: Date.now
        },
        _id: false
    }]
}, {
    timestamps: true
});

const Wishlist =  mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
