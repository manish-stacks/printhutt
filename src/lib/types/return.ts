export interface IReturnPolicy extends Document {
    returnPeriod?: string;
    restockingFee?: number;
    policyDetails?: string;
    createdAt: Date;
    updatedAt: Date;
}
