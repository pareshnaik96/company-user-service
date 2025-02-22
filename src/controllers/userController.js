const User = require("../models/userModel");
const Company = require("../models/companyModel");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, companyId } = req.body;

    const company = await Company.findById(companyId);
    if (!company) return res.status(404).send({ status: false, message: "Company not found" });

    const user = await User.create({ name, email, companyId });

    return res.status(201).send({ 
      status: true, 
      message: "User registered successfully", 
      data: { userId: user._id, companyId, role: user.role } 
    });

  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("companyId").lean();
    if (!user) return res.status(404).send({ status: false, message: "User not found" });

    return res.status(200).send({ status: true, message:"User details", data: user });

  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
