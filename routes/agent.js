const express = require("express");
const router = express.Router();

const { Agent, validateAgent } = require("../models/agent");
const { Company } = require("../models/company");

// GET Request
router.get("/", async (req, res) => {
  const agent = await Agent.find().sort("name");
  res.send(agent);
});

// POST Request
router.post("/", async (req, res) => {
  const { error } = validateAgent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const email = await Agent.findOne({ email: req.body.email });
  if (email)
    return res
      .status(400)
      .send("The email address is already in use by another account.");

  const company = await Company.findById(req.body.companyId);
  if (!company) return res.status(400).send("Invalid CompanyId.");

  const agent = new Agent({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    mobile: req.body.mobile,
    company: req.body.companyId,
  });

  await agent.save();
  res.send(agent);
});

// PUT request
router.put("/:id", async (req, res) => {
  const { error } = validateAgent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const company = await Company.findById(req.body.companyId);
  if (!company) return res.status(400).send("Invalid CompanyId.");

  const agent = await Agent.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      mobile: req.body.mobile,
      company: req.body.companyId,
    },
    { new: true }
  );

  if (!agent)
    return res.status(404).send("404 Page Not Found. Agent Not Found.");
  res.send(agent);
});

// Delete request
router.delete("/:id", async (req, res) => {
  const agent = await Agent.findByIdAndRemove(req.params.id);

  if (!agent)
    return res.status(404).send("404 Page Not Found. Agent Not Found.");
  res.send(agent);
});

// GET ID Request
router.get("/:id", async (req, res) => {
  const agent = await Agent.findById(req.params.id).populate(
    "company policyholder"
  );

  if (!agent)
    return res.status(404).send("404 Page Not Found. Agent Not Found.");
  res.send(agent);
});

module.exports = router;
