import { createUser, getUserByEmail } from "../repository/user.js";
import bcrypt from "bcrypt";
import { generateJwtToken } from "../utils/jwt.js";

export const signupUserService = async (user) => {
  try {
    const newUser = await createUser(user);

    return newUser;
  } catch (error) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      const errorObj = new Error(
        "User with the same email or name already exists"
      );
      errorObj.status = 400;
      throw errorObj;
    }
    throw error;
  }
};

export const signinUserService = async (userDetails) => {
  try {
    // 1. check if there is a valid registered user with the email
    const user = await getUserByEmail(userDetails.email);
    if (!user) {
      throw {
        status: 404,
        message: "User not found",
      };
    }

    // 2. Compare the password
    const isPasswordValid = bcrypt.compareSync(
      userDetails.password,
      user.password
    );

    if (!isPasswordValid) {
      throw {
        status: 401,
        message: "Invalid password",
      };
    }

    const token = generateJwtToken({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role || "user",
    });

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role || "user",
    };

    return {
      user: userData,
      token,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const checkIfUserExists = async (email) => {
  try {
    const user = await getUserByEmail(email);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
