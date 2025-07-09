import express from "express";
import { signup, signin } from "../../controller/userControllers.js";
import { validate } from "../../validation/zodValidator.js";
import { zodSignUpSchema } from "../../validation/zodSignUpSchema.js";
import { zodSignInSchema } from "../../validation/zodSignInSchema.js";

const router = express.Router();

router.post("/signup", validate(zodSignUpSchema), signup);
router.post("/signin", validate(zodSignInSchema), signin);

export default router;
