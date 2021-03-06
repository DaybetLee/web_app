const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const { Company, validateCompany } = require("../models/company");

// GET Request
router.get("/", async (req, res) => {
  const company = await Company.find().sort("name");

  res.send(company);
});

router.get("/param", async (req, res) => {
  const company = await Company.find({ name: req.query.name }).sort("name");
  res.send(company);
});

// GET ID Request
router.get("/:id", async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company)
    return res.status(404).send("404 Page Not Found. Company Not Found.");
  res.send(company);
});

// POST Request
router.post("/", async (req, res) => {
  const { error } = validateCompany(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const email = await Company.findOne({ email: req.body.email });
  if (email)
    return res
      .status(400)
      .send("The email address is already in use by another account.");

  const company = new Company({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  company.password = await bcrypt.hash(
    company.password,
    await bcrypt.genSalt(10)
  );

  await company.save();
  const token = company.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(company);
});

// PUT request
router.put("/:id", async (req, res) => {
  const { error } = validateCompany(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const password = await bcrypt.hash(
    req.body.password,
    await bcrypt.genSalt(10)
  );

  const company = await Company.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, email: req.body.email, password: password },
    { new: true }
  );

  if (!company)
    return res.status(404).send("404 Page Not Found. Company Not Found.");
  res.send(company);
});

// Delete request
router.delete("/:id", async (req, res) => {
  const company = await Company.findByIdAndRemove(req.params.id);

  if (!company)
    return res.status(404).send("404 Page Not Found. Company Not Found.");
  res.send(company);
});

module.exports = router;
