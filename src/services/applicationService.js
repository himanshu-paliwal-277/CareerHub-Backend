import {
  countTotalApplications,
  createApplication,
  getAllApplicationByUserId,
  getApplicationById,
  getApplicationInCompany,
} from "../repository/application.js";

export const createApplicationService = async (applicationData) => {
  try {
    const application = await createApplication(applicationData);
    return application;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllApplicationService = async (userId, page, limit) => {
  try {
    const applications = await getAllApplicationByUserId(userId, page, limit);
    const totalApplications = await countTotalApplications(userId);
    const totalPage = Math.ceil(totalApplications / limit);

    return {
      applications: applications,
      totalApplications: totalApplications,
      totalPage: totalPage,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getApplicationInCompanyService = async (companyId, userId) => {
  try {
    const application = await getApplicationInCompany(companyId, userId);
    return application;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getApplicationService = async (id) => {
  try {
    const application = await getApplicationById(id);
    return application;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
