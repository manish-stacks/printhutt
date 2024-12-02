import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      // required: [true, "Please provide username"],
    },
    email: {
      type: String,
      // required: [true, "Please provide email"],
      unique: true,
    },
    password: {
      type: String,
      // required: [true, "Please provide password"],
    },
    number: {
      type: Number,
      // required: true,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    otpVerification: Number,
    otpVerificationExpiry: Date,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   const salt = await bcryptjs.genSalt(10);
//   const hashedPassword = await bcryptjs.hash(this.password.toString(), salt);
//   this.password = hashedPassword;
//   next();
// });

userSchema.methods.comparePassword = async function (usePassword) {
  try {
    return await bcryptjs.compare(usePassword, this.password);
  } catch (error) {
    throw new Error("Password comparison failed", error);
  }
};

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
