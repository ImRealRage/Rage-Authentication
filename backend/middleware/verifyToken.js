import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Attempt to get the token from cookies or the Authorization header
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  try {
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token, authorization denied",
      });
    }

    // Verify the token using the secret from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid token, authorization denied",
      });
    }

    // Attach the decoded user ID to the request object
    req.userId = decoded.userId;
    next();
  } catch (error) {
    // Handle specific JWT errors for better error feedback
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired, please log in again",
      });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token, authorization denied",
      });
    }

    console.log("Error in verifyToken", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
