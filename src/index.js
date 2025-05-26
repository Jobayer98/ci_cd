const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const todos = [];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required" });
  }
  const newTodo = { id: todos.length + 1, title, description };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));
  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }
  todos.splice(todoIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
