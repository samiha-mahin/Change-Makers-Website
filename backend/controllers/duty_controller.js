import { Duty } from "../models/duty_model";

export const postDuty = async (req, res) => {
    try {
       const {tittle, description, requirements, workDuration, experience, location, jobType, position, organizationId} = req.body;
       const userId = req.id;
       if(!tittle || !description || !requirements || !workDuration || !experience || !location || !jobType || !position || !organizationId){
        return res.status(400).json({
            message: "Input is missing",
            success: false,
        });
       }
       const duty = await Duty.create({
              tittle,
              description,
              requirements: requirements.split(","),
              workDuration : Number(workDuration),
              experienceLevel : experience,
              location,
              jobType,
              position,
              organization: organizationId,
              created_by: userId
       });
         return res.status(201).json({
              message: "Duty created successfully",
              success: true,
              duty
         });
    } catch (error) {
       return res.status(500).json({
           message: "Internal Server Error",
         });
        }
};