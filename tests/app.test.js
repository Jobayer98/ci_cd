// tests/app.test.js - Main API tests
const request = require("supertest");
const app = require("../src/app");

describe("REST API Tests", () => {
  // Test the main endpoint
  describe("GET /", () => {
    it("should return welcome message", async () => {
      const response = await request(app).get("/").expect(200);

      expect(response.body.message).toBe("Welcome to our REST API!");
      expect(response.body.version).toBe("1.0.0");
    });
  });

  // Test health endpoint
  describe("GET /health", () => {
    it("should return health status", async () => {
      const response = await request(app).get("/health").expect(200);

      expect(response.body.status).toBe("healthy");
      expect(response.body.timestamp).toBeDefined();
    });
  });

  // Test 404 handling
  describe("GET /nonexistent", () => {
    it("should return 404 for non-existent routes", async () => {
      const response = await request(app).get("/nonexistent").expect(404);

      expect(response.body.error).toBe("Route not found");
    });
  });
});
