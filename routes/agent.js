const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const { Agent, validateAgent } = require("../models/agent");

// GET Request
router.get("/", async (req, res) => {
  const agent = await Agent.find().sort("name");
  res.send(agent);
});

// POST Request
router.post("/", async (req, res) => {
  const { error } = validateAgent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let agent = new Agent({
    name: req.body.name,
    company: req.body.companyId,
    email: req.body.email,
    mobile: req.body.mobile,
  });

  await agent.save();
  res.send(agent);
});

// PUT request
router.put("/:id", async (req, res) => {
  const { error } = validateAgent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const agent = await Agent.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.namel,
      company: req.body.companyId,
      email: req.body.email,
      mobile: req.body.mobile,
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
