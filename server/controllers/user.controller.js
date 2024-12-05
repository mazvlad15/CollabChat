import User from "../models/user.model.js";
import Room from "../models/room.model.js";

export const profile = async (req, res) => {
  try {
    const user = req.user;
    if(!user) {
        return res.status(400).json({error: "User not found"});
    }
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error in profile" });
  }
};

export const getAllUsers = async (req, res) => {
  try {

    const users = await User.find().select("-password");
    if(!users){
      res.status(400).json({error: "No existing users"});
    }else {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({error: "Internal Server Error in get all users"});
  }
}

export const getUsersInRoom = async (req, res) => {
  try {
    const roomId = req.params.roomId;

    const room = await Room.findById(roomId).populate('participants', '_id fullName profilePicture');
    if (!room) {
      return res.status(400).json({ error: "Room does not exist" });
    }

    if (room.participants.length === 0) {
      return res.status(400).json({ error: "No users in this room" });
    }

    res.status(200).json(room.participants);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error in get users in room" });
  }
};
