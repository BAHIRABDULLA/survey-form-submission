

import mongoose, { Document } from "mongoose";

export interface IAdmin extends Document {
    email: string,
    password: string
}

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

export const Admin = mongoose.model<IAdmin>('Admin', adminSchema)