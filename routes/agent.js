const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const {
  Agent,
  validateAgent,
  validateAgentWOpass,
} = require("../models/agent");
const { Company } = require("../models/company");

// GET Request
router.get("/", async (req, res) => {
  const agent = await Agent.find().sort("name").populate();

  res.send(agent);
});

router.get("/param", async (req, res) => {
  const agent = await Agent.find({ company: req.query.cid })
    .sort("name")
    .populate();
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

  agent.password = await bcrypt.hash(agent.password, await bcrypt.genSalt(10));

  await agent.save();
  const token = agent.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(agent);
});

// PUT request
router.put("/:id", async (req, res) => {
  if (req.query.resign) {
    const { error } = validateAgentWOpass(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const company = await Company.findById(req.body.companyId);
    if (!company) return res.status(400).send("Invalid CompanyId.");

    const agent = await Agent.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        company: req.body.companyId,
        active: req.body.active,
      },
      { new: true }
    );

    if (!agent)
      return res.status(404).send("404 Page Not Found. Agent Not Found.");
    res.send(agent);
  } else {
    const { error } = validateAgent(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const company = await Company.findById(req.body.companyId);
    if (!company) return res.status(400).send("Invalid CompanyId.");

    const password = await bcrypt.hash(
      req.body.password,
      await bcrypt.genSalt(10)
    );

    const agent = await Agent.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: password,
        company: req.body.companyId,
        active: req.body.active,
      },
      { new: true }
    );

    if (!agent)
      return res.status(404).send("404 Page Not Found. Agent Not Found.");
    res.send(agent);
  }
});

// Delete request
router.delete("/:id", async (req, res) => {
  const agent = await Agent.findByIdAndRemove(req.params.id);

  if (!agent)
    return res.status(404).send("404 Page Not Found. Agent Not Found.");
  res.send(agent);
});

module.exports = router;
