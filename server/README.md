## E-blog Backend
This is the backend server for the E-blog project, built with **Node.js**, **Express**, and **MongoDB**(using mongoose ODM). The backend manages API routes, user authentication, communication with the database/storage, and business logic.

## Table Of Content
- [**Installation**](#installation)
- [**Database**](#database)
- [**Image file server/storage**](#image-storage)
- [**Authentication**](#authentication)
- [**Environment Variable**](#environment-variables)
- [**Running The Server**](#running-the-server)
- [**Resource Routes**](#resource-routes)

## Installation
Follow this [***Installation Guide***](../README.md#installation) to completely setup the project. 

## Database
The backend uses **MongoDB** to store user and blog data. It uses **mongoose** ODM to map data/document to javascript objects. Ensure you have MongoDB installed and running on your system or use a service like MongoDB Atlas for cloud-based storage.

Make sure to provide the mongodb connection string in the **`.env`** file you create in the server directory. see [environmental variables](#environment-variables) section below.

## Image Storage
Check out [***imgbb***](https://imgbb.com/) to setup an account and get an api key

## Authentication
The backend uses JWT (JSON Web Token) for authentication.
Users must be authenticated to create, edit, delete or interract with blogs in other ways such as liking or commenting.
JWT tokens are generated upon successful login and are required for accessing protected routes.

## Environment Variables
You need to set up environment variables to configure the application. Create a **`.env`** file in the server directory of the project and add the following variables.  
***NOTE***: Replace the parts enclosed within `<>` **included**, with the correct values.

> **`HOST=<host.ip.address>`** - <mark>Optional</mark>. **localhost** is used by default.
>
> **`PORT=<port_number>`** - <mark>Optional</mark>. **3000** is used by default.
>
> **`MONGO_URL=<Your/mongodb/connection/string>`**
>
> **`IMGBB_KEY=<Your_imgbb_api_key>`**
>
> **`JWT_SECRET=<Your_jwt_secrete_for_authentication>`**


## Running the Server
To start the backend server locally after successfuly setting up the app and configuring it, use the following command:

> **`npm run dev`**. First, make sure you're in the server directory

The server will start on ***`http://localhost:300`*** by default.  
You can change the url by modifying the **HOST** and the **PORT** variable in your .env file.

## Resource Routes
Below are some of the important resource routes and http methods used with them.
- **`POST /auth/register`** - Sign up with firstname, lastname, email and password.
- **`POST /auth/login`** - Authenticate a user and generate a JWT token.
- **`POST /blogs/new`** - Create a new blog post <mark>(Authenticated users only)</mark>
- **`GET /blogs/page/1`** - Get page 1 of blog post.
- **`POST /blogs/:blogId/likes/`** - Like a blog post <mark>(Authenticated users only)</mark>
- **`POST /blogs/:blogId/comments`** - Comment on a blog post <mark>(Authenticated user only)</mark>
___
___
