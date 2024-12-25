import  { Document} from "mongoose";

export interface IWarrantyInformation extends Document {
  warrantyType: "limited" | "full" | "extended" | "others";
  durationMonths: number;
  coverage: string;
  claimProcess: string;
  createdAt?: Date;
  updatedAt?: Date;
}