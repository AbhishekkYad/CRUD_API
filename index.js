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
// POST /tasks - Create task with validation
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    title: title.trim(),
    done: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id - Update task
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: `Task ${id} not found` });

  const { title, done } = req.body;
  if (title !== undefined) {
    if (title.trim() === "") return res.status(400).json({ error: "Title cannot be empty" });
    task.title = title.trim();
  }
  if (done !== undefined) task.done = Boolean(done);

  res.json(task);
});

// DELETE /tasks/:id - Delete task
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ error: `Task ${id} not found` });

  tasks.splice(index, 1);
  res.status(204).send();
});
