import {
  countTotalCompanies,
  createCompany,
  findAllCompanies,
} from "../repository/company.js";

export const createCompanyService = async (createCompanyObject) => {
  const company = await createCompany(createCompanyObject);
  if (!company) {
    const error = new Error("company already exists");
    error.status = 400;
    throw error;
  }
  return company;
};

export const findAllCompanyService = async (page, limit) => {
  const companies = await findAllCompanies(page, limit);
  const totalCompanies = await countTotalCompanies();
  const totalPage = Math.ceil(totalCompanies / limit);

  return {
    companies: companies,
    totalCompanies: totalCompanies,
    totalPage: totalPage,
  };
};
