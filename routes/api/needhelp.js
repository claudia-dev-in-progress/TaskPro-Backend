const express = require("express");
const { auth } = require("../../midlewares/auth_midleware");
const { sendHelpEmail } = require("../../email/email_sender");
const router = express.Router();

router.post("help", auth, async (req, res, next) => {
  const { email, comment } = req.body;
  await sendHelpEmail(email, comment);

  return res.status(200).json();
});
module.exports = router;
