const {
  createCategoriesDb,
  getSingleCategoryFromdb,
  UpdateCategoryFromdb,
  DeleteCategoryFromdb,
  getAllCategoriesDashboardEdition,
  getAllforProductCategoryFromDb,
} = require("../services/category.service");

exports.createCategories = async (req, res) => {
  try {
    const result = await createCategoriesDb(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully Create categories",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't  create categories",
      error: error.message,
    });
  }
};

exports.getAllCategoriesDashboard = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const { result, metadata } = await getAllCategoriesDashboardEdition(
      page,
      limit,
      search
    );

    res.status(200).json({
      status: "success",
      message: "Successfully retrieved categories",
      data: result,
      metadata,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't retrieve categories",
      error: error.message,
    });
  }
};

exports.getAllforProductCategory = async (req, res) => {
  try {
    const result = await getAllforProductCategoryFromDb();

    res.status(200).json({
      status: "success",
      message: "Successfully retrieved categories",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't retrieve categories",
      error: error.message,
    });
  }
};

exports.getSingleCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getSingleCategoryFromdb(id);

    res.status(200).json({
      status: "success",
      message: "Successfully gate categories",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't  gate categories",
      error: error.message,
    });
  }
};

exports.UpdateSingleCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await UpdateCategoryFromdb(id, req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully update categories",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't  update categories",
      error: error.message,
    });
  }
};

exports.DeleteSingleCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await DeleteCategoryFromdb(id);

    res.status(200).json({
      status: "success",
      message: "Successfully update categories",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't  update categories",
      error: error.message,
    });
  }
};
