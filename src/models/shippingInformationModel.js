const shippingInformationSchema = new mongoose.Schema(
    {
      shippingMethod: String, // e.g., "Standard Shipping"
      shippingFee: Number, // fee amount
      shippingTime: String, // e.g., "3-5 business days"
      isFreeShipping: { type: Boolean, default: false }, // if shipping is free
    },
    { timestamps: true }
  );
  