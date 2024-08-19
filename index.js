const express = require('express');
const app = express();
app.use(express.json());

let todos = [
  { id: 1, task: 'Buy groceries', completed: false },
  { id: 2, task: 'Read a book', completed: true },
  { id: 3, task: 'Go for a walk', completed: false },
]; // Predefined tasks

// Get all todos
app.get('https://apiinteg.onrender.com/todos', (req, res) => {
  res.json(todos);
});

// Get a single todo by ID
app.get('https://apiinteg.onrender.com/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('Todo not found');
  res.json(todo);
});

// Add a new todo
app.post('https://apiinteg.onrender.com/todos', (req, res) => {
  const todo = {
    id: todos.length + 1,
    task: req.body.task,
    completed: false,
  };
  todos.push(todo);
  res.status(201).json(todo);
});

// Update an existing todo
app.put('https://apiinteg.onrender.com/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('Todo not found');

  todo.task = req.body.task || todo.task;
  todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
  res.json(todo);
});

// Delete a todo
app.delete('https://apiinteg.onrender.com/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (todoIndex === -1) return res.status(404).send('Todo not found');

  todos.splice(todoIndex, 1);
  res.status(204).send();
});

// Start the server
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
