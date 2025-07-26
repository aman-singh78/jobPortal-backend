import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res
        .status(400)
        .json({ message: "Company name is required", success: false });
    }
    const company = await Company.findOne({ name: companyName });
    if (company) {
      return res
        .status(400)
        .json({ message: "You can not register same company", success: false });
    }
    const newCompany = new Company({
      name: companyName,
      userId: req.id,
    });
    await newCompany.save();
    return res.status(200).json({
      message: "company registered successfully",
      newCompany,
      success: true,
    });
  } catch (error) {
    console.error("Error registering company:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res
        .status(404)
        .json({ message: "companies not found", success: false });
    }

    return res.status(200).json({
      message: "Companies retrieved successfully",
      success: true,
      companies,
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return res.status(500).json({
      message: "Server error while fetching companies",
      success: false,
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req?.params?.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res
        .status(404)
        .json({ message: "companies not found", success: false });
    }
    return res.status(200).json({ company, success: true });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return res.status(500).json({
      message: "Server error while fetching companies",
      success: false,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const id = req?.params?.id;
    const file = req.file;

    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (website) updateData.website = website;
    if (location) updateData.location = location;
    if (file) updateData.logo = file.path;

    const company = await Company.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }

    return res.status(200).json({
      message: "Company info updated successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.error("Error updating company:", error);
    return res
      .status(500)
      .json({ message: "Server error during update", success: false });
  }
};
