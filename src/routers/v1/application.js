import express from "express";
import { isAuthenticated } from "../../middleware/authMiddleware.js";
import {
  createApplicationController,
  getAllApplicationController,
  getApplicationController,
  getApplicationInCompanyController,
  updateApplicationController,
} from "../../controller/applicationController.js";
import { zodApplicationSchema } from "../../validation/zodApplicationSchema.js";
import { validate } from "../../validation/zodValidator.js";
import { zodUpdateApplicationSchema } from "../../validation/zodUpdateApplicationSchema.js";

const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  validate(zodApplicationSchema),
  createApplicationController
);
router.get("/", isAuthenticated, getAllApplicationController);
router.get(
  "/company/:companyId",
  isAuthenticated,
  getApplicationInCompanyController
);
router.get("/:id", isAuthenticated, getApplicationController);
router.put(
  "/:id",
  isAuthenticated,
  validate(zodUpdateApplicationSchema),
  updateApplicationController
);

export default router;
