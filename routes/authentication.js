const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const { User } = require("../models/user");
const { Superadmin } = require("../models/superadmin");
const { Agent } = require("../models/agent");
const { Company } = require("../models/company");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  const superadmin = await Superadmin.findOne({ email: req.body.email });
  const agent = await Agent.findOne({ email: req.body.email });
  const company = await Company.findOne({ email: req.body.email });

  if (!(user || superadmin || agent || company))
    return res.status(400).send("Invalid email or password.");

  const role = [user, superadmin, agent, company];

  for (let i = 0; i < role.length; i++) {
    if (role[i] != null) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        role[i].password
      );
      if (!validPassword)
        return res.status(400).send("Invalid email or password.");

      const token = role[i].generateAuthToken();
      res.send(token);
    }
  }
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(req);
}

module.exports = router;
