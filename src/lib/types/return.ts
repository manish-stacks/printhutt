export interface IReturnPolicy extends Document {
    returnPeriod?: string;
    restockingFee?: number;
    policyDetails?: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface ReturnPolicy {
    _id: string;
    returnPeriod: string;
    restockingFee: string;
    policyDetails: string;
    createdAt?: string;
    updatedAt?: string;
}