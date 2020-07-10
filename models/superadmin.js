const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const superadminSchema = new mongoose.Schema({
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
  isSuperadmin: {
    type: Boolean,
    default: true,
  },
});

const Superadmin = mongoose.model("Superadmin", superadminSchema);

function validateSuperadamin(superadmin) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(superadmin);
}

exports.Superadmin = Superadmin;
exports.validateSuperadamin = validateSuperadamin;
