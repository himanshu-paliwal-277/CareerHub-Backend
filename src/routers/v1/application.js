import express from "express";
import { isAuthenticated } from "../../middleware/authMiddleware.js";
import { createApplicationController } from "../../controller/applicationController.js";
import { zodApplicationSchema } from "../../validation/zodApplicationSchema.js";
import { validate } from "../../validation/zodValidator.js";

const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  validate(zodApplicationSchema),
  createApplicationController
);

export default router;
