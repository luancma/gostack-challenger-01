const express = require("express");

const server = express();

server.use(express.json());

//Initial value of projects
const projects = [];

// Routes
server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { title, id } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const projectId = projects.find(i => i.id === id);

  projects.splice(projectId, 1);

  return res.send();
});

server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(i => i.id == id);

  project.title = title;

  return res.json(project);
});

server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(i => i.id == id);

  project.tasks.push(title);

  return res.json(project);
});
server.listen(3333);
