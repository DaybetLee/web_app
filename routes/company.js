const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const { Company, validateCompany } = require("../models/company");

// GET Request
router.get("/", async (req, res) => {
  const company = await Company
    .find
    //   {$or: [{ name: req.query.cn }, { _id: req.query.cid }],}
    ()
    .sort("name");

  res.send(company);
});

// POST Request
router.post("/", async (req, res) => {
  const { error } = validateCompany(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let company = new Company({ name: req.body.name });

  await company.save();
  res.send(company);
});

// PUT request
router.put("/:id", async (req, res) => {
  const { error } = validateCompany(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const company = await Company.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
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

// GET ID Request
router.get("/:id", async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company)
    return res.status(404).send("404 Page Not Found. Company Not Found.");
  res.send(company);
});

module.exports = router;
