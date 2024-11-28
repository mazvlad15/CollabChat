
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

