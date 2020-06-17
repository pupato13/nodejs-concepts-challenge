# NodeJS Concepts Challenge

## :dart: The Challenge

An application to storage repositories of your portfolio that will allow you to list, update and delete repositories, and besides that, the repositories can also receive likes.

## Routes

-   **`POST /repositories`**: The route must receive `title`, `URL`, and `techs` inside of the request body. The URL must be the link to the Github of that repository. When registering a new project, it must be stored inside an object in the following format: `{id:" uuid ", title: 'Desafio Node.js', URL: 'http: //github.com / ...' , techs: ["Node.js", "..."], likes: 0}`; Make sure the ID is a UUID, and always start likes as 0.

-   **`GET /repositories`**: The route that lists all repositories;

-   **`PUT /repositories/:id`**: The route should only change the `title`, `URL` and `techs` of the repository that has the`id` equal to the `id` present in the route parameters;

-   **`DELETE /repositories/:id`**: The route must delete a repository with the `id` present in the route parameters;

-   **`POST /repositories/:id/like`**: The route must increase the number of likes from the specific repository chosen through the `id` param present in the route parameters, at each call of this route, the number of likes must be increased by 1;

## Tests

For this challenge we have the following tests:

-   **`should be able to create a new repository`**: In order for this test to pass, your application must allow a repository to be created, and return a JSON with the created project.

-   **`should be able to list the repositories`**: In order for this test to pass, your application must return an array with all the repositories that have been created so far.

-   **`should be able to update repository`**: In order for this test to pass, your application must allow only the `url`,`title` and `techs` fields to be changed.

-   **`should not be able to update a repository that does not exist`**: In order for this test to pass, you must validate in your update route whether the repository id sent by the URL exists or not. If not, return an error with status `400`.

-   **`should not be able to update repository likes manually`**: In order for this test to pass, you must not allow your update route to directly change the likes of that repository, maintaining the same number of likes that the repository already had before the update. That's because the only place that should update this information is the route responsible for increasing the number of likes.

-   **`should be able to delete the repository`**: In order for this test to pass, you must allow your delete route to delete a project, and when deleted, it must return an empty response, with status `204`.

-   **`should not be able to delete a repository that does not exist`**: In order for this test to pass, you must validate in your delete route whether the repository id sent by the URL exists or not. If not, return an error with status `400`.

-   **`should be able to give a like to the repository`**: In order for this test to pass, your application must allow a repository with the given id to receive likes. The value of likes must be increased by 1 for each request, and as the result, return a JSON containing the repository with the number of likes updated.

-   **`should not be able to like a repository that does not exist`**: In order for this test to pass, you must validate in your like route whether the repository id sent by the URL exists or not. If not, return an error with status `400`.

# :rocket: Releasing the Kraken

## Requirements

You will only need Node.js and a node global package, Yarn, installed in your environment.

### Node

-   #### Node installation on Windows

    Just go on [official Node.js website](https://nodejs.org/) and download the installer.
    Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

-   #### Node installation on Ubuntu

    You can install nodejs and npm easily with apt install, just run the following commands.

        $ sudo apt install nodejs
        $ sudo apt install npm

-   #### Other Operating Systems
    You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node -v
    v12.18.0

    $ npm -v
    6.13.7

###

### Yarn installation

After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

## :computer: Install

    $ git clone https://github.com/pupato13/nodejs-concepts-challenge.git
    $ cd nodejs-concepts-challenge
    $ yarn install

## :checkered_flag: Running the project

    $ yarn dev

Access: [localhost:3333](http://localhost:3333/repositories)

PS: To run all routes, you will need to install an API testing tool. Below are two that I use to work with:
[Insomnia](https://insomnia.rest/)
[Postman](https://www.postman.com/)

## :white_check_mark: Running tests

    $ yarn test
