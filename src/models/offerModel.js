const offerSchema = new mongoose.Schema(
    {
      offerTitle: String, // e.g., "Buy 1 Get 1 Free"
      offerDescription: String, // details of the offer
      applicableTo: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
        },
      ], // could link to categories or individual products
      discountPercentage: Number, // optional discount percentage
    },
    { timestamps: true }
  );
  