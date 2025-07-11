import express from "express";
import { isAuthenticated } from "../../middleware/authMiddleware.js";
import {
  createApplicationController,
  getAllApplicationController,
  getApplicationController,
  getApplicationInCompanyController,
} from "../../controller/applicationController.js";
import { zodApplicationSchema } from "../../validation/zodApplicationSchema.js";
import { validate } from "../../validation/zodValidator.js";

const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  validate(zodApplicationSchema),
  createApplicationController
);
router.get("/", isAuthenticated, getAllApplicationController);
router.get("/:companyId/", isAuthenticated, getApplicationInCompanyController);
router.get("/id", isAuthenticated, getApplicationController);

export default router;
