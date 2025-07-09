import {
  signupUserService,
  signinUserService,
} from "../services/userService.js";

export async function signup(req, res) {
  try {
    const user = await signupUserService(req.body);
    if (user) {
      console.log("signin user");
      return res.status(200).json({
        success: true,
        message: "User created successfully",
        data: user,
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
    console.log("response = ", response);
    return res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: response,
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
