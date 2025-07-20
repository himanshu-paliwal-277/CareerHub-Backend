import express from "express";
import { isAuthenticated } from "../../middleware/authMiddleware.js";
import {
  createCompanyController,
  deleteCompanyController,
  findAllCompanyController,
  getCompanyController,
  updateCompanyController,
} from "../../controller/companyControllers.js";
import { zodCompanySchema } from "../../validation/zodCompanySchema.js";
import { validate } from "../../validation/zodValidator.js";
import { zodUpdateCompanySchema } from "../../validation/zodUpdateCompanySchema.js";

const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  validate(zodCompanySchema),
  createCompanyController
);

router.get("/", isAuthenticated, findAllCompanyController);
router.get("/:id", isAuthenticated, getCompanyController);
router.delete("/:id", isAuthenticated, deleteCompanyController);
router.put(
  "/:id",
  isAuthenticated,
  validate(zodUpdateCompanySchema),
  updateCompanyController
);

export default router;
