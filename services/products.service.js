const Product = require("../models/Product");

exports.createProductsinDb = async (data) => {
  const result = await Product.create(data);
  return result;
};

exports.getAllProductsFromDb = async (page, limit, search = "", category) => {
  const searchTerm = search == "undefined" ? "" : search;
  const categoryTerm = category == "undefined" ? "" : category;
  const regexSearch = new RegExp(searchTerm, "i");

  let query = {};
  if (searchTerm) {
    query.$or = [
      { name: { $regex: regexSearch } },
      { model: { $regex: regexSearch } },
      { brand: { $regex: regexSearch } },
    ];
  }

   
   if (categoryTerm) {
    query.category = categoryTerm; 
  }

  const result = await Product.find(query)
    .sort({ name: "asc" })
    .limit(parseInt(limit))
    .skip((parseInt(page) - 1) * parseInt(limit));

  const total = await Product.countDocuments(query);

  return { result, total };
};

exports.deleteProductsinDb = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

exports.updateProductsinDb = async (id, data) => {
  const result = await Product.updateOne({ _id: id }, { $set: data });
  return result;
};
