const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const userSchema = new mongoose.Schema({
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
  isUser: {
    type: Boolean,
    default: true,
  },
});

const User = mongoose.model("User", userSchema);

function validateUser(User) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(User);
}

exports.User = User;
exports.validateUser = validateUser;
