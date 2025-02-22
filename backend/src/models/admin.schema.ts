

import mongoose from "mongoose";

export interface IAdmin {
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

export const Admin = mongoose.model('Admin', adminSchema)