require("../../test-setup");
const { describe, it, expect } = require("vitest");
const User = require("../../src/models/User");
const Accommodation = require("../../src/models/Accommodation");

describe("Cascade Delete", () => {
  it("should delete accommodations when user is deleted", async () => {
    const user = await User.create({
      username: "testuser",
      email: "test@test.com",
    });

    await Accommodation.create({
      address: "Testgatan 1",
      city: "Stockholm",
      country: "Sweden",
      postalCode: "12345",
      rent: 5000,
      rooms: 2,
      userId: user._id,
    });

    await User.findOneAndDelete({ _id: user._id });

    const accommodations = await Accommodation.find({ userId: user._id });
    expect(accommodations).toHaveLength(0);
  });
});
