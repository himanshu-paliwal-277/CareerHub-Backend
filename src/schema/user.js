import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      minLength: 5,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 5,
      validate: {
        validator: (emailValue) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
        },
        message: "Invalid email format",
      },
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function modifyPassword(next) {
  // incoming user object
  const user = this; // object with plan password

  const salt = bcrypt.genSaltSync(9);

  // hash password

  const hashedPassword = bcrypt.hashSync(user.password, salt);
  user.password = hashedPassword;
  next();
});

const User = mongoose.model("users", userSchema); // user collection

export default User;
