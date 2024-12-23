import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_KEY, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    maxAge: 30 * 24 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });
};

export default generateTokenAndSetCookie;
