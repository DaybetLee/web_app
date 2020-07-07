const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { date } = require("@hapi/joi");

const policySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  inforce: {
    type: Boolean,
    default: true,
  },
  policyholder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Policyholder",
  },

  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
});

const Policy = mongoose.model("Policy", policySchema);

function validatePolicy(Policy) {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    policyholderId: Joi.string().required(),
    companyId: Joi.string().required(),
    inforce: Joi.boolean(),
  });
  return schema.validate(Policy);
}

exports.Policy = Policy;
exports.validatePolicy = validatePolicy;
