const Company = require('../models/companyModel');
const User = require('../models/userModel');

// Register company or sub-company
exports.createCompany = async (req, res) => {
  try {
    const { name, parentCompanyId } = req.body;
    let hierarchyLevel = 1;

    if (parentCompanyId) {
      const parentCompany = await Company.findById(parentCompanyId);
      if (!parentCompany) return res.status(404).send({ status: false, message: "Parent company not found" });
      hierarchyLevel = parentCompany.hierarchyLevel + 1;
    }

    const companyData = { name, parentCompanyId, hierarchyLevel };
    const company = await Company.create(companyData);

    const response = { companyId: company._id, hierarchyLevel: company.hierarchyLevel };
    return res.status(201).send({ status: true, message: "Company registered successfully", data: response });

  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

// Get company by Id
exports.getCompanyDetails = async (req, res) => {
  try {
    const { companyId } = req.params;
    const company = await Company.findById(companyId).populate("parentCompanyId").lean();

    if (!company) return res.status(404).send({ status: false, message: "Company not found" });

    const users = await User.find({ companyId: company._id });
    const subCompanies = await Company.find({ parentCompanyId: company._id });

    return res.status(200).send({ status: true, data: { ...company, users, subCompanies } });

  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

