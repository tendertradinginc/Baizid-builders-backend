const Service = require("../models/Service");

exports.createServiceDb = async (details) => {
  try {
    const result = await Service.create(details);
    return result;
  } catch (error) {
    throw new Error(`Failed to create service: ${error.message}`);
  }
};

exports.getAllServicesDashboardEdition = async (page, limit, search) => {
  try {
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
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const result = await Service.find(query)
      .sort({ name: "asc" })
      .limit(limitNumber)
      .skip((pageNumber - 1) * limitNumber);
    const total = await Service.countDocuments(query);
    const metadata = {
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    };
    return { result, metadata };
  } catch (error) {
    throw new Error(`Failed to get dashboard services: ${error.message}`);
  }
};

exports.getSingleServiceFromDb = async (id) => {
  try {
    const result = await Service.findOne({ _id: id });
    return result;
  } catch (error) {
    throw new Error(`Failed to get single service: ${error.message}`);
  }
};

exports.updateServiceFromDb = async (id, data) => {
  try {
    const result = await Service.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    return result;
  } catch (error) {
    throw new Error(`Failed to update service: ${error.message}`);
  }
};

exports.deleteServiceFromDb = async (id) => {
  try {
    const result = await Service.findByIdAndDelete(id);
    return result;
  } catch (error) {
    throw new Error(`Failed to delete service: ${error.message}`);
  }
};
