import mongoose from "mongoose";
import Application from "../schema/application.js";
import dayjs from "dayjs";

export const createApplication = async (applicationData) => {
  try {
    const application = await Application.create(applicationData);
    return application;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllApplicationByUserId = async (
  userId,
  page,
  limit,
  status
) => {
  try {
    const applications = await Application.find({
      user: userId,
      status: status !== "All" ? status : { $exists: true },
    })
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

export const countTotalApplications = async (userId, status) => {
  try {
    const statusFilter =
      status === "All"
        ? { status: { $exists: true } }
        : { status: { $in: status } };

    const totalApplications = await Application.countDocuments({
      user: userId,
      ...statusFilter,
    });

    return totalApplications;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getApplicationsStatusCount = async (userId) => {
  try {
    const defaultStatuses = [
      "Applied",
      "Shortlisted",
      "Interview",
      "Cleared",
      "Offer",
      "Rejected",
    ];

    const counts = await Application.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(userId) },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Initialize result with 0 for all known statuses
    const result = Object.fromEntries(defaultStatuses.map((s) => [s, 0]));

    // Fill actual counts only for known statuses
    counts.forEach(({ _id, count }) => {
      if (_id && result.hasOwnProperty(_id)) {
        result[_id] = count;
      }
    });

    return result;
  } catch (error) {
    console.error("Error in getApplicationsStatusCount:", error);
    throw error;
  }
};

export const getApplicationById = async (id) => {
  try {
    const application = await Application.findOne({ _id: id });
    return application;
  } catch (error) {
    console.log(error);
    throw error;
  }
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

export const getDailyApplicationCounts = async (userId, startDate, endDate) => {
  try {
    const result = await Application.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          createdAt: {
            $gte: new Date(startDate),
            $lt: dayjs(endDate).add(1, "day").toDate(), // ensure endDate is included
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const heatMapData = {};
    result.forEach((item) => {
      heatMapData[item._id] = item.count;
    });

    return heatMapData;
  } catch (error) {
    console.error("Error in getDailyApplicationCounts:", error);
    throw error;
  }
};
