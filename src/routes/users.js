// src/routes/users.js - User routes
const express = require("express");
const router = express.Router();

// In-memory database (for demo purposes)
let users = [
  { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
];

let nextId = 3;

// GET /api/users - Get all users
router.get("/", (req, res) => {
  res.json({
    success: true,
    data: users,
    count: users.length,
  });
});

// GET /api/users/:id - Get user by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }

  res.json({
    success: true,
    data: user,
  });
});

// POST /api/users - Create new user
router.post("/", (req, res) => {
  const { name, email, age } = req.body;

  // Basic validation
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: "Name and email are required",
    });
  }

  // Check if email already exists
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({
      success: false,
      error: "Email already exists",
    });
  }

  const newUser = {
    id: nextId++,
    name,
    email,
    age: age || null,
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    data: newUser,
    message: "User created successfully",
  });
});

// PUT /api/users/:id - Update user
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }

  const { name, email, age } = req.body;

  // Update user
  users[userIndex] = {
    ...users[userIndex],
    ...(name && { name }),
    ...(email && { email }),
    ...(age !== undefined && { age }),
  };

  res.json({
    success: true,
    data: users[userIndex],
    message: "User updated successfully",
  });
});

// DELETE /api/users/:id - Delete user
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }

  users.splice(userIndex, 1);

  res.json({
    success: true,
    message: "User deleted successfully",
  });
});

module.exports = router;
