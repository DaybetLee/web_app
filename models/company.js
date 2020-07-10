const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  isCompanyAdmin: {
    type: Boolean,
    default: true,
  },
});

const Company = mongoose.model("Company", companySchema);

function validateCompany(Company) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(Company);
}

exports.Company = Company;
exports.validateCompany = validateCompany;
