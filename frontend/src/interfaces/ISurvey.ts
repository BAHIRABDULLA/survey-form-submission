
export interface ISurvey {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    nationality: string;
    gender: 'male' | 'female' | 'other';
    address: string;
    message: string;
    submittedAt: Date;
}