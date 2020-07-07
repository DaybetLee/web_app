const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const policyholderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
    minlength: 8,
  },
  nric: {
    type: String,
    required: true,
  },
  policy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Policy",
    },
  ],
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
  },
});

const Policyholder = mongoose.model("Policyholder", policyholderSchema);

function validatePolicyholder(Policyholder) {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    agentId: Joi.string().required(),
    nric: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    mobile: Joi.number().min(8).required(),
  });
  return schema.validate(Policyholder);
}

exports.Policyholder = Policyholder;
exports.validatePolicyholder = validatePolicyholder;
