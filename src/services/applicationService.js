import {
  countTotalApplications,
  createApplication,
  getAllApplicationByUserId,
  getApplicationById,
  getApplicationInCompany,
  getApplicationsStatusCount,
  getDailyApplicationCounts,
  updateApplicationById,
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

export const getAllApplicationService = async (userId, page, limit, status) => {
  try {
    const applications = await getAllApplicationByUserId(
      userId,
      page,
      limit,
      status
    );
    const totalApplications = await countTotalApplications(userId, status);
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

export const updateApplicationService = async (id, updatedApplication) => {
  try {
    const application = await updateApplicationById(id, updatedApplication);
    return application;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const countTotalApplicationsService = async (userId, status) => {
  try {
    const totalApplications = await countTotalApplications(userId, status);
    return totalApplications;
  } catch (error) {
    console.error("Error in countTotalApplicationsService:", error);
    throw error;
  }
};

export const getApplicationsStatusCountService = async (userId) => {
  try {
    const totalApplications = await getApplicationsStatusCount(userId);
    return totalApplications;
  } catch (error) {
    console.error("Error in countTotalApplicationsService:", error);
    throw error;
  }
};

export const getDailyApplicationCountsService = async (userId, startDate, endDate) => {
  try {
    const data = await getDailyApplicationCounts(userId, startDate, endDate);
    return data;
  } catch (error) {
    throw error;
  }
};
