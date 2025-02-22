const User = require("../models/userModel");
const Company = require("../models/companyModel");

exports.search = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ status: false, message: "Query is required" });

    // Search Users
    const users = await User.aggregate([
      {
        $match: {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } }
          ]
        }
      },
      {
        $lookup: {
          from: "companies",
          localField: "companyId",
          foreignField: "_id",
          as: "companyDetails"
        }
      },
      { $unwind: { path: "$companyDetails", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          role: 1,
          "companyDetails.name": 1,
          "companyDetails.hierarchyLevel": 1,
          "companyDetails.parentCompanyId": 1
        }
      }
    ]).limit(5);

    // Search Companies
    const companies = await Company.aggregate([
      {
        $match: { name: { $regex: query, $options: "i" } }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "companyId",
          as: "associatedUsers"
        }
      },
      {
        $lookup: {
          from: "companies",
          localField: "parentCompanyId",
          foreignField: "_id",
          as: "parentCompany"
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          hierarchyLevel: 1,
          parentCompany: { $arrayElemAt: ["$parentCompany.name", 0] },
          associatedUsers: { $slice: ["$associatedUsers", 5] }
        }
      }
    ]).limit(5);

    // Prepare response
    const data = {};
    if (users.length) data.users = users;
    if (companies.length) data.companies = companies;

    if (Object.keys(data).length) {
      return res.status(200).send({ status: true, message:"Search data", data });
    }
    return res.status(404).send({ status: false, message: "No results found" });

  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

