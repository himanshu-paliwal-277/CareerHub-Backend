import Company from "../schema/company.js";
import { buildCompanyAggregationPipeline } from "../utils/companyAggregation.js";
import { buildCompanyCountAggregation } from "../utils/filteredCompanyAggregation.js";

export const createCompany = async (companyData) => {
  try {
    const company = await Company.create(companyData);
    return company;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const findAllCompanies = async (query) => {
  try {
    const pipeline = buildCompanyAggregationPipeline(query);
    const companies = await Company.aggregate(pipeline);
    return companies;
  } catch (error) {
    console.error("Error in findAllCompanies:", error);
    throw error;
  }
};

export const countTotalCompanies = async (query) => {
  try {
    const pipeline = buildCompanyCountAggregation({
      search: query.search || "",
      location: query.location || "",
      tags: query.tags || [],
    });

    pipeline.push({ $count: "total" });

    const result = await Company.aggregate(pipeline);
    return result[0]?.total || 0;
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
