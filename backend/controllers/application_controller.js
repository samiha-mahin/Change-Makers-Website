import {Application} from '../models/application_model.js';
import { Duty } from '../models/duty_model.js';

export const applyDuty = async (req,res) => {
    try {
        const userId = req.id;
    const dutyId = req.params.id;
    if(!dutyId){
        return res.status(400).json({
            message: "Duty ID is required",
            success: false
        })
    }
     //check if user already applied for the duty
    const existingApplication = await Application.findOne({
        duty: dutyId,
        applicant: userId
    });
    if(existingApplication){
        return res.status(400).json({
            message: "You have already applied for this duty",
            success: false
        })
    }
    //check if duty exists
    const duty = await Duty.findById(dutyId);
    if(!duty){
        return res.status(404).json({
            message: "Duty not found",
            success: false
        })
    }
    //create new application
    const newApplication = new Application({
        duty: dutyId,
        applicant: userId
    });
    Duty.applications.push(newApplication._id);
    await duty.save();
    return res.status(201).json({
        message: "Application submitted successfully",
        success: true
    })
    } catch (error) {
        console.log(error);
    }
};
