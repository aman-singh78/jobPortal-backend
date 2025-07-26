import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "user bot authenticated", success: false });
    }
    const decodedObj = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedObj) {
      return res.status(401).json({ message: "Invalid token", success: false });
    }
    req.id = decodedObj.userId;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res
      .status(401)
      .json({ message: "Invalid or expired token", success: false });
  }
};
export default isAuthenticated;
