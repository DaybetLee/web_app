const express = require("express");
const router = express.Router();

const { Policy, validatePolicy } = require("../models/policy");
const { Policyholder } = require("../models/policyholder");
const { Company } = require("../models/company");

// GET Request
router.get("/", async (req, res) => {
  const policy = await Policy.find()
    .sort("name")
    .populate("company policyholder");
  res.send(policy);
});

router.get("/param", async (req, res) => {
  const agent = await Policy.find({ policyholder: req.query.email })
    .sort("name")
    .populate();
  res.send(agent);
});

// GET ID Request
router.get("/:id", async (req, res) => {
  const policy = await Policy.findById(req.params.id).populate(
    "policyholder company"
  );

  res.send(policy);
});

// POST Request
router.post("/", async (req, res) => {
  const { error } = validatePolicy(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const policyholder = await Policyholder.findById(req.body.policyholderId);
  if (!policyholder) return res.status(400).send("Invalid PolicyholderId.");

  const company = await Company.findById(req.body.companyId);
  if (!company) return res.status(400).send("Invalid CompanyId.");

  let policy = new Policy({
    name: req.body.name,
    policyholder: req.body.policyholderId,
    company: req.body.companyId,
    amount: req.body.amount,
  });

  await policy.save();
  res.send(policy);

  addPolicyToPolicyholder(req.body.policyholderId, policy._id);
});

// PUT request
router.put("/:id", async (req, res) => {
  const { error } = validatePolicy(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const policholder = await Policyholder.findById(req.body.policyholderId);
  if (!policholder) return res.status(400).send("Invalid PolicyholderId.");

  const company = await Company.findById(req.body.companyId);
  if (!company) return res.status(400).send("Invalid CompanyId.");

  await Policyholder.findByIdAndUpdate(
    (await Policy.findById(req.params.id)).policyholder,
    {
      $pull: {
        policy: req.params.id,
      },
    }
  );

  const policy = await Policy.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      policyholder: req.body.policyholderId,
      company: req.body.companyId,
      inforce: req.body.inforce,
      amount: req.body.amount,
    },
    { new: true }
  );

  if (!policy)
    return res.status(404).send("404 Page Not Found. Policy Not Found.");
  res.send(policy);

  addPolicyToPolicyholder(req.body.policyholderId, policy._id);
});

// Delete request
router.delete("/:id", async (req, res) => {
  await Policyholder.findByIdAndUpdate(
    (await Policy.findById(req.params.id)).policyholder,
    {
      $pull: {
        policy: req.params.id,
      },
    }
  );

  const policy = await Policy.findByIdAndRemove(req.params.id);

  if (!policy)
    return res.status(404).send("404 Page Not Found. Policy Not Found.");
  res.send(policy);
});

// Local Function
async function addPolicyToPolicyholder(policyholderId, policyId) {
  await Policyholder.findByIdAndUpdate(policyholderId, {
    $push: {
      policy: policyId,
    },
  });
}

module.exports = router;
