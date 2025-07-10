import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) =>{
  const {fullName, email, password} = req.body;
  try {
    //checking all fields
    if(!fullName || !email || !password){
      return res.status(400).json({success: false, message: "All fields are required"});
    }
    //checking password length >= 6
    if(password.length < 6){
      return res.status(400).json({success:false, message: "Password must be at least 6 characters"});
    }
    //checking if email already exists
    const user = await User.findOne({email});
    if(user){
      return res.status(400).json({success: false, message: "Email already exists"});
    }
    //hashing password
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    if(!newUser){
      return res.status(400).json({success: false, message: "Invalid user data"});
    }
    //generate jwt and save user
    generateToken(newUser._id, res);
    await newUser.save();
    const { password: _, __v, ...safeUser } = newUser.toObject();
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user:safeUser,
    });
  } catch (error) {
    console.log("Error in signup controller: ", error);
    return res.status(500).json({success: false, message: "Internal server error"});
  }
}

export const login = async (req, res) =>{
  const {email, password} = req.body;
  try {
    if(!email || !password){
      return res.status(400).json({success: false, message: "All fields are required"});
    }

    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({success: false, message: "Invalid credentials"});
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch){
      return res.status(400).json({success: false, message: "Invalid credentials"});
    }

    generateToken(user._id, res);
    const { password: _, __v, ...safeUser } = user.toObject();
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user:safeUser,
    });

  } catch (error) {
    console.log("Error in login controller: ", error);
    return res.status(500).json({success: false, message: "Internal server error"});
  }
}

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge:0});
    return res.status(200).json({success:true, message:"Logged out successfully"});
  } catch (error) {
    console.log("Error in logout controller: ", error);
    return res.status(500).json({success: false, message: "Internal server error"});
  }
}

export const updateProfile = async (req, res) => {
  try {
    const {profilePic} = req.body;
    if(!profilePic){
      return res.status(400).json({success: false, message:"No profile picture provided"});
    }
    const userId = req.user._id;
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const newUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true});
    return res.status(200).json({success: true, message: "Profile picture updated successfully", user:newUser});
  } catch (error) {
    console.log("Error in updateProfile controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const checkAuth = (req, res) => {
  try {
    return res.status(200).json({success: true, message:"Authorized", user:req.user});
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};