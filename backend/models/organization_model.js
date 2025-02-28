import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    website : {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    logo : {
        type: String,
        required: true
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
},{timestamps: true});

export const Organization = mongoose.model('Organization', organizationSchema);