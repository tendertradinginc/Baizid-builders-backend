const {
  createProductsinDb,
  getAllProductsinDb,
  deleteProductsinDb,
  updateProductsinDb,
} = require("../services/products.service");

//create
exports.createProducts = async (req, res) => {
  try {
    const result = await createProductsinDb(req.body);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//get
exports.getAllProducts = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const result = await getAllProductsinDb(page, limit);
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
