import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

    return res.status(200).json({success:true, message: "Users exported successfully", users: filteredUsers});
  } catch (error) {
    console.log("Error in getUsers controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getMessages = async (req, res) => {
  try {
    const {id: receiverId} = req.params;
    const senderId = req.user._id;

    const messages = await Message.find({
      $or:[
        {senderId: senderId, receiverId: receiverId},
        {senderId: receiverId, receiverId: senderId},
      ]
    });
    
    return res.status(200).json({success:true, message: "Messages exported successfully", messages});
  } catch (error) {
    console.log("Error in getMessages controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(200).json({success:true, message:"Message sent successfully", data:newMessage});
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};