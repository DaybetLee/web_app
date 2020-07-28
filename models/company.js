const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

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

companySchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name, isCompanyAdmin: this.isCompanyAdmin },
    "jwtPrivateKey" // config.get("jwtPrivateKey")
  );
  return token;
};

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

companySchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isCompanyAdmin: this.isCompanyAdmin },
    "jwtPrivate" // config.get("jwtPrivateKey")
  );
  return token;
};

exports.Company = Company;
exports.validateCompany = validateCompany;
