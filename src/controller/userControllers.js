import { success } from "zod/v4";
import {
  signupUserService,
  signinUserService,
} from "../services/userService.js";
import { NODE_ENV } from "../config/serverConfig.js";

export async function signup(req, res) {
  try {
    const user = await signupUserService(req.body);
    if (user) {
      console.log("signin user");
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: {
          userId: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }
  } catch (error) {
    console.log(error);
    if (error.status) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function signin(req, res) {
  try {
    const response = await signinUserService(req.body);

    // Set token in HTTP-only cookie
    res.cookie("token", response.token, {
      httpOnly: true,
      secure: NODE_ENV === "production", // send over HTTPS only in prod
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: response.user,
    });
  } catch (error) {
    console.log(error);
    if (error.status) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export const logoutUserController = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "Strict",
    });
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getUserController = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    return res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
