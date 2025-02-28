import {User} from '../models/user_model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req,res) => {
    try {
        const {fullname, email, phoneNumber, password, role} = req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
            message: "All fields are required",
            success: false,
            });
        }

        //cloudinary upload

        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({
              message: "User already exists with this email",
              success: false,
            });
          }
          
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            // profile:{
            //   profilePhoto: cloudResponse.secure_url ,
            // }
          });

        return res.status(201).json({
            message: "Account created successfully",
            success: true,
          });
    } catch (error) {
        return res.status(500).json({
            message: "Registration failed",
          });
    }
}