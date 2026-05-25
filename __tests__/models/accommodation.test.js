require("../test-setup.js");
const { describe, it, expect } = require("vitest");
const mongoose = require("mongoose");
const Accommodation = require("../../src/models/Accommodation.js");
const User = require("../../src/models/User.js");

describe("Accommodation Model", () => {
  it("creates a valid accommodation", async () => {
    const user = await User.create({
      username: "testuser",
      email: "test@test.com",
    });

    const accommodation = await Accommodation.create({
      address: "Storgatan 1",
      city: "Stockholm",
      country: "Sweden",
      postalCode: "12345",
      rent: 10000,
      rooms: 2,
      userId: user._id,
    });

    expect(accommodation).toBeDefined();
    expect(accommodation.address).toBe("Storgatan 1");
    expect(accommodation.userId.toString()).toBe(user._id.toString());
  });

  it("fails validation when address is missing", () => {
    const accommodation = new Accommodation({
      city: "Stockholm",
      country: "Sweden",
      postalCode: "12345",
      rent: 10000,
      rooms: 2,
      userId: new mongoose.Types.ObjectId(),
    });
    const error = accommodation.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.address).toBeDefined();
    expect(error.errors.address.message).toBe("Address is required");
  });

  it("fails validation when city is missing", () => {
    const accommodation = new Accommodation({
      address: "Storgatan 1",
      country: "Sweden",
      postalCode: "12345",
      rent: 10000,
      rooms: 2,
      userId: new mongoose.Types.ObjectId(),
    });
    const error = accommodation.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.city).toBeDefined();
    expect(error.errors.city.message).toBe("City is required");
  });

  it("fails validation when rent is negative", () => {
    const accommodation = new Accommodation({
      address: "Storgatan 1",
      city: "Stockholm",
      country: "Sweden",
      postalCode: "12345",
      rent: -500,
      rooms: 2,
      userId: new mongoose.Types.ObjectId(),
    });
    const error = accommodation.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.rent).toBeDefined();
    expect(error.errors.rent.message).toBe("Rent can't be a negative number");
  });

  it("fails validation when rooms is 0", () => {
    const accommodation = new Accommodation({
      address: "Storgatan 1",
      city: "Stockholm",
      country: "Sweden",
      postalCode: "12345",
      rent: 10000,
      rooms: 0,
      userId: new mongoose.Types.ObjectId(),
    });
    const error = accommodation.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.rooms).toBeDefined();
    expect(error.errors.rooms.message).toBe("Rooms has to be more than 0");
  });

  it("fails validation when rooms > 50", () => {
    const accommodation = new Accommodation({
      address: "Storgatan 1",
      city: "Stockholm",
      country: "Sweden",
      postalCode: "12345",
      rent: 10000,
      rooms: 51,
      userId: new mongoose.Types.ObjectId(),
    });
    const error = accommodation.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.rooms).toBeDefined();
    expect(error.errors.rooms.message).toBe("Rooms can't be more than 50");
  });

  it("fails validation when userId is missing", () => {
    const accommodation = new Accommodation({
      address: "Storgatan 1",
      city: "Stockholm",
      country: "Sweden",
      postalCode: "12345",
      rent: 10000,
      rooms: 2,
    });
    const error = accommodation.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.userId).toBeDefined();
    expect(error.errors.userId.message).toBe("User ID is required");
  });
});
