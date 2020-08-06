const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const referenceSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
});

const Reference = mongoose.model("Reference", referenceSchema);

function validateReference(Reference) {
  const schema = Joi.object({
    message: Joi.string().required(),
  });
  return schema.validate(Reference);
}

exports.Reference = Reference;
exports.validateReference = validateReference;
