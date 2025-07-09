import { createApplication } from "../repository/application.js";

export const createApplicationService = async (applicationData) => {
  try {
    const application = await createApplication(applicationData);
    return application;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
