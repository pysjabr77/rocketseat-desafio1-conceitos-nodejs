const express = require("express");

const server = express();
server.use(express.json());

const projects = [];

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  projects.push({ id, title, tasks: [] });

  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.get("/projects/:id", (req, res) => {
  const { id } = req.params;

  const result = projects.filter(item => {
    return item.id == id;
  });

  return res.json(result);
});

server.put("/projects/:id", (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(item => {
    return item.id == id;
  });
  if (index < 0)
    return res.status(400).json({ error: `Project not found to id: ${id}` });

  const { title } = req.body;

  projects[index].title = title;

  return res.json(projects);
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(item => {
    return item.id == id;
  });
  if (index < 0)
    return res.status(400).json({ error: `Project not found to id: ${id}` });

  projects.splice(index, 1);

  return res.json(projects);
});

server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(item => {
    return item.id == id;
  });
  if (index < 0)
    return res.status(400).json({ error: `Project not found to id: ${id}` });

  const { title } = req.body;

  projects[index].tasks.push({ title });

  return res.json(projects);
});

server.listen(3000);
