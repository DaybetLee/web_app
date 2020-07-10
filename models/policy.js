const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const policySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  policyholder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Policyholder",
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  inforce: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Policy = mongoose.model("Policy", policySchema);

function validatePolicy(Policy) {
  const schema = Joi.object({
    name: Joi.string().required(),
    policyholderId: Joi.objectId().required(),
    companyId: Joi.objectId().required(),
    inforce: Joi.boolean(),
  });
  return schema.validate(Policy);
}

exports.Policy = Policy;
exports.validatePolicy = validatePolicy;
