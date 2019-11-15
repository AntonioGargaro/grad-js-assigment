# Project Week 10 (Antonio)

## Overview

We were tasked with creating a job search engine that could find jobs in a city a user was looking for. This app would require auto completing suggestions of city names. A public API for a job site is required to gather data.


## who are we building this app for? What are our goals and motivations?
This assignment is catered towards aspiring job applicants, who want to find out the latest relevant jobs in the area.


## To Run this App

To start this app, you first must clone this repo and cd into the project root.
Then, `cd server` to enter the server directory and create a `.env` file with `touch .env`, then open this file.

An environment variable `CLIENT_AUTH_KEY={AUTH_KEY}` must be added here with `{AUTH_KEY}` replaced by an api key retrieved from [reed's developer page](https://www.reed.co.uk/developers/jobseeker). Click the `Sign up for a reed.co.uk API Key` and follow the instructions for an API key.
You can now cd back to the project directory with `cd ..`.

In the project directory, you can run:

### `docker-compose -f docker-compose.yml up --build`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


# SERVER ARCHITECTURE 

## available endpoints

- get("/getJobsByCity?city=London")


## User Stories
As a USER
I want to SEARCH FOR JOBS AVAILABLE IN MY CITY
so that I CAN BROWSE AND APPLY FOR JOBS RELEVANT TO MY AREA.

AC:
* I can see a text box to enter my city.
* I can see an autocomplete dropdown of suggested cities when I am typing.
* If I enter an invalid city, I am prompted clearly how to correct my search input.
* I can see clearly how to submit my search.
* I can see clearly all the jobs available in my area.
* For each job I can see the job title and the company.
* For each job, there is a button that takes me to the original site where the job was listed. 


As a DEVELOPER
I need MY PROJECT TO HAVE ADEQUATE TEST COVERAGE 
so that I CAN CONFIRM THAT MY CODE WORKS AS EXPECTED.

AC
* Unit testing is in place for logic functions where possible
* Client-side has integration tests where needed to test behaviour of the application
* API calls are mocked on the front-end
* External API calls are mocked on the back-end
* My API endpoints are tested


As a DEVELOPER,
I want MY APP TO HAVE GOOD DOCUMENTATION,
so that MY APP CAN BE EASILY RUN AND TESTED BY OTHER DEVELOPERS.

AC
* The documentation describes the functionality of the app.
* The documentation includes installation instructions.
* The documentation lists any dependencies that need to be manually installed.
* The documentation describes how to run tests on the app.

## Technology Stack

### Server
The server is an express.js server which handles routes, middleware and external api calls. The server runs in Docker which is started through docker-compose which is discussed further in the readme.

Before running tests, make sure you have followed the `To Run this App` section of the README.
To check tests on the server, type `npm i && jest --coverage` in the server directory.

### Client
The client is bootstraped from [Create React App](https://github.com/facebook/create-react-app) and is used to serve the UI and makes API calls to the server. The react app runs in Docker and is started through docker-compose which is discussed further in the readme.


To check tests on the client, type `npm i && jest --coverage` in the client directory.
