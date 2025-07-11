import Company from "../schema/company.js";

export const createCompany = async (companyData) => {
  try {
    const company = await Company.create(companyData);
    return company;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const findAllCompanies = async (page, limit) => {
  try {
    const companies = await Company.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: "createdBy",
        select: "name email",
      });

    // const companies = await Company.aggregate([
    //   {
    //     $lookup: {
    //       from: "users",
    //       localField: "createdBy",
    //       foreignField: "_id",
    //       as: "userDetails",
    //     },
    //   },
    //   { $unwind: "$userDetails" },
    // ]);
    return companies;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const countTotalCompanies = async () => {
  try {
    const totalCompanies = await Company.countDocuments();
    return totalCompanies;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCompanyById = async (id) => {
  try {
    const company = await Company.findById(id).populate({
      path: "createdBy",
      select: "name email",
    });
    return company;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteCompanyById = async (id) => {
  try {
    const response = await Company.findByIdAndDelete(id);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateCompanyById = async (id, updatedCompany) => {
  try {
    const response = await Company.findByIdAndUpdate(id, updatedCompany);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
