const Categories = require("../models/Category");

// create single category
exports.createCategoriesDb = async (details) => {
  try {
    const result = await Categories.create(details);
    console.log("Category created successfully:", result);
    return result;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

// get all categories dashboard
exports.getAllCategoriesDashboardEdition = async (page, limit, search) => {
  try {
    const searchTerm = search || "";
    const regexSearch = new RegExp(searchTerm, "i");
    let query = {};
    if (searchTerm) {
      query.name = { $regex: regexSearch };
    }

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    const result = await Categories.find(query)
      .sort({ name: "asc" })
      .limit(limitNumber)
      .skip((pageNumber - 1) * limitNumber);

    const total = await Categories.countDocuments(query);

    const metadata = {
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    };
    

    return { result, metadata };
  } catch (error) {
    throw new Error(`Failed to get all categories: ${error.message}`);
  }
};

// get all categories
exports.getAllforProductCategoryFromDb = async () => {
  const total = await Categories.find({ featuredStatus: true });
  return total;
};

exports.getSingleCategoryFromdb = async (id) => {
  const result = await Categories.findOne({ _id: id });
  return result;
};

// get update categories
exports.UpdateCategoryFromdb = async (id, data) => {
  const result = await Categories.updateOne({ _id: id }, { $set: data });
  return result;
};

// get delete categories
exports.DeleteCategoryFromdb = async (id) => {
  const result = await Categories.deleteOne({ _id: id });
  return result;
};
