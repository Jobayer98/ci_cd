// tests/users.test.js - User API tests
const request = require("supertest");
const app = require("../src/app");

describe("Users API", () => {
  describe("GET /api/users", () => {
    it("should return all users", async () => {
      const response = await request(app).get("/api/users").expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.count).toBeGreaterThan(0);
    });
  });

  describe("GET /api/users/:id", () => {
    it("should return a specific user", async () => {
      const response = await request(app).get("/api/users/1").expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(1);
      expect(response.body.data.name).toBeDefined();
    });

    it("should return 404 for non-existent user", async () => {
      const response = await request(app).get("/api/users/999").expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("User not found");
    });
  });

  describe("POST /api/users", () => {
    it("should create a new user", async () => {
      const newUser = {
        name: "Test User",
        email: "test@example.com",
        age: 28,
      };

      const response = await request(app)
        .post("/api/users")
        .send(newUser)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(newUser.name);
      expect(response.body.data.email).toBe(newUser.email);
      expect(response.body.data.id).toBeDefined();
    });

    it("should return 400 for missing required fields", async () => {
      const invalidUser = {
        age: 25,
      };

      const response = await request(app)
        .post("/api/users")
        .send(invalidUser)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("Name and email are required");
    });

    it("should return 400 for duplicate email", async () => {
      const duplicateUser = {
        name: "Duplicate User",
        email: "john@example.com", // This email already exists
      };

      const response = await request(app)
        .post("/api/users")
        .send(duplicateUser)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("Email already exists");
    });
  });

  describe("PUT /api/users/:id", () => {
    it("should update an existing user", async () => {
      const updateData = {
        name: "Updated Name",
        age: 35,
      };

      const response = await request(app)
        .put("/api/users/1")
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(updateData.name);
      expect(response.body.data.age).toBe(updateData.age);
    });

    it("should return 404 for non-existent user", async () => {
      const response = await request(app)
        .put("/api/users/999")
        .send({ name: "Test" })
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("User not found");
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("should delete an existing user", async () => {
      const response = await request(app).delete("/api/users/2").expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("User deleted successfully");
    });

    it("should return 404 for non-existent user", async () => {
      const response = await request(app).delete("/api/users/999").expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("User not found");
    });
  });
});
