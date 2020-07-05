const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const { Company, validateCompany } = require("../models/company");

router.use(express.json());

router.get("/", async (req, res) => {
  const company = await Company.find().sort("name");

  res.send(company);
});

router.post("/", async (req, res) => {
  const { error } = validateCompany(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let company = new Company({ name: req.body.name });

  await company.save();

  res.send(company);
});

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

router.delete("/:id", async (req, res) => {
  const company = await Company.findByIdAndRemove(req.params.id);
  if (!company)
    return res.status(404).send("404 Page Not Found. Company Not Found.");

  res.send(company);
});

router.get("/:id", async (req, res) => {
  const company = await Company.findById(req.params.id);
  if (!company)
    return res.status(404).send("404 Page Not Found. Company Not Found.");

  res.send(genre);
});

module.exports = router;
