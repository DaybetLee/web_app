const express = require("express");
const router = express.Router();

const authorization = require("../middleware/authorization");
const company_drop = require("../middleware/company_drop");
const agent_drop = require("../middleware/agent_drop");
const user_drop = require("../middleware/user_drop");
const superadmin_drop = require("../middleware/superadmin_drop");

const {
  Policyholder,
  validatePolicyholder,
} = require("../models/policyholder");
const { Agent } = require("../models/agent");

// GET Request
router.get("/", async (req, res) => {
  const policyholder = await Policyholder.find().sort("name").populate();
  res.send(policyholder);
});

router.get("/param", async (req, res) => {
  const agent = await Policyholder.find({
    $or: [{ agent: req.query.aid }, { email: req.query.email }],
  })
    .sort("name")
    .populate("policy company");
  res.send(agent);
});

// POST Request
router.post("/", async (req, res) => {
  const { error } = validatePolicyholder(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const agent = await Agent.findById(req.body.agentId);
  if (!agent) return res.status(400).send("Invalid AgentId.");

  const policyholder = new Policyholder({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    nric: req.body.nric,
    agent: req.body.agentId,
  });

  await policyholder.save();
  res.send(policyholder);

  addPolicyholderToAgent(req.body.agentId, policyholder._id);
});

// PUT request
router.put("/:id", async (req, res) => {
  const { error } = validatePolicyholder(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const agent = await Agent.findById(req.body.agentId);
  if (!agent) return res.status(400).send("Invalid AgentId.");

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
      email: req.body.email,
      mobile: req.body.mobile,
      nric: req.body.nric,
      agent: req.body.agentId,
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
    "policy"
  );

  if (!policyholder)
    return res.status(404).send("404 Page Not Found. Policyholder Not Found.");
  res.send(policyholder);
});

// Local Function
async function addPolicyholderToAgent(agentId, policyholderId) {
  await Agent.findByIdAndUpdate(agentId, {
    $push: {
      policyholder: policyholderId,
    },
  });
}

module.exports = router;
