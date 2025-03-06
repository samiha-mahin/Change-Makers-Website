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
export const getAppliedDuties = async (req, res) => {
    try {
      const userId = req.id;//This ID is used to filter applications submitted by the logged-in user.
  
      const application = await Application.find({ applicant: userId }) 
        .sort({ createdAT: -1 })  //Ensures the most recent applications are shown first.
        .populate({
          path: "duty",
          options: { sort: { createdAT: -1 } },
          populate: {
            path: "organization",
            options: { sort: { createdAT: -1 } },
          },
        }); // This fetches all applications made by the user
      if (!application) {
        return res.status(404).json({
          message: "No applications!",
          success: false,
        });
      }
      return res.status(200).json({
        application,
        success: true,
      });
    } catch (error) {
      console.log(error);
    }
  };