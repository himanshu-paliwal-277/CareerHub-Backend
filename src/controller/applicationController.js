import {
  createApplicationService,
  getAllApplicationService,
  getApplicationInCompanyService,
  getApplicationService,
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
    const userId = req.user._id;
    const paginatedApplication = await getAllApplicationService(userId, page, limit);
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
    const application = await getApplicationInCompanyService(
      companyId,
      userId
    );
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
