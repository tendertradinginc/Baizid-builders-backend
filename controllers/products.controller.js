const Product = require("../models/Product");
const {
  createProductsinDb,
  getAllProductsFromDb,
  deleteProductsinDb,
  updateProductsinDb,

} = require("../services/products.service");

//create
exports.createProducts = async (req, res) => {
  try {

    const getLast = await Product.find().sort({ _id: -1 }).limit(1);
    const lastid = getLast[0]?.id;
    let id;
    if (lastid) {
      id = parseInt(lastid) + 1;
    } else {
      id = 1001;
    }
    const data = { ...req.body, id };
  
    

    const result = await createProductsinDb(data);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//get
exports.getAllProducts = async (req, res) => {
  try {
    const { page, limit, search, category } = req.query;
    const result = await getAllProductsFromDb(page, limit, search, category);
    res.status(200).json({
      status: "success",
      message: "Successfully get ",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't  find ",
      error: error.message,
    });
  }
};

//delete
exports.deleteProducts = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteProductsinDb(id);

    res.status(200).json({
      status: "success",
      message: "Successfully deleted ",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't  find",
      error: error.message,
    });
  }
};

//update
exports.updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateProductsinDb(id, req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully Updated ",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't find",
      error: error.message,
    });
  }
};
