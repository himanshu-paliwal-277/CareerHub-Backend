import { createApplicationService } from "../services/applicationService.js";


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
