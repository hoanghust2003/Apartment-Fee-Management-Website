import mongoose, { Schema, Document } from "mongoose";

export interface IFee  {
    name: string;
    amount: number;
    description?: string;
    feeType?: "Household" | "Individual";
    frequency?: "yearly" | "monthly";
}

const FeeSchema: Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
        },
        feeType: {
            type: String,
            enum: ["Household", "Individual"],
        },
        frequency: {
            type: String,
            enum: ["yearly", "monthly"],
        },
    },
    {
        timestamps: true,
    }
);

const Fee:mongoose.Model<IFee> = mongoose.models.Fee || mongoose.model<IFee>("Fee", FeeSchema);

export default Fee;
