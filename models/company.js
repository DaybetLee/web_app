const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const Company = new mongoose.model(
  "Company",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 1,
    },
    agents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agent",
      },
    ],
  })
);

function validateCompany(Company) {
  const schema = Joi.object({ name: Joi.string().min(1).required() });
  return schema.validate(Company);
}

exports.Company = Company;
exports.validateCompany = validateCompany;
