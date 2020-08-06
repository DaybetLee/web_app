const express = require("express");
const router = express.Router();

const {
  Policyholder,
  validatePolicyholder,
  validateViewable,
  validateAgentId,
} = require("../models/policyholder");
const { Agent } = require("../models/agent");

// GET Request
router.get("/", async (req, res) => {
  const policyholder = await Policyholder.find().sort("name").populate("agent");
  res.send(policyholder);
});

router.get("/param", async (req, res) => {
  const agent = await Policyholder.find({
    $or: [
      { agent: req.query.aid },
      { email: req.query.email },
      { nric: req.query.nric },
    ],
  })
    .sort("name")
    .populate("policy company");
  res.send(agent);
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
  if (req.query.approve) {
    const { error } = validateViewable(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const policyholder = await Policyholder.findByIdAndUpdate(
      req.params.id,
      {
        viewable: req.body.viewable,
      },
      { new: true }
    );

    if (!policyholder)
      return res.status(404).send("404 Page Not Found. Agent Not Found.");
    res.send(policyholder);
  } else if (req.query.changeAgent) {
    const { error } = validateAgentId(req.body);
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
        agent: req.body.agentId,
        viewable: req.body.viewable,
      },
      { new: true }
    );

    if (!policyholder)
      return res.status(404).send("404 Page Not Found. Agent Not Found.");
    res.send(policyholder);

    addPolicyholderToAgent(req.body.agentId, policyholder._id);
  } else {
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
  }
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

// Local Function
async function addPolicyholderToAgent(agentId, policyholderId) {
  await Agent.findByIdAndUpdate(agentId, {
    $push: {
      policyholder: policyholderId,
    },
  });
}

module.exports = router;
