import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, "Please enter the Coupon Code"],
        unique: true,
    },
    amount: {
        type: Number,
        required: [true, "Please enter the Discount Amount"],
    },
});


const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);
export default Coupon;
