const express = require("express");
const router = express.Router();
const categoriesController = require("../../controllers/category.controller");

router.route("/").post(categoriesController.createCategories);

// get all for dashbaord
router
  .route("/get-all-dashboard-edition")
  .get(categoriesController.getAllCategoriesDashboard);

// get all for product category for dashboard
router
  .route("/product-category")
  .get(categoriesController.getAllforProductCategory);

router
  .route("/:id")
  .get(categoriesController.getSingleCategory)
  .put(categoriesController.UpdateSingleCategory)
  .delete(categoriesController.DeleteSingleCategory);

module.exports = router;
