import mongoose from "mongoose";
export type UserType = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber:string;
    documents?:mongoose.Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}