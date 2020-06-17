const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
    if (repositories.length === 0) {
        return response.json(
            "No data available in repositories! You can starting adding a new Repo!"
        );
    }

    let { title, tech } = request.query;

    let results = title
        ? repositories.filter((repo) =>
              repo.title.toLowerCase().includes(title.toLowerCase())
          )
        : repositories;

    // TODO: Filter Techs using array of strings
    // results = tech
    //     ? repositories.filter((repo) =>
    //           repo.title.toLowerCase().includes(tech.toLowerCase())
    //       )
    //     : repositories;

    // Add Sort by Title or Likes, Order by ASC or DESC

    return response.json(results);
});

app.post("/repositories", (request, response) => {
    let { title, url, techs } = request.body;

    let repo = {
        id: uuid(),
        title,
        url,
        techs,
        likes: 0,
    };

    repositories.push(repo);

    return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
    // TODO
});

app.delete("/repositories/:id", (request, response) => {
    // TODO
});

app.post("/repositories/:id/like", (request, response) => {
    let { id } = request.params;

    let repoIndex = repositories.findIndex((repo) => repo.id === id);

    if (repoIndex < 0) {
        return response.status(400).json({ error: "Repo not found!" });
    }

    let repo = { ...repositories[repoIndex] };

    console.log(repo);

    repo.likes++;

    repositories[repoIndex] = repo;

    console.log(repo);

    return response.json(repo);
});

module.exports = app;
