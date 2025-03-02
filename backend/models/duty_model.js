import mongoose from 'mongoose';

const dutySchema = new mongoose.Schema({
    tittle: {
        type: String,
        required: true
      },
    description: {
        type: String,
        required: true
      },
    requirements : [{ type: String }],
    workDuration : {
        type: Number,
        required: true
    },
    experienceLevel :{
        type: Number,
        required: true
      },
    location: {
        type: String,
        required: true
      },
    jobType: {
        type: String,
        required: true
      },
    position: {
        type: Number,
        required: true
      },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Organization',
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    applications: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Application',
        }
   ]
},{timestamps: true});

export const Duty = mongoose.model('Duty', dutySchema);