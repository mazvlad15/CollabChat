import Message from "../models/message.model.js";
import Room from "../models/room.model.js";

export const getMessages = async (req, res) => {
  try {
    const roomId = req.params.id;
    const messages = await Message.find({ roomId }).populate(
      "senderId",
      "username profilePicture"
    );

    if (!messages) {
      return res.status(400).json({ error: "Room don't find" });
    }

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error get messages" });
  }
};

export const createRoom = async (req, res) => {
  try {
    const creatorId = req.user._id;
    const { name, participants, isPrivate } = req.body;

    const existingRoom = await Room.findOne({ name });
    if (existingRoom) {
      return res
        .status(400)
        .json({ error: "Room already exists, change name" });
    }

    const newRoom = new Room({
      name,
      creatorId,
      participants,
      isPrivate,
    });

    if (newRoom) {
      await newRoom.save();
      res.status(201).json({
        _id: newRoom._id,
        name: newRoom.name,
        participants: newRoom.participants,
        isPrivate: newRoom.isPrivate,
      });
    } else {
      return res.status(400).json({ error: "Error to create new room" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error create room" });
  }
};

export const getRoomsWhereUserIn = async (req, res) => {
  try {
    const userId = req.user._id;

    const rooms = await Room.find({ participants: userId });

    if (rooms.length === 0) {
      return res
        .status(404)
        .json({ message: "No rooms found where the user is a participant." });
    }

    res.status(200).json({ rooms });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error get rooms in" });
  }
};

export const addParticipant = async (req, res) => {
  try {
    const userId = req.user._id;

    const participantId = req.body.participantId;
    const roomId = req.params.roomId;

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(400).json({ error: "Room doesn't exist" });
    }

    console.log("User id: " + userId + " " + typeof userId + "\n room owner " + room.creatorId.toString());


    if (userId.toString() !== room.creatorId.toString()) {
      return res
        .status(400)
        .json({ error: "Only the owner can add participants" });
    }

    if (room.participants.includes(participantId)) {
      return res.status(400).json({ error: "Participant already in the room" });
    }

    room.participants.push(participantId);

    await room.save();

    res.status(200).json({ message: "Participant added successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal Server Error while adding participant" });
  }
};
