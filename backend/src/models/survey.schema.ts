import mongoose, { Schema, Document } from "mongoose";

export interface ISurvey extends Document {
    name: string;
    email: string;
    gender: 'male' | 'female' | 'other';
    nationality: string;
    phoneNumber: number;
    address: string
    message: string;
    // rating: number;
    submittedAt: Date;
}

const SurveySchema: Schema = new Schema<ISurvey>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    gender: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        enum:['male','female','other']
    },
    nationality: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },

    message: {
        type: String,
        required: true,
        trim: true,
    },
    // rating: {
    //     type: Number,
    //     required: true,
    //     min: 1,
    //     max: 5,
    // },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
});

const Survey = mongoose.model<ISurvey>("Survey", SurveySchema);
export default Survey;
