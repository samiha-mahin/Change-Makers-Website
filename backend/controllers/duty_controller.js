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

export const getAllDuties = async (req,res) =>{
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or : [
                {tittle:{$regex:keyword, $options: 'i'}},
                {description:{$regex:keyword, $options: "i"}},
                //regex means regular expression ,it will search for keywords and $options: "i" makes the search case-insensitive For example, it treats "developer", "Developer", and "DEVELOPER" as the same.
            ]
        };

        const duties = await Duty.find(query).populate({
            path:"organization"
        }).sort({createdAt: -1});

        if(!duties){
            return res.status(404).json({
                message: "No duties found",
                success: false
            });
        }
        return res.status(200).json({
            duties,
            success: true
        });
            

    } catch (error) {
        console.log(error);
    }
}