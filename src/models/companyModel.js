const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parentCompanyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },
    hierarchyLevel: { 
        type: Number, 
        default: 1 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
