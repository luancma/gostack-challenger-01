const express = require("express");

const server = express();

server.use(express.json());

// Request count
let countRequest = 0;
// Initial value of projects
const projects = [];

//Middleware to validate project
function validateProject(req, res, next) {
  const { id } = req.params;
  const project = projects.find(i => i.id == id);

  if (!project) {
    return res.status(400).json({ error: "Project not found" });
  }
  return next();
}

function countRequests(req, res, next) {
  countRequest++;

  console.log(`Number of requests: ${countRequest}`);

  return next();
}

// Count middleware

server.use(countRequests);

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

server.use(validateProject);

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const projectId = projects.find(i => i.id == id);

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
