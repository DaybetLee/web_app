const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const agentSchema = new mongoose.Schema({
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
  policyholder: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Policyholder",
    },
  ],
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
});

const Agent = mongoose.model("Agent", agentSchema);

function validateAgent(Agent) {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    companyId: Joi.objectId().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    mobile: Joi.number().min(8).required(),
  });
  return schema.validate(Agent);
}

exports.Agent = Agent;
exports.validateAgent = validateAgent;
