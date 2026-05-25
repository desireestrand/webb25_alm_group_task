require("../test-setup");
const User = require("../../src/models/User");

describe("User Model", () => {
  it("should create a user", async () => {
    const user = await User.create({
      username: "testuser",
      email: "test@test.com",
    });

    expect(user).toBeDefined();
    expect(user.username).toBe("testuser");
    expect(user.email).toBe("test@test.com");
  });

  it("should not allow duplicate emails", async () => {
    await User.create({
      username: "user1",
      email: "test@test.com",
    });

    await expect(
      User.create({
        username: "user2",
        email: "test@test.com",
      })
    ).rejects.toThrow();
  });

  it("should not allow duplicate usernames", async () => {
    await User.create({
      username: "testuser",
      email: "user1@test.com",
    });

    await expect(
      User.create({
        username: "testuser",
        email: "user2@test.com",
      })
    ).rejects.toThrow();
  });

  it("should not allow invalid email format", async () => {
    await expect(
      User.create({
       username: "bademail",
        email: "not-an-email",
     })
    ).rejects.toThrow();
  });

  it("should not allow invalid profile image URL", async () => {
    await expect(
      User.create({
        username: "badurl",
        email: "test@test.com",
        profilePhoto: "not-a-url",
     })
    ).rejects.toThrow();
  });
});


