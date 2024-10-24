const mongoose = require("mongoose");
const validator = require("validator");

const ProjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
    shortDescription: {
      type: String,
      required: true,
    },

    subTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    handOverDate: {
      type: Date,
    },

    location: {
      type: String,
    },
    category: {
      type: String,
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

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
