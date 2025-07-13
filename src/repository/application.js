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

export const getAllApplicationByUserId = async (userId, page, limit) => {
  try {
    const applications = await Application.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: "company",
        select: "name",
      });
    return applications;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getApplicationInCompany = async (companyId, userId) => {
  try {
    const application = await Application.findOne({
      company: companyId,
      user: userId,
    });
    return application;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const countTotalApplications = async (userId) => {
  try {
    const totalApplications = await Application.countDocuments({
      user: userId,
    });
    return totalApplications;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getApplicationById = async (id) => {
  try {
    const application = await Application.findOne(id);
    return application;
  } catch (error) {}
};

export const updateApplicationById = async (id, updatedApplication) => {
  try {
    const application = await Application.findByIdAndUpdate(
      id,
      updatedApplication
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};
