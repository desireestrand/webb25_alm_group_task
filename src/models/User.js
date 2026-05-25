const mongoose = require("mongoose");
const Accommodation = require("./Accommodation");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    // TODO: Add profileImage field
  },
  { timestamps: true },
);

userSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Accommodation.deleteMany({ userId: doc._id });
  }
});

module.exports = mongoose.model("User", userSchema);
