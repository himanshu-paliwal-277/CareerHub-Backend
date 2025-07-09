import { checkIfUserExists } from "../services/userService.js";
import { verifyToken } from "../utils/jwt.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(404).json({
      success: false,
      message: "token is required",
    });
  }

  // verify token
  try {
    const response = verifyToken(token);

    // check does user exists
    const doesUserExists = await checkIfUserExists(response.email);

    if (!doesUserExists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = response;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export const isAdmin = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Unauthorized, you are not an admin",
    });
  }
  next();
};
