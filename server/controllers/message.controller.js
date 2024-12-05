import Message from "../models/message.model.js";
import Room from "../models/room.model.js";
import User from "../models/user.model.js"; 
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id; 
    const roomId = req.params.roomId;
    const message = req.body.message;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(400).json({ error: "Room doesn't exist" });
    }

    const sender = await User.findById(senderId).select('_id fullName profilePicture');
    if (!sender) {
      return res.status(400).json({ error: "Sender not found" });
    }

    const newMessage = new Message({
      roomId,
      senderId,
      message,
    });

    await newMessage.save();

    const populatedMessage = await newMessage.populate({
      path: "senderId",
      select: "_id fullName profilePicture",
    });

    room.participants.forEach((participantId) => {
      const socketId = getReceiverSocketId(participantId);
      if (socketId) {
        io.to(socketId).emit("sendMessage", populatedMessage);
      }
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error send message" });
    console.log(error);
  }
};

