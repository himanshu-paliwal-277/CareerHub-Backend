import { response } from "express";
import {
  countTotalApplicationsService,
  createApplicationService,
  getAllApplicationService,
  getApplicationInCompanyService,
  getApplicationService,
  updateApplicationService,
} from "../services/applicationService.js";

export const createApplicationController = async (req, res) => {
  try {
    const applicationData = req.body;
    applicationData.user = req.user._id;
    const response = await createApplicationService(applicationData);
    return res.status(201).json({
      success: true,
      message: "Application created successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllApplicationController = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const status = req.query.status || "All";
    const userId = req.user._id;
    const paginatedApplication = await getAllApplicationService(
      userId,
      page,
      limit,
      status
    );
    return res.status(200).json({
      success: true,
      message: "Applications fetched successfully",
      data: paginatedApplication,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getApplicationInCompanyController = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const userId = req.user._id;
    const application = await getApplicationInCompanyService(companyId, userId);
    return res.status(200).json({
      success: true,
      message: "Application fetched successfully",
      data: application,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getApplicationController = async (req, res) => {
  try {
    const applicationId = req.params.id;
    console.log("application id = ", applicationId);
    const application = await getApplicationService(applicationId);
    return res.status(200).json({
      success: true,
      message: "Application fetched successfully",
      data: application,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateApplicationController = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const updatedApplication = req.body;
    const response = await updateApplicationService(
      applicationId,
      updatedApplication
    );
    return res.status(200).json({
      success: true,
      message: "Application updated successfully",
      data: response,
    });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const countTotalApplicationsController = async (req, res) => {
  try {
    const userId = req.user._id;
    const status = req.query.status || "All";
    const totalApplications = await countTotalApplicationsService(userId, status);
    return res.status(200).json({
      success: true,
      message: "Total applications fetched successfully",
      data: { totalApplications: totalApplications },
    });
  } catch (error) {
    console.error("Error in countTotalApplicationsController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
