import User from "../models/user.model.js";

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