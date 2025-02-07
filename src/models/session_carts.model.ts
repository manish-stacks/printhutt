import mongoose, { Model, Schema } from "mongoose";
import { ISessionCarts } from "@/lib/types/session_carts";

const sessionCartsSchema: Schema<ISessionCarts> = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    session: { type: String, required: false },
  },
  { timestamps: true }
);


const SessionCart: Model<ISessionCarts> =
  mongoose.models.SessionCart || mongoose.model<ISessionCarts>("SessionCart", sessionCartsSchema);

export default SessionCart;
