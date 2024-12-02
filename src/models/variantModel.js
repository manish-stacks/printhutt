const variantSchema = new mongoose.Schema(
    {
      size: { type: String, required: true }, // For example: "Small", "Medium", "Large"
      color: { type: String }, // Optional: Color of the variant (e.g., "Red", "Blue")
      price: { type: Number, required: true }, // Price for this specific variant
      stock: { type: Number, required: true }, // Stock quantity for this specific variant
      weight: Number, // Weight for this variant, in case it differs from the main product
      sku: String, // SKU for this variant
      discountPercentage: { type: Number }, // Optional: Discount for this variant
      discountPrice: { type: Number }, // Optional: Discounted price for this variant
      images: [
        {
          url: String, // Image URL for the variant
          public_id: String, // Cloud storage ID for image
        },
      ],
    },
    { timestamps: true }
  );
  