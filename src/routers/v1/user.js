import express from "express";
import { signup, signin, logoutUserController, getUserController } from "../../controller/userControllers.js";
import { validate } from "../../validation/zodValidator.js";
import { zodSignUpSchema } from "../../validation/zodSignUpSchema.js";
import { zodSignInSchema } from "../../validation/zodSignInSchema.js";
import { isAuthenticated } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", validate(zodSignUpSchema), signup);
router.post("/signin", validate(zodSignInSchema), signin);
router.post("/logout", logoutUserController); 
router.get("/me", isAuthenticated, getUserController);

export default router;
