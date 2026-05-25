const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    postalCode: {
      type: String,
      required: [true, "Postal code is required"],
      trim: true,
    },
    rent: {
      type: Number,
      required: [true, "Rent is required"],
      min: [0, "Rent can't be a negative number"],
    },
    rooms: {
      type: Number,
      required: [true, "Rooms is required"],
      min: [1, "Rooms has to be more than 0"],
      max: [50, "Rooms can't be more than 50"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.Accommodation ||
  mongoose.model("Accommodation", accommodationSchema);
