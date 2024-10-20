const Product = require("../models/Product");

exports.createProductsinDb = async (details) => {
  const result = await Product.create(details);
  return result;
};

exports.getAllProductsinDb = async (page, limit, search = "") => {
  const searchTerm =
    typeof search === "undefined" || search === null ? "" : search;
  const regexSearch = new RegExp(searchTerm, "i");

  let query = {};
  if (searchTerm) {
    query.$or = [
      { name: { $regex: regexSearch } },
      { shortDescription: { $regex: regexSearch } },
      { fullDescription: { $regex: regexSearch } },
    ];
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
