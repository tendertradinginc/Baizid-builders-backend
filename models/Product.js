const mongoose = require("mongoose");
const validator = require("validator");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    model: {
      type: String,
    },
    id: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    brand: {
      type: String,
    },
    image: [
      {
        type: String,
        validate: {
          validator: (value) =>
            validator.isURL(value, {
              protocols: ["http", "https"],
              require_tld: true,
              require_protocol: true,
            }),

          message: "Invalid image URL",
        },
        required: true,
      },
    ],
    warranty: {
      type: String,
    },
    manufacture: {
      type: String,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    fullDescription: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
