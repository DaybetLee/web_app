const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

const agentSchema = new mongoose.Schema({
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
  mobile: {
    type: Number,
    required: true,
    minlength: 8,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  policyholder: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Policyholder",
    },
  ],
  isAgent: {
    type: Boolean,
    default: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

agentSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      company: this.company,
      isAgent: this.isAgent,
    },
    "jwtPrivateKey" // config.get("jwtPrivateKey")
  );
  return token;
};

const Agent = mongoose.model("Agent", agentSchema);

function validateAgent(Agent) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().min(5).required(),
    mobile: Joi.number().min(8).required(),
    companyId: Joi.objectId().required(),
    active: Joi.boolean(),
  });
  return schema.validate(Agent);
}

function validateAgentWOpass(Agent) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    mobile: Joi.number().min(8).required(),
    companyId: Joi.objectId().required(),
    active: Joi.boolean(),
  });
  return schema.validate(Agent);
}

exports.Agent = Agent;
exports.validateAgent = validateAgent;
exports.validateAgentWOpass = validateAgentWOpass;
