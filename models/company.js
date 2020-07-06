const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
  },
  //   agents: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Agent",
  //     },
  //   ],
});

const Company = mongoose.model("Company", companySchema);

function validateCompany(Company) {
  const schema = Joi.object({ name: Joi.string().min(1).required() });
  return schema.validate(Company);
}

exports.Company = Company;
exports.validateCompany = validateCompany;
