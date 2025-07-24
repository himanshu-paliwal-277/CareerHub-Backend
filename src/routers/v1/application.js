import express from "express";
import { isAuthenticated } from "../../middleware/authMiddleware.js";
import {
  countTotalApplicationsController,
  createApplicationController,
  getAllApplicationController,
  getApplicationController,
  getApplicationInCompanyController,
  getApplicationsStatusCountController,
  getDailyApplicationCountsController,
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
router.get("/totalCount", isAuthenticated, countTotalApplicationsController);
router.get("/status-count", isAuthenticated, getApplicationsStatusCountController);
router.get("/daily-count", isAuthenticated, getDailyApplicationCountsController);
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
