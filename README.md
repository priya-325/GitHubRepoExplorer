# GitHub Repo Explorer

A fullstack TypeScript application that allows users to search public GitHub repositories by username and save favorite repositories to their account.

## Features

- Search GitHub repositories by username
- View repository name, description, stars, language, and GitHub link
- Register and log in with JWT authentication
- Save repositories as favorites
- Remove repositories from favorites
- Protected favorites routes
- Responsive UI
- Loading and error states

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
- Prisma
- PostgreSQL / Supabase
- JWT
- bcrypt

## Project Structure

```text
GithubRepoExplorer/
├── Frontend/
└── BackEnd/
```

## Prerequisites

Make sure you have:

- Node.js 18+
- npm
- PostgreSQL database or Supabase project

## Backend Setup

Go to the backend folder:

```bash
cd BackEnd
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `BackEnd` folder:

```env
PORT=8000
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_database_url
DIRECT_URL=your_direct_database_url
```

> Do not commit your `.env` file or expose your database credentials and JWT secret.

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Generate Prisma Client:

```bash
npx prisma generate
```

Start the backend development server:

```bash
npm run dev
```

The backend runs at:

```text
http://localhost:8000
```

You can verify that the backend is running by visiting:

```text
http://localhost:8000
```

Expected response:

```json
{
  "message": "GitHub Repo Explorer API is running"
}
```

## Frontend Setup

Open a new terminal and go to the frontend folder:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend normally runs at:

```text
http://localhost:5173
```

Open the URL in your browser.

## API Routes

### Authentication

#### Register

```text
POST /auth/register
```

Example request body:

```json
{
  "name": "Test User",
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

Example response:

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "Test User",
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

#### Login

```text
POST /auth/login
```

Example request body:

```json
{
  "email": "test@example.com",
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
    "name": "Test User",
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

## Favorites API

The favorites routes are protected using JWT authentication.

Authenticated requests must include:

```text
Authorization: Bearer <token>
```

### Get Favorites

```text
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
      "userId": 1
    }
  ]
}
```

### Save Favorite

```text
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

The same repository cannot be saved twice by the same user.

### Delete Favorite

```text
DELETE /user/favorites/:id
```

Example:

```text
DELETE /user/favorites/1
```

## GitHub Repository Search

Repository searches use the public GitHub API.

```text
GET https://api.github.com/users/{username}/repos
```

Example:

```text
GET https://api.github.com/users/torvalds/repos
```

The frontend displays:

- Repository name
- Repository description
- Programming language
- Star count
- GitHub repository link
- Save button

## Authentication Flow

The application uses JWT-based authentication.

The authentication process works as follows:

1. The user creates an account using the Register page.
2. The backend receives the user's name, username, email, and password.
3. The password is hashed using bcrypt.
4. The hashed password is stored in PostgreSQL.
5. The user logs in using their email and password.
6. bcrypt compares the entered password with the stored password hash.
7. The backend generates a JWT if the credentials are correct.
8. The frontend stores the JWT.
9. Axios automatically attaches the token to protected backend requests.
10. The backend authentication middleware verifies the JWT.
11. Protected favorites routes use the authenticated user's ID.

## Database

The application uses PostgreSQL hosted on Supabase.

Prisma is used as the ORM.

The application contains two main database models:

### User

The User model stores:

- ID
- Name
- Username
- Email
- Hashed password
- Created date

Example Prisma model:

```prisma
model User {
  id        Int                  @id @default(autoincrement())
  name      String
  username  String               @unique
  email     String               @unique
  password  String
  createdAt DateTime             @default(now())

  favorites FavoriteRepository[]
}
```

### FavoriteRepository

The FavoriteRepository model stores repositories saved by users.

```prisma
model FavoriteRepository {
  id           Int      @id @default(autoincrement())
  githubRepoId Int
  name         String
  description  String?
  htmlUrl      String
  language     String?
  stars        Int      @default(0)
  owner        String
  createdAt    DateTime @default(now())

  userId Int

  user User @relation(
    fields: [userId],
    references: [id],
    onDelete: Cascade
  )

  @@unique([userId, githubRepoId])
}
```

The unique constraint:

```prisma
@@unique([userId, githubRepoId])
```

prevents the same user from saving the same GitHub repository more than once.

## Frontend Structure

```text
Frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── RepoCard.tsx
│   │
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── auth-context.ts
│   │
│   ├── hooks/
│   │   └── useAuth.ts
│   │
│   ├── pages/
│   │   ├── Explore.tsx
│   │   ├── Favorites.tsx
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   │
│   ├── services/
│   │   ├── api.ts
│   │   └── github.ts
│   │
│   ├── types/
│   │   ├── favorite.ts
│   │   └── repo.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── package.json
└── vite.config.ts
```

## Backend Structure

```text
BackEnd/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── config/
│   │   └── prisma.ts
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   └── favorite.controller.ts
│   │
│   ├── generated/
│   │   └── prisma/
│   │
│   ├── middleware/
│   │   └── auth.middleware.ts
│   │
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   └── favorite.routes.ts
│   │
│   ├── utils/
│   │   └── generateToken.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── prisma.config.ts
└── tsconfig.json
```

## Frontend Authentication

The frontend uses an authentication context to track whether the user is logged in.

The JWT token is stored locally and automatically added to API requests using an Axios interceptor.

Example:

```ts
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
```

The Favorites page is protected using a React Router protected route.

Logged-out users who try to access:

```text
/favorites
```

are redirected to:

```text
/login
```

## Data Fetching

TanStack React Query is used for asynchronous data fetching.

It handles:

- GitHub repository requests
- Loading states
- Request caching
- Favorites fetching
- Favorites refresh after deletion

## Error Handling

The application handles errors such as:

- GitHub user not found
- GitHub API failure
- Incorrect login credentials
- Duplicate email
- Duplicate username
- Unauthorized favorites requests
- Duplicate favorite repositories
- Invalid favorite IDs
- Database errors

The UI displays appropriate loading and error messages to the user.

## Responsive Design

Tailwind CSS is used for styling.

The application includes:

- Responsive repository cards
- Responsive authentication forms
- Responsive layouts
- Desktop and mobile support
- Loading states
- Error states
- Hover and interaction styles

## Security

The application includes several basic security practices:

- Passwords are hashed with bcrypt
- Passwords are never returned from the backend
- JWT authentication protects private API routes
- JWT secrets are stored in environment variables
- Database credentials are stored in environment variables
- `.env` is excluded from Git
- Users can only delete favorites belonging to their own account
- Duplicate favorites are prevented by a database constraint

## Environment Variables

### Backend `.env`

```env
PORT=8000

JWT_SECRET=your_generated_secret

DATABASE_URL=your_supabase_database_url

DIRECT_URL=your_supabase_direct_url
```

Do not commit the real `.env` file.

Create a safe `.env.example` file:

```env
PORT=8000
JWT_SECRET=
DATABASE_URL=
DIRECT_URL=
```

## Development Commands

### Backend

Start development server:

```bash
npm run dev
```

Build the backend:

```bash
npm run build
```

Run Prisma migration:

```bash
npx prisma migrate dev
```

Generate Prisma Client:

```bash
npx prisma generate
```

Open Prisma Studio:

```bash
npx prisma studio
```

### Frontend

Start development server:

```bash
npm run dev
```

Build frontend:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Production Build

Before deployment, verify that both applications compile successfully.

### Backend

```bash
cd BackEnd
npm run build
```

### Frontend

```bash
cd Frontend
npm run build
```

## Technical Decisions

### TypeScript

TypeScript is used across both the frontend and backend to provide:

- Static type checking
- Better developer tooling
- Safer API interactions
- Typed React props
- Typed GitHub responses
- Typed database queries

### Prisma

Prisma was selected because it provides:

- Type-safe database access
- PostgreSQL support
- Database migrations
- Prisma Studio
- Generated TypeScript types

### PostgreSQL

PostgreSQL was chosen because users and favorites have a clear relational structure.

Each user can have many saved repositories.

### Supabase

Supabase provides the hosted PostgreSQL database used by the application.

Authentication is implemented separately in the Express backend using JWT and bcrypt.

### React Query

TanStack React Query was chosen to handle server data and asynchronous state.

It simplifies:

- Loading states
- Error states
- Caching
- Refetching
- Favorites synchronization

### Axios

Axios is used for HTTP requests.

A shared Axios instance automatically adds the JWT Authorization header to authenticated backend requests.

### JWT Authentication

JWT authentication was chosen because it provides a simple stateless authentication mechanism suitable for a take-home fullstack application.

### bcrypt

bcrypt securely hashes user passwords before they are stored in PostgreSQL.

### Tailwind CSS

Tailwind CSS is used for responsive and reusable styling without requiring large custom CSS files.

### Separate Frontend and Backend

The project separates frontend and backend concerns.

The frontend handles:

- UI
- Routing
- Search
- Authentication state
- User interactions

The backend handles:

- Authentication
- Password hashing
- JWT generation
- Database access
- Favorites management
- Authorization

## Tradeoffs

### GitHub API Authentication

Repository searches currently use GitHub's unauthenticated public API.

This keeps the project simple but means GitHub API rate limits apply.

A production version could use authenticated GitHub API requests.

### JWT Storage

JWT tokens are currently stored in browser local storage for simplicity.

For a larger production application, secure HTTP-only cookies would provide additional protection against token theft through XSS.

### Search Pagination

The application currently displays the repositories returned from the GitHub user repositories endpoint without implementing custom pagination.

Pagination could be added for users with many repositories.

### Testing

The current project focuses primarily on the requested take-home functionality.

A production version should include:

- Unit tests
- API integration tests
- React component tests
- End-to-end tests

## Possible Improvements

Future improvements could include:

- GitHub OAuth authentication
- Repository pagination
- Sort repositories by stars
- Sort repositories by updated date
- Filter repositories by programming language
- Search history
- Toast notifications
- Dark mode
- User profile page
- Repository statistics
- Better GitHub API rate-limit handling
- Automated tests
- Docker support
- CI/CD pipeline
- Refresh tokens
- Secure HTTP-only authentication cookies

## Testing the Application

A typical manual test flow is:

1. Start the backend.
2. Start the frontend.
3. Create a new account.
4. Log in.
5. Search for a GitHub username such as:

```text
torvalds
```

6. Verify repositories are displayed.
7. Click **Save** on a repository.
8. Open the Favorites page.
9. Verify the saved repository appears.
10. Remove the repository.
11. Verify it disappears from Favorites.
12. Log out.
13. Try to access `/favorites`.
14. Verify the application redirects to `/login`.

## Submission Checklist

Before submitting the project:

- [ ] Frontend builds successfully
- [ ] Backend builds successfully
- [ ] Register works
- [ ] Login works
- [ ] Passwords are hashed
- [ ] JWT authentication works
- [ ] Protected backend routes work
- [ ] GitHub username search works
- [ ] Repository information displays correctly
- [ ] Save favorite works
- [ ] Duplicate favorites are prevented
- [ ] Favorites page works
- [ ] Delete favorite works
- [ ] Protected frontend route works
- [ ] Loading states work
- [ ] Error states work
- [ ] Responsive design works
- [ ] `.env` is ignored
- [ ] `.env.example` is included
- [ ] No database credentials are committed
- [ ] README contains setup instructions
- [ ] Both projects pass production builds

## Author

Priyanka
