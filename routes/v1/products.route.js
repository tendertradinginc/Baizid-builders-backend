const express = require("express");
const router = express.Router();
const productsController = require("../../controllers/products.controller");

router.route("/create").post(productsController.createProducts);

router.route("/").get(productsController.getAllProducts);

router
  .route("/:id")
  .get(productsController.getSingleProduct)
  .delete(productsController.deleteProducts)
  .put(productsController.updateProducts);

module.exports = router;
