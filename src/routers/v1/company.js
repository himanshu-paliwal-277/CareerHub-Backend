import express from "express";
import { isAuthenticated } from "../../middleware/authMiddleware.js";
import { createCompanyController, findAllCompanyController } from "../../controller/companyControllers.js";
import { zodCompanySchema } from "../../validation/zodCompanySchema.js";
import { validate } from "../../validation/zodValidator.js";

const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  validate(zodCompanySchema),
  createCompanyController
);

router.get("/", findAllCompanyController);

export default router;
