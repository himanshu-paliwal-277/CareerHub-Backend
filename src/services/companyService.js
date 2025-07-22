import {
  countTotalCompanies,
  createCompany,
  deleteCompanyById,
  findAllCompanies,
  getCompanyById,
  getTotalCompaniesCount,
  updateCompanyById,
} from "../repository/company.js";

export const createCompanyService = async (createCompanyObject) => {
  try {
    const company = await createCompany(createCompanyObject);
    if (!company) {
      const error = new Error("company already exists");
      error.status = 400;
      throw error;
    }
    return company;
  } catch (error) {
    throw error;
  }
};

export const findAllCompanyService = async (query) => {
  const companies = await findAllCompanies(query);
  const totalCompanies = await countTotalCompanies(query);
  const totalPage = Math.ceil(totalCompanies / query.limit);

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

export const countTotalCompaniesService = async () => {
  try {
    const totalCompanies = await getTotalCompaniesCount();
    return totalCompanies;
  } catch (error) {
    console.error("Error in countTotalCompaniesService:", error);
    throw error;
  }
};
