import Message from "../models/message.model.js";
import Room from "../models/room.model.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const roomId = req.params.roomId;
    const message = req.body.message;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(400).json({ error: "Room don't exist" });
    }

    const newMessage = new Message({
      roomId,
      senderId,
      message,
    });

    if (newMessage) {
      await newMessage.save();

      res.status(201).json({
        roomId: newMessage.roomId,
        senderId: newMessage.senderId,
        message: newMessage.message,
      });
    } else {
      return res.status(400).json({ error: "Error to create message" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error send message" });
  }
};
