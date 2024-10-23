const mongoose = require("mongoose");
const validator = require("validator");

const ServiceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
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
    category: {
      type: String,
    },

    shortDescription: {
      type: String,
    },
    highlightDescription: {
      type: String,
    },
    fullDescription: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    subtitleDescription: {
      type: String,
    },
    featuredStatus: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", ServiceSchema);
module.exports = Service;
