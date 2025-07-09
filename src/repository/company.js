import Company from "../schema/company.js";

export const createCompany = async (companyData) => {
  try {
    const company = await Company.create(companyData);
    return company;
  } catch (error) {
    console.log(error);
  }
};

export const findAllCompanies = async (page, limit) => {
  try {
    const companies = await Company.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    // .populate({
    //   path: "application",
    //   select: "_id status",
    // })
    // .select("_id companyName");
    return companies;
  } catch (error) {
    console.log(error);
  }
};

export const countTotalCompanies = () => {
  try {
    const totalCompanies = Company.countDocuments();
    return totalCompanies;
  } catch (error) {
    console.log(error);
  }
};
