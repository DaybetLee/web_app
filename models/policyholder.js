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
  nric: {
    type: String,
    required: true,
    minlength: 9,
  },
  mobile: {
    type: Number,
    required: true,
    minlength: 8,
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
  },
  policy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Policy",
    },
  ],
  viewable: {
    type: Boolean,
    default: true,
  },
});

const Policyholder = mongoose.model("Policyholder", policyholderSchema);

function validatePolicyholder(Policyholder) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    nric: Joi.string()
      .min(9)
      .required()
      .pattern(/^[A-Z0-9]{9,9}$/),
    mobile: Joi.number().min(8).required(),
    agentId: Joi.objectId().required(),
    viewable: Joi.boolean(),
  });
  return schema.validate(Policyholder);
}

function validateViewable(Policyholder) {
  const schema = Joi.object({
    viewable: Joi.boolean().required(),
  });
  return schema.validate(Policyholder);
}

function validateAgentId(Policyholder) {
  const schema = Joi.object({
    agentId: Joi.objectId().required(),
    viewable: Joi.boolean().required(),
  });
  return schema.validate(Policyholder);
}

exports.Policyholder = Policyholder;
exports.validatePolicyholder = validatePolicyholder;
exports.validateViewable = validateViewable;
exports.validateAgentId = validateAgentId;
