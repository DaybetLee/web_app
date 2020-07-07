const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const {
  Policyholder,
  validatePolicyholder,
} = require("../models/policyholder");

const { Agent } = require("../models/agent");

// GET Request
router.get("/", async (req, res) => {
  const policyholder = await Policyholder.find().sort("name");
  res.send(policyholder);
});

// POST Request
router.post("/", async (req, res) => {
  const { error } = validatePolicyholder(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    await Agent.findById(req.body.agentId);
  } catch {
    return res.status(400).send("Invalid AgentId.");
  }

  let policyholder = new Policyholder({
    name: req.body.name,
    agent: req.body.agentId,
    email: req.body.email,
    nric: req.body.nric,
    mobile: req.body.mobile,
  });

  await policyholder.save();
  res.send(policyholder);

  addPolicyholderToAgent(req.body.agentId, policyholder._id);
});

// PUT request
router.put("/:id", async (req, res) => {
  const { error } = validatePolicyholder(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    await Agent.findById(req.body.agentId);
  } catch {
    return res.status(400).send("Invalid AgentId.");
  }

  await Agent.findByIdAndUpdate(
    (await Policyholder.findById(req.params.id)).agent,
    {
      $pull: {
        policyholder: req.params.id,
      },
    }
  );

  const policyholder = await Policyholder.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      agent: req.body.agentId,
      email: req.body.email,
      nric: req.body.nric,
      mobile: req.body.mobile,
    },
    { new: true }
  );

  if (!policyholder)
    return res.status(404).send("404 Page Not Found. Agent Not Found.");
  res.send(policyholder);

  addPolicyholderToAgent(req.body.agentId, policyholder._id);
});

// Delete request
router.delete("/:id", async (req, res) => {
  await Agent.findByIdAndUpdate(
    (await Policyholder.findById(req.params.id)).agent,
    {
      $pull: {
        policyholder: req.params.id,
      },
    }
  );

  const policyholder = await Policyholder.findByIdAndRemove(req.params.id);

  if (!policyholder)
    return res.status(404).send("404 Page Not Found. Policyholder Not Found.");
  res.send(policyholder);
});

// GET ID Request
router.get("/:id", async (req, res) => {
  const policyholder = await Policyholder.findById(req.params.id).populate(
    "agent"
  );

  if (!policyholder)
    return res.status(404).send("404 Page Not Found. Policyholder Not Found.");
  res.send(policyholder);
});

async function addPolicyholderToAgent(agentId, policyholderId) {
  await Agent.findByIdAndUpdate(agentId, {
    $push: {
      policyholder: policyholderId,
    },
  });
}

module.exports = router;
