# Project Week 10 (Antonio)

## Overview

We were tasked with creating a job search engine that could find jobs in a city a user was looking for. This app would require auto completing suggestions of city names. A public API for a job site is required to gather data.


## who are we building this app for? What are our goals and motivations?
TODO


# SERVER ARCHITECTURE 

## available endpoints

- get("/getJobsByCity?city=London")


## User Stories
TODO

## Technology Stack

### Server
The server is an express.js server which handles routes, middleware and external api calls. The server runs in Docker which is started through docker-compose which is discussed further in the readme.

### Client
The client is bootstraped from [Create React App](https://github.com/facebook/create-react-app) and is used to serve the UI and makes API calls to the server. The react app runs in Docker and is started through docker-compose which is discussed further in the readme.

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

## To run tests
cd into either `client` or `server` folder and run

### `npm test`

This launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

