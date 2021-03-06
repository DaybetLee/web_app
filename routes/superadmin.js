const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const { Superadmin, validateSuperadamin } = require("../models/superadmin");

// GET Request
router.get("/", async (req, res) => {
  const superadmin = await Superadmin.find().sort("name");

  res.send(superadmin);
});

// GET ID Request
router.get("/:id", async (req, res) => {
  const superadamin = await Superadmin.findById(req.params.id);

  if (!superadamin)
    return res.status(404).send("404 Page Not Found. User Not Found.");
  res.send(superadamin);
});

// POST Request
router.post("/", async (req, res) => {
  const { error } = validateSuperadamin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const email = await Superadmin.findOne({ email: req.body.email });
  if (email)
    return res
      .status(400)
      .send("The email address is already in use by another account.");

  const superadmin = new Superadmin({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  superadmin.password = await bcrypt.hash(
    superadmin.password,
    await bcrypt.genSalt(10)
  );

  await superadmin.save();
  const token = superadmin.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(superadmin);
});

// PUT request
router.put("/:id", async (req, res) => {
  const { error } = validateSuperadamin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const password = await bcrypt.hash(
    req.body.password,
    await bcrypt.genSalt(10)
  );

  let superadmin = await Superadmin.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: password,
    },
    { new: true }
  );

  if (!superadmin)
    return res.status(404).send("404 Page Not Found. User Not Found.");

  res.send(superadmin);
});

// Delete request
router.delete("/:id", async (req, res) => {
  const superadmin = await Superadmin.findByIdAndRemove(req.params.id);

  if (!superadmin)
    return res.status(404).send("404 Page Not Found. User Not Found.");
  res.send(superadmin);
});

module.exports = router;
