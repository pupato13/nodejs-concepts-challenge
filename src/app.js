const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
const errors = [];

function isIdValid(request, response, next) {
	const { id } = request.params;

	if (!isUuid(id)) {
		//return notifyError(response, "Repo Id is invalid!");
		return response.status(400).json({ error: "Repo Id is invalid!" });
	}

	return next();
}

app.use("/repositories/:id", isIdValid);

app.get("/repositories", (request, response) => {
	if (repositories.length === 0) {
		// return customResponse(
		// 	response,
		// 	"No data available in repositories! You can starting adding a new Repo!",
		// 	200
		// );
		return response.json(
			"No data available in repositories! You can starting adding a new Repo!"
		);
	}

	let { title, tech } = request.query;

	let results = filterRepositoriesByTitle(title);

	if (tech) {
		results = filterRepositoriesByTech(results, tech);
	}

	// Add Sort by Title or Likes, Order by ASC or DESC

	// Add Pagination

	//return customResponse(response, results, 200);
	return response.json(results);
});

const filterRepositoriesByTitle = (title) => {
	let results = title
		? repositories.filter((repo) =>
				repo.title.toLowerCase().includes(title.toLowerCase())
		  )
		: repositories;

	return results;
};

const filterRepositoriesByTech = (results, tech) => {
	results = results.filter((repo) => {
		let techsLowerCase = repo.techs.map((tech) => tech.toLowerCase());

		let found = techsLowerCase.some((techItem) =>
			techItem.includes(tech.toLowerCase())
		);

		if (found) {
			return repo;
		}
	});

	return results;
};

app.post("/repositories", (request, response) => {
	let { title, url, techs } = request.body;

	// TODO
	// Check if title or url exists

	let repo = {
		id: uuid(),
		title,
		url,
		techs,
		likes: 0,
	};

	repositories.push(repo);

	//return customResponse(response, repo, 201);
	return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
	let { id } = request.params;
	let { title, url, techs } = request.body;

	let repoIndex = repositories.findIndex((repo) => repo.id === id);

	if (repoIndex < 0) {
		//return notifyError(response, "Repo not found!");
		return response.status(400).json({ error: "Repo not found" });
	}

	let repo = getRepo(repoIndex);

	//updateRepo(repo, title, url, techs);
	repo = {
		...repo,
		title,
		url,
		techs,
	};

	repositories[repoIndex] = repo;

	//return customResponse(response, repo, 200);
	return response.json(repo);
});

app.delete("/repositories/:id", (request, response) => {
	let { id } = request.params;

	let repoIndex = repositories.findIndex((repo) => repo.id === id);

	if (repoIndex < 0) {
		//return notifyError(response, "Repo not found!");

		return response.status(400).json({ error: "Repo not found" });
	}

	deleteRepo(repoIndex);

	//return customResponse(response, "Repo deleted!", 200);
	return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
	let { id } = request.params;

	let repoIndex = repositories.findIndex((repo) => repo.id === id);

	if (repoIndex < 0) {
		//return notifyError(response, "Repo not found!");
		return response.status(400).json({ error: "Repo not found" });
	}

	let repo = getRepo(repoIndex);

	addLikeRepo(repo);

	repositories[repoIndex] = repo;

	//return customResponse(response, repo, 201);
	return response.json(repo);
});

const addLikeRepo = (repo) => repo.likes++;

const getRepo = (repoIndex) => ({ ...repositories[repoIndex] });

const updateRepo = (repo, title, url, techs) => {
	console.log(repo);

	repo = {
		...repo,
		title,
		url,
		techs,
	};

	console.log(repo);
};

const deleteRepo = (repoIndex) => {
	repositories.splice(repoIndex, 1);
};

const customResponse = (response, data, statusCode, success = true) => {
	let customResponse = {
		success: success,
		data: data,
		errors: [...errors],
	};

	if (success) {
		delete customResponse.errors;
	} else {
		delete customResponse.data;
	}

	clearErrors();

	return response.status(statusCode).json(customResponse);
};

const notifyError = (response, errorMessage) => {
	addError(errorMessage);

	return customResponse(response, null, 400, false);
};

const addError = (errorMessage) => {
	if (errorMessage) {
		errors.push(errorMessage);
	}
};

const clearErrors = () => (errors.length = []);

module.exports = app;
