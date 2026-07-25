const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["GET /", "GET /health", "GET /tasks", "GET /tasks/:id", "POST /tasks", "PUT /tasks/:id", "DELETE /tasks/:id"],
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// In-memory task store
let tasks = [
  { id: 1, title: "Study Express", done: false },
  { id: 2, title: "Build CRUD API", done: false },
  { id: 3, title: "Push to GitHub", done: false },
];

// GET /tasks - List all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// GET /tasks/:id - Get single task by ID
app.get("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: `Task ${id} not found` });
  res.json(task);
});

