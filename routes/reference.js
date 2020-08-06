const express = require("express");
const router = express.Router();
const { Reference, validateReference } = require("../models/reference");

// POST Request
router.post("/", async (req, res) => {
  const { error } = validateReference(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let reference = new Reference({
    message: req.body.message,
  });

  await reference.save();
  res.send(reference._id);
});

router.get("/:id", async (req, res) => {
  const reference = await Reference.findById(req.params.id);
  res.send(reference.message);
});

module.exports = router;
