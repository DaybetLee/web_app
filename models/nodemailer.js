const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const nodemailerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  link: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  policyholder: {
    type: String,
    required: true,
  },
  nric: {
    type: String,
    required: true,
    minlength: 9,
  },
  reject: {
    type: String,
    required: true,
  },
});

const NodeMailer = mongoose.model("NodeMailer", nodemailerSchema);

function validateNodeMailer(NodeMailer) {
  const schema = Joi.object({
    link: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    policyholder: Joi.string().required(),
  });
  return schema.validate(NodeMailer);
}

function validateNMForCompany(NodeMailer) {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    company: Joi.string().required(),
    policyholder: Joi.string().required(),
    nric: Joi.string()
      .min(9)
      .required()
      .pattern(/^[A-Z0-9]{9,9}$/),
  });
  return schema.validate(NodeMailer);
}

function validateNMForReject(NodeMailer) {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    company: Joi.string().required(),
    policyholder: Joi.string().required(),
    nric: Joi.string()
      .min(9)
      .required()
      .pattern(/^[A-Z0-9]{9,9}$/),
    reject: Joi.string().required(),
  });
  return schema.validate(NodeMailer);
}

exports.NodeMailer = NodeMailer;
exports.validateNodeMailer = validateNodeMailer;
exports.validateNMForCompany = validateNMForCompany;
exports.validateNMForReject = validateNMForReject;
