import  { Document} from "mongoose";

export interface IWarrantyInformation extends Document {
  warrantyType: "limited" | "full" | "extended" | "others";
  durationMonths: number;
  coverage: string;
  claimProcess: string;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface Warranty {
  _id: string;
  warrantyType: string;
  durationMonths: string;
  coverage: string;
  claimProcess: string;
}