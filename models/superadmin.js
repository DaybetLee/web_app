const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

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

superadminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isSuperadmin: this.isSuperadmin },
    "jwtPrivateKey" // config.get("jwtPrivateKey")
  );
  return token;
};

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
