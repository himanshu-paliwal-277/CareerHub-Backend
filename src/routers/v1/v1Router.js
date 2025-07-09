import express from "express";
import companyRouter from "./company.js";
import userRouter from "./user.js";
import applicationRouter from "./application.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/company", companyRouter);
router.use("/application", applicationRouter);

export default router;
