import {
  countTotalCompanies,
  createCompany,
  deleteCompanyById,
  findAllCompanies,
  getCompanyById,
  updateCompanyById,
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

export const getCompanyService = async (id) => {
  try {
    const company = await getCompanyById(id);
    if (!company) {
      throw {
        message: "Company not found",
        statusCode: 404,
      };
    }
    return company;
  } catch (error) {
    console.error("Error in getCompanyService:", error);
    throw error;
  }
};

export const deleteCompanyService = async (id) => {
  try {
    const response = await deleteCompanyById(id);
    if (!response) {
      throw {
        message: "Company not found for deletion",
        statusCode: 404,
      };
    }
    return response;
  } catch (error) {
    console.error("Error in deleteCompanyService:", error);
    throw error;
  }
};

export const updateCompanyService = async (id, updatedCompany) => {
  try {
    const response = await updateCompanyById(id, updatedCompany);
    if (!response) {
      throw {
        message: "Company not found for update",
        statusCode: 404,
      };
    }
    return response;
  } catch (error) {
    console.error("Error in updateCompanyService:", error);
    throw error;
  }
};
