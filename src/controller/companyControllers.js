import {
  createCompanyService,
  deleteCompanyService,
  findAllCompanyService,
  getCompanyService,
  updateCompanyService,
} from "../services/companyService.js";

export const createCompanyController = async (req, res) => {
  try {
    const companyData = {
      name: req.body.name,
      website: req.body.website,
      linkedin: req.body.linkedin,
      location: req.body.location,
      contactPerson: req.body.contactPerson,
      contactInfo: req.body.contactInfo,
      tags: req.body.tags,
      createdBy: req.user._id,
    };

    const company = await createCompanyService(companyData);

    return res.status(201).json({
      success: true,
      message: "company created successfully.",
      data: company,
    });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const findAllCompanyController = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const paginatedCompany = await findAllCompanyService(page, limit);
    return res.status(200).json({
      success: true,
      message: "company fetch successfully",
      data: paginatedCompany,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getCompanyController = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await getCompanyService(companyId);

    return res.status(200).json({
      success: true,
      message: "fetch company successfully.",
      data: company,
    });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const deleteCompanyController = async (req, res) => {
  try {
    const companyId = req.params.id;
    const response = await deleteCompanyService(companyId);

    return res.status(200).json({
      success: true,
      message: "company deleted successfully.",
      data: response,
    });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const updateCompanyController = async (req, res) => {
  try {
    const companyId = req.params.id;
    const updatedCompany = req.body;
    const response = await updateCompanyService(companyId, updatedCompany);

    return res.status(200).json({
      success: true,
      message: "company updated successfully.",
      data: response,
    });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
