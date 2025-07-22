import mongoose from "mongoose";

export const buildCompanyAggregationPipeline = ({
  page = 1,
  limit = 10,
  search = "",
  location = "",
  tags = [],
  applicationStatus = "all",
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
        isApplied: {
          $gt: [
            {
              $size: {
                $filter: {
                  input: "$companyApplications",
                  as: "app",
                  cond: { $eq: ["$$app.user", userObjectId] },
                },
              },
            },
            0,
          ],
        },
      },
    },
  ];

  // Conditionally apply match based on applicationStatus
  if (applicationStatus === "applied") {
    pipeline.push({ $match: { isApplied: true } });
  } else if (applicationStatus === "notApplied") {
    pipeline.push({ $match: { isApplied: false } });
  }

  pipeline.push({
    $project: {
      userApplications: 0,
      companyApplications: 0,
    },
  });

  pipeline.push({ $skip: (page - 1) * limit });
  pipeline.push({ $limit: limit });

  return pipeline;
};
