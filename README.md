<div align="center">

  <a href="https://tours-mada.deta.dev/">
    <img src="https://github.com/LucasAndria/tours-mada/blob/main/public/img/logo-green-round.png" alt="Tours Mada" width="200">
  </a>

  <h1>Tours Mada</h1>

</div>

<br />

# Table of Contents

- [About](#About-the-project)
- [Demo](#deployed)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Run It Locally](#run-locally)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Start Server](#start-server)
  - [Debug](#start-debugging-tool)

## About The Project

<div align="center"> 
  <img src="https://github.com/LucasAndria/Portfolio-NextJs/blob/main/public/assets/Projects/tours-mada/bg.JPG" alt="Tours Mada" />
</div>

<p>
  An awesome tour booking site built on top of <a href="https://nodejs.org/en/" target="_blank">NodeJS</a>.
  You can use it as an <a href="https://tours-mada.deta.dev/api/v1/tours/">API</a>.
  The API <a href="https://documenter.getpostman.com/view/20385594/2s8YmGW6hy">documentation</a> on POSTMAN.
</p>

## Deployed

Live demo (Feel free to visit) 👉 : https://tours-mada.deta.dev/

## Tech Stack

- [NodeJS](https://nodejs.org/en/) - JavaScript runtime environment.
- [Express](http://expressjs.com/) - Node framework.
- [Mongoose](https://mongoosejs.com/) - Object Data Modelling (ODM) Library used to interact with MongoDB.
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database service.
- [Pug](https://pugjs.org/api/getting-started.html) - High performance template engine.
- [JSON Web Token](https://jwt.io/) - Security token that is used for authentication.
- [ParcelJS](https://parceljs.org/) - Blazing fast, zero configuration web application bundler.
- [Postman](https://www.getpostman.com/) - API testing.
- [Sendinblue](https://fr.sendinblue.com/) - Email delivery platform.
- [Deta](https://www.deta.sh/) - Cloud platform.
- [Vercel](https://vercel.com/) - Serve static files.

## Features

- Authentification and Authorization
- Manage booking
- Check tours map
- Check user's reviews and rating
- Save and Update photo, username , email and password

## Run Locally

### Installation

Clone the project

```bash
  git clone https://github.com/LucasAndria/tours-mada.git
```

Go to the project directory

```bash
  cd tours-mada
```

Install dependencies

```bash
  npm install
```

### Environment Variables

To run this project, you will need to add the following environment variables to your config.env file

`NODE_ENV`

`PORT`

`DATABASE`

`DATABASE_PASSWORD`

`JWT_SECRET`

`JWT_EXPIRES_IN`

`JWT_COOKIE_EXPIRES_IN`

`EMAIL_USERNAME`

`EMAIL_PASSWORD`

`EMAIL_HOST`

`EMAIL_PORT`

`EMAIL_FROM`

`SENDINGBLUE_USERNAME`

`SENDINGBLUE_PASSWORD`

`SENDINGBLUE_HOST`

`SENDINGBLUE_PORT`

`STATIC_FILE_SERVER`

### Start Server

Production server

```bash
  npm start
```

Development Server

```bash
  npm run watch:js
  npm run start:dev
```

### Start Debugging Tool

```bash
  npm run debug
```
