import Application from "../schema/application.js";

export const createApplication = async (applicationData) => {
  try {
    const application = await Application.create(applicationData);
    return application;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
