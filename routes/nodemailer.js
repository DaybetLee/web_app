const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const {
  validateNodeMailer,
  validateNMForCompany,
  validateNMForReject,
} = require("../models/nodemailer");

router.post("/claimant", async (req, res) => {
  const { error } = validateNodeMailer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const output = `
  <p>Dear Claimant,</p>
 <p>As requested, following is the view request link for Mr/Ms ${req.body.policyholder}:</p>
 <p>${req.body.link}</P>
 <p>Kind regards,<br>IPM</p>
    `;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: `daybet.test@gmail.com`,
      pass: `Whatev3r!`,
    },
  });

  let info = await transporter.sendMail({
    from: '"IMP@example.com" <daybet.test@gmail.com>',
    to: `${req.body.email}`,
    subject: `Policy View Request for ${req.body.policyholder}`,
    text: "Policy View Request",
    html: output,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.send(output);
});

// Post request to Company
router.post("/company", async (req, res) => {
  const { error } = validateNMForCompany(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const output = `
  <p>Dear ${req.body.company} Admin,</p>
 <p>Please be informed that Mr/Ms ${req.body.policyholder} (${req.body.nric}) policies details has been forwarded to the claimant.</p>
 <p>Kind regards,<br>IPM</p>
    `;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: `daybet.test@gmail.com`,
      pass: `Whatev3r!`,
    },
  });

  let info = await transporter.sendMail({
    from: '"IMP@example.com" <daybet.test@gmail.com>',
    to: `${req.body.email}`,
    subject: `Notification on Policy View Request for ${req.body.policyholder}`,
    text: "Policy View Request",
    html: output,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.send(output);
});

// Post request to Company
router.post("/reject", async (req, res) => {
  const { error } = validateNMForReject(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const output = `
  <p>Dear ${req.body.company} Admin,</p>
 <p>Please be informed that Mr/Ms ${req.body.policyholder} (${req.body.nric}) had reject the approval for the agent to manage his/her policy.</p>
 <p>Reason: ${req.body.reject}</p>
 <p>Kind regards,<br>IPM</p>
    `;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: `daybet.test@gmail.com`,
      pass: `Whatev3r!`,
    },
  });

  let info = await transporter.sendMail({
    from: '"IMP@example.com" <daybet.test@gmail.com>',
    to: `${req.body.email}`,
    subject: `Notification on Policy View Request for ${req.body.policyholder}`,
    text: "Policy View Request",
    html: output,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.send(output);
});

module.exports = router;
