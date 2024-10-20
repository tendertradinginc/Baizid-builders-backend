const express = require("express");
const contactUsController = require("../../controllers/message.controller");
const router = express.Router();

router
  .route("/")
  .post(contactUsController.postContactUsMsg)
  .get(contactUsController.getAllContactUsMsg);

router
  .route("/:id")
  .patch(contactUsController.updateMsgStatus)
  .delete(contactUsController.deleteContactUsMsg);

module.exports = router;
