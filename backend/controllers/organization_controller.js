import {Organization} from '../models/organization_model.js';

export const registerOrganization = async (req,res) => {
    try {
        const {organizationName} = req.body;
        if(!organizationName){
            return res.status(400).json({
                message:"Organization Name is required",
                success:false
            });
        }
        let organization = await Organization.findOne({name:organizationName});
        if(organization){
            return res.status(400).json({
                message:"Organization already exists",
                success:false
            });
        }
        organization = await Organization.create({
            name: organizationName,
            userId: req.user._id
        })
        return res.status(201).json({
            message:"Organization created successfully",
            organization,
            success:true
        });
    } catch (error) {
        return res.status(500).json({
            message: "Registration for company failed",
        });
    }
};