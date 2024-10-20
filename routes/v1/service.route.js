const express = require("express");
const router = express.Router();
const servicesController = require("../../controllers/service.controller");

router
  .route("/")
  .get(servicesController.getAllServices)
  .post(servicesController.createService); // create service

router
  .route("/get-all-dashboard-edition")
  .get(servicesController.getAllServicesDashboard); // get all for dashboard

router
  .route("/category-wise")
  .get(servicesController.getAllServicesCategoryWise);

router.route("/toggle-featured").get(servicesController.toggleServiceFeatured);

router
  .route("/:id")
  .get(servicesController.getSingleService)
  .put(servicesController.updateSingleService)
  .delete(servicesController.deleteSingleService);

module.exports = router;
