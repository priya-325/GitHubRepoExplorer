# GitHubRepoExplorer

## Project:

GitHub Repo Explorer (TypeScript)

## Goal:

Build a fullstack TypeScript app that lets users search GitHub repositories by username and save
their favorite repos to their account.

## Features to Build:

### Frontend:

1. Search GitHub Repositories

- Input GitHub username
- Fetch and display public repos from:
  GET https://api.github.com/users/{username}/repos

2. Display Repo Info

For each repo, show:

- Name
- Description
- Star count
- Link to repo
- Language

3. Favorite a Repo

- Click a "Save" button to mark a repo as a favorite
- Requires login (JWT protected)
- Favorited repos saved to the user's profile

4. Error Handling

- Show loading state
- Display error if username not found or API fails

### Backend:

1. Auth Routes (JWT-based)

- POST /auth/register
- POST /auth/login
- Use bcrypt to hash passwords and JWT to issue tokens

2. User Routes

- GET /user/favorites - get user's saved repos
- POST /user/favorites - save a new repo
- DELETE /user/favorites/:id - remove saved repo

3. Middleware

- Authenticate and protect /user routes using JWT

## Tech Stack:

Frontend: React + TypeScript
Backend: Node.js + Express + TypeScript
Database: MongoDB or PostgreSQL
Auth: JWT + bcrypt

## What We're Looking For:

- Strong usage of TypeScript: types, interfaces, enums
- Clean component structure and reusable code
- Secure and well-structured backend API
- Async/await, error handling, and separation of concerns

## Bonus Points:

- Use React Query or SWR for data fetching
- Add responsive design
- Deploy frontend/backend (Vercel + Render)

## Submission:

1. GitHub repo with README and setup instructions
2. Live demo (optional)
3. Note tradeoffs or tech decisions
