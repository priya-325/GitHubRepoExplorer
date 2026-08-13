# GitHub Repo Explorer

A fullstack TypeScript application that allows users to search GitHub repositories by username and save their favorite repositories to their account.

## Live Demo

### Frontend

https://github-repo-explorer-by-priyanka.vercel.app

### Backend

https://githubrepoexplorer-q036.onrender.com

---

## Features

- Search public GitHub repositories by username
- Display repository information:
  - Repository name
  - Description
  - Language
  - Star count
  - GitHub repository link

- User registration
- User login
- JWT-based authentication
- Password hashing using bcrypt
- Save repositories as favorites
- View saved repositories
- Remove repositories from favorites
- Protected favorites page
- Loading states
- Error handling
- Responsive UI using Tailwind CSS

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack React Query
- Axios

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt

### Database

- Supabase PostgreSQL

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: Supabase

---

## Project Structure

```text
GitHubRepoExplorer/
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── RepoCard.tsx
│   │   │
│   │   ├── context/
│   │   │   ├── auth-context.ts
│   │   │   └── AuthContext.tsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   │
│   │   ├── pages/
│   │   │   ├── Explore.tsx
│   │   │   ├── Favorites.tsx
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   └── github.ts
│   │   │
│   │   ├── types/
│   │   │   ├── favorite.ts
│   │   │   └── repo.ts
│   │   │
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   │
│   ├── .env.example
│   ├── package.json
│   └── vite.config.ts
│
├── BackEnd/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── prisma.ts
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   └── favorite.controller.ts
│   │   │
│   │   ├── middleware/
│   │   │   └── auth.middleware.ts
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   └── favorite.routes.ts
│   │   │
│   │   ├── utils/
│   │   │   └── generateToken.ts
│   │   │
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── .env.example
│   ├── package.json
│   ├── prisma.config.ts
│   └── tsconfig.json
│
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js 18 or later
- npm
- Git

You will also need a PostgreSQL database. This project uses Supabase PostgreSQL.

---

## Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd GitHubRepoExplorer
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with the actual URL of this repository.

---

# Backend Setup

Move into the backend directory:

```bash
cd BackEnd
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `BackEnd` directory.

```env
PORT=8000

JWT_SECRET=your_jwt_secret

DATABASE_URL=your_supabase_database_url

DIRECT_URL=your_supabase_direct_url

FRONTEND_URL=http://localhost:5173

PREVIEW_URL=http://localhost:4173
```

Do not commit the `.env` file.

---

## Prisma Setup

Generate Prisma Client:

```bash
npx prisma generate
```

Apply the database migrations:

```bash
npx prisma migrate dev
```

Optional: open Prisma Studio to inspect the database:

```bash
npx prisma studio
```

---

## Start the Backend

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:8000
```

You can verify that the API is running by opening:

```text
http://localhost:8000
```

Expected response:

```json
{
  "message": "GitHub Repo Explorer API is running"
}
```

---

# Frontend Setup

Open another terminal and move into the frontend directory:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `Frontend` directory.

```env
VITE_API_URL=http://localhost:8000
```

Start the frontend:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

---

# API Endpoints

## Authentication

### Register User

```http
POST /auth/register
```

Example request body:

```json
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

Example response:

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

---

### Login User

```http
POST /auth/login
```

Example request body:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Example response:

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN",
  "user": {
    "id": 1,
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

---

# Favorites API

All favorite routes require a valid JWT.

Send the token using the Authorization header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Get User Favorites

```http
GET /user/favorites
```

Example response:

```json
{
  "favorites": [
    {
      "id": 1,
      "githubRepoId": 2325298,
      "name": "linux",
      "description": "Linux kernel source tree",
      "htmlUrl": "https://github.com/torvalds/linux",
      "language": "C",
      "stars": 200000,
      "owner": "torvalds",
      "userId": 1,
      "createdAt": "2026-08-13T00:00:00.000Z"
    }
  ]
}
```

---

## Save Favorite Repository

```http
POST /user/favorites
```

Example request body:

```json
{
  "githubRepoId": 2325298,
  "name": "linux",
  "description": "Linux kernel source tree",
  "htmlUrl": "https://github.com/torvalds/linux",
  "language": "C",
  "stars": 200000,
  "owner": "torvalds"
}
```

A user cannot save the same GitHub repository more than once.

---

## Delete Favorite Repository

```http
DELETE /user/favorites/:id
```

Example:

```http
DELETE /user/favorites/1
```

---

# GitHub API

Repository searches use GitHub's public API.

```http
GET https://api.github.com/users/{username}/repos
```

For example:

```http
GET https://api.github.com/users/torvalds/repos
```

The frontend fetches public repository information directly from GitHub.

When a logged-in user clicks **Save**, the selected repository is sent to the backend and stored in PostgreSQL.

---

# Authentication Flow

The authentication flow works as follows:

1. The user creates an account.
2. The backend hashes the password using bcrypt.
3. The hashed password is stored in PostgreSQL.
4. The user logs in using email and password.
5. The backend compares the submitted password with the stored hash.
6. If the credentials are valid, the backend generates a JWT.
7. The frontend stores the JWT.
8. Axios automatically attaches the token to protected API requests.
9. The backend authentication middleware verifies the JWT.
10. Protected `/user` endpoints become accessible.

---

# Database Design

The application contains two main database models.

## User

```text
id
name
username
email
password
createdAt
```

Each user can have multiple favorite repositories.

---

## FavoriteRepository

```text
id
githubRepoId
name
description
htmlUrl
language
stars
owner
userId
createdAt
```

The `userId` associates a saved repository with a specific user.

The Prisma schema also contains a unique constraint:

```text
userId + githubRepoId
```

This prevents the same user from saving the same GitHub repository multiple times.

---

# TypeScript Usage

TypeScript is used throughout both the frontend and backend.

Examples include:

- GitHub repository interfaces
- Favorite repository interfaces
- React component props
- Authentication context types
- Custom authenticated Express request type
- JWT payload types
- Prisma-generated database types
- Typed API responses
- Strict TypeScript configuration

---

# Frontend Architecture

The frontend uses reusable components and separates responsibilities between pages, API services, types, hooks, and authentication state.

### Explore Page

Allows users to:

- Enter a GitHub username
- Search public repositories
- View repository details
- Save repositories after login

### Login Page

Allows existing users to authenticate and receive a JWT.

### Register Page

Allows new users to create an account.

### Favorites Page

Allows authenticated users to:

- View saved repositories
- Open repositories on GitHub
- Remove repositories from favorites

### Protected Route

The favorites page is protected on the frontend.

Logged-out users who try to visit:

```text
/favorites
```

are redirected to:

```text
/login
```

---

# React Query

TanStack React Query is used for data fetching and server-state management.

It provides:

- Loading states
- Error states
- Query caching
- Query invalidation
- Automatic refresh of favorites after removing a repository

---

# Error Handling

The application handles common errors such as:

- Missing registration fields
- Duplicate username or email
- Invalid login credentials
- Missing JWT
- Invalid JWT
- Expired JWT
- Duplicate favorite repositories
- Invalid repository IDs
- GitHub usernames that do not exist
- GitHub API failures
- Backend failures
- Database failures

---

# Security

The backend includes several basic security practices:

- Passwords are never stored as plain text
- Passwords are hashed using bcrypt
- Protected routes require JWT authentication
- JWTs are verified on the backend
- User passwords are not returned in API responses
- Environment variables are stored outside source control
- Database credentials are never committed to GitHub
- Users can only access favorites associated with their account

---

# CORS

The backend allows requests only from configured frontend origins.

Local development:

```env
FRONTEND_URL=http://localhost:5173
PREVIEW_URL=http://localhost:4173
```

Production uses the deployed Vercel frontend URL.

---

# Environment Variables

## Backend `.env.example`

```env
PORT=8000
JWT_SECRET=
DATABASE_URL=
DIRECT_URL=
FRONTEND_URL=
PREVIEW_URL=
```

## Frontend `.env.example`

```env
VITE_API_URL=
```

Never commit real `.env` files containing secrets.

---

# Production Deployment

## Frontend

The frontend is deployed on Vercel.

Production URL:

```text
https://github-repo-explorer-by-priyanka.vercel.app
```

Production environment variable:

```env
VITE_API_URL=https://githubrepoexplorer-q036.onrender.com
```

---

## Backend

The backend is deployed on Render.

Production URL:

```text
https://githubrepoexplorer-q036.onrender.com
```

The Render environment includes:

```env
JWT_SECRET=your_production_secret
DATABASE_URL=your_supabase_database_url
DIRECT_URL=your_supabase_direct_url
FRONTEND_URL=https://github-repo-explorer-by-priyanka.vercel.app
```

---

## Database

The PostgreSQL database is hosted using Supabase.

Prisma is used for schema management, migrations, and type-safe database queries.

---

# Build Commands

## Backend

```bash
cd BackEnd
npm run build
```

The backend build generates the Prisma Client and compiles TypeScript.

---

## Frontend

```bash
cd Frontend
npm run build
```

Vite generates the production frontend inside:

```text
dist/
```

---

# Technical Decisions and Tradeoffs

## PostgreSQL + Prisma

PostgreSQL was selected because users and favorite repositories have a clear relational structure.

Prisma provides:

- Type-safe queries
- Database migrations
- Schema management
- Strong TypeScript integration

---

## Supabase

Supabase is used as the hosted PostgreSQL provider.

It simplifies:

- Database hosting
- PostgreSQL connection management
- Development and deployment

---

## JWT Authentication

JWT authentication was selected because the project requires JWT-based authentication.

It also works well with a separately deployed React frontend and Express backend.

---

## bcrypt

bcrypt is used to securely hash passwords before storing them in the database.

Plain-text passwords are never stored.

---

## React Query

React Query was selected because repository and favorite data are asynchronous server state.

It simplifies:

- Loading handling
- Error handling
- Caching
- Refetching
- Query invalidation

---

## GitHub API Calls from the Frontend

The GitHub repository search is performed directly from the frontend because the application only requests public GitHub repository information.

The backend is responsible for authenticated application data such as user accounts and saved favorites.

A larger production system could proxy GitHub requests through the backend to provide centralized caching, API authentication, and rate-limit management.

---

## JWT Storage

For simplicity, the JWT is stored in `localStorage`.

This is appropriate for the scope of this take-home project.

For a larger production application, authentication could use secure `HttpOnly`, `Secure`, and `SameSite` cookies to reduce exposure of tokens to client-side JavaScript.

---

# Future Improvements

Possible future improvements include:

- GitHub OAuth
- Pagination
- Repository sorting
- Repository filtering
- Search history
- Dark mode
- Toast notifications
- Skeleton loading states
- Automated frontend tests
- Automated backend tests
- Integration tests
- Refresh tokens
- HttpOnly cookie authentication
- Rate-limit handling
- GitHub API authentication
- Repository language filters
- Favorites search
- User profile page

---

# Testing the Application

A typical test flow is:

```text
Register
↓
Login
↓
Search GitHub username
↓
View repositories
↓
Save repository
↓
Open Favorites
↓
Remove repository
↓
Logout
```

Example GitHub usernames to test:

```text
torvalds
facebook
microsoft
vercel
```

---

# Deployment URLs

Frontend:

```text
https://github-repo-explorer-by-priyanka.vercel.app
```

Backend:

```text
https://githubrepoexplorer-q036.onrender.com
```

---

# Author

Priyanka
