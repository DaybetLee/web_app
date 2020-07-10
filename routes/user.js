const express = require("express");
const router = express.Router();

const { User, validateUser } = require("../models/user");

// GET Request
router.get("/", async (req, res) => {
  const user = await User.find().sort("name");

  res.send(user);
});

// POST Request
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const email = await User.findOne({ email: req.body.email });
  if (email)
    return res
      .status(400)
      .send("The email address is already in use by another account.");

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  await user.save();
  res.send(user);
});

// PUT request
router.put("/:id", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
    { new: true }
  );

  if (!user) return res.status(404).send("404 Page Not Found. User Not Found.");
  res.send(user);
});

// Delete request
router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) return res.status(404).send("404 Page Not Found. User Not Found.");
  res.send(user);
});

// GET ID Request
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).send("404 Page Not Found. User Not Found.");
  res.send(user);
});

module.exports = router;
