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

//"getOrganizations" function is like being a business registry admin:
// 1. A user asks, "What companies have I registered?"
// 2. You identify them using their ID.
// 3. You search your database for all companies linked to that ID.

export const getOrganizations = async (req,res) => {
    try {
        const userId = req.id;
        const organizations = await Organization.find({userId});
        if(!organizations){
            return res.status(404).json({
                message:"No organizations found",
                success:false
            });
        }
        return res.status(200).json({
            organizations,
            success:true
        });
    } catch (error) {
        console.log(error);
    }
}
export const getOrganizationById = async (req, res) => {
    try {
      const organizationId = req.params.id;
      const organization = await Organization.findById(organizationId);
      if (!organization) {
        return res.status(404).json({
          message: "Organization Not Found",
          success: false,
        });
      }
      return res.status(200).json({
          organization,
          success: true,
        });
    } catch (error) {
      console.log(error);
    }
  };
export const updateOrganization = async (req,res) => {
    try {
        const {name,description,website,location} = req.body;
        //cloudinary 
        
        const updateData = {name, description, website, location, logo};
        const organization = await Organization.findByIdAndUpdate(req.params.id,updateData,{new:true});
        if(!organization){
            return res.status(404).json({
                message:"Organization not found",
                success:false
            });
        }
        return res.status(200).json({
            message:"Organization updated successfully",
            organization,
            success:true
        });

    } catch (error) {
        console.log(error);
    }
};