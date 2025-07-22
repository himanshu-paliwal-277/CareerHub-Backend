import mongoose from "mongoose";

export const buildCompanyCountAggregation = ({
  search = "",
  location = "",
  tags = [],
  applicationStatus = "all",
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

  const pipeline = [];

  // Step 1: Basic company filter
  pipeline.push({ $match: filter });

  // Step 2: Lookup applications for each company
  pipeline.push({
    $lookup: {
      from: "applications",
      localField: "_id",
      foreignField: "company",
      as: "companyApplications",
    },
  });

  // Step 3: Filter only applications by the current user
  pipeline.push({
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
  });

  // Step 4: Conditionally filter by application status
  if (applicationStatus === "applied") {
    pipeline.push({
      $match: { isApplied: true },
    });
  } else if (applicationStatus === "notApplied") {
    pipeline.push({
      $match: { isApplied: false },
    });
  }

  return pipeline;
};
