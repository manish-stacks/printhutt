import mongoose, { Document, Model, Schema } from "mongoose";
import bcryptjs from "bcryptjs";

interface IUser extends Document {
  displayName: string;
  username: string;
  email: string;
  password: string;
  number?: number;
  isVerified: boolean;
  role: "user" | "admin";
  otpVerification?: number;
  otpVerificationExpiry?: Date;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserMethods {
  comparePassword(usePassword: string): Promise<boolean>;
}

type UserModel = Model<IUser, Record<string, never>, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    username: {
      type: String,
      default: "user",
    },
    displayName: {
      type: String,
    },
    email: {
      type: String,
      unique: true, 
    },
    password: {
      type: String,
    },
    number: {
      type: Number,
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

userSchema.methods.comparePassword = async function (usePassword: string): Promise<boolean> {
  try {
    return await bcryptjs.compare(usePassword, this.password);
  } catch {
    throw new Error("Password comparison failed");
  }
};

const User: UserModel = mongoose.models.User as UserModel || mongoose.model<IUser, UserModel>("User", userSchema);

export default User;

