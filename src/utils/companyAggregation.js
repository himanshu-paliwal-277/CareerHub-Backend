import mongoose from "mongoose";

export const buildCompanyAggregationPipeline = ({
  page = 1,
  limit = 10,
  search = "",
  location = "",
  tags = [],
  sortBy = "createdAt",
  sortOrder = "desc",
  userId,
}) => {
  const filter = {};

  if (search.trim()) {
    filter.name = { $regex: search.trim(), $options: "i" };
  }

  if (location.trim()) {
    filter.location = { $regex: location.trim(), $options: "i" };
  }

  if (Array.isArray(tags) && tags.length > 0) {
    filter.$or = tags.map((tag) => ({
      tags: { $regex: new RegExp(`^${tag.trim()}$`, "i") },
    }));
  }
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const pipeline = [
    { $match: filter },

    { $sort: { [sortBy]: sortOrder === "asc" ? 1 : -1 } },

    { $skip: (page - 1) * limit },
    { $limit: limit },

    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "createdBy",
      },
    },
    {
      $unwind: {
        path: "$createdBy",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $lookup: {
        from: "applications",
        localField: "_id",
        foreignField: "company",
        as: "companyApplications",
      },
    },
    {
      $addFields: {
        userApplications: {
          $filter: {
            input: "$companyApplications",
            as: "app",
            cond: { $eq: ["$$app.user", userObjectId] },
          },
        },
      },
    },
    {
      $addFields: {
        isApplied: { $gt: [{ $size: "$userApplications" }, 0] },
      },
    },
    {
      $project: {
        userApplications: 0,
        companyApplications: 0,
      },
    },
  ];

  return pipeline;
};
