# **e-Blog**

![e-Blog](https://github.com/michaeliyke/e-blog/blob/master/client/public/B.jpg)

## Overview

### **Where _Ideas_ Find _Words_**

e-Blog is a simple blogging platform that allows users to create and share their thoughts, ideas, and experiences with others. It provides a clean and user-freindly interface for users to write, edit, and publish their blog posts. Our platform aims to empower writers by offering them a space to freely ideas and connect with an audience.

## Prerequisites

- **Node.js**: v20.14.x or higher
- **npm**: v10.7.x or higher
- **MongoDB**: You can either use MongoDB Atlas (cloud) or install MongoDB locally

## Installation

```
git clone https://github.com/michaeliyke/e-blog.git
cd e-blog

```

### install Frontend dependencies:

```bash
cd client && npm install
```

### install Backend dependencies:

```bash
cd server && npm install
```

#### API Documentation: [README.md](https://github.com/michaeliyke/e-blog/blob/master/server/README.md)

#### Client Read me: [README.md](https://github.com/michaeliyke/e-blog/blob/master/client/README.md)

### Usage

```bash
cd client && npm run dev
```

```bash
cd server && npm run dev
```

## Features

- **User Authentication**: Users can create an account, login, and logout.
- **Create & Edit Posts**: Users can create, edit, and delete their blog posts.
- **Responsive Design**: Our platform is optimized for both desktop and mobile devices.
- **User Profile**: Users can view their profile, edit their profile information, and view their published posts.
- **Likes & Comments**: Users can like and comment on other users' posts.
- **Search & Filter**: Users can search for posts by title, author, or content, and filter posts by category.
- **Favorites**: Users can save their favorite posts for easy access.
- **Trending**: Users can view the most popular posts on the platform.

## Tech Stack

- Frontend: React, Redux, React Router, Tailwind CSS
- Backend: Node.js, Express.js, Mongoose
- Database: MongoDB (via MongoDB Atlas)
- Authentication: JWT (JSON Web Token) stored in cookies

## Environment Variables

- MONGO_URL="mongodb+srv://`username`:`password`@`cluster`.neuv1.mongodb.net/`database`?retryWrites=true&w=majority&appName=e-blog-db"
- IMGBB_KEY=`IMGBB_API_KEY`
- JWT_SECRET=`JWT SECRET KEY`

_get random secret for JWT_

```bash
openssl rand -hex 32
```

## Contributing

We welcome contributions! To get started:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit and push to your branch (`git push origin feature-branch`).
5. Open a pull request, and we will review your changes.

Please make sure your contributions follow our coding standards and pass all the tests.

## Authors

- [**Radouane Abounouas**](https://github.com/RadouaneAbn)
- [**Michael C Iyke**](https://github.com/michaeliyke)
- [**Cyril Ugwuoke**](https://github.com/chicyril)
