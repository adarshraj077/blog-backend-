# Blog Application

A full-stack blog application built with Express.js and MongoDB. This project enables users to create, read, update, and delete blog posts with user authentication and authorization.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Authentication & Security](#authentication--security)
- [File Descriptions](#file-descriptions)

## Features

- **User Authentication**: Sign up and login with secure password hashing
- **Blog Management**: Create, read, edit, and delete blog posts
- **User Authorization**: Protected routes that require authentication
- **Session Management**: Cookie-based token storage for persistent sessions
- **Server-Side Rendering**: EJS templates for dynamic HTML rendering
- **Database Persistence**: MongoDB for data storage

## Tech Stack

### Backend
- **Runtime**: [Bun](https://bun.com) / Node.js
- **Framework**: Express.js v5.2.1
- **Language**: TypeScript
- **Database**: MongoDB v9.6.3
- **ORM**: Mongoose v9.6.3

### Authentication & Security
- **Password Hashing**: bcrypt v6.0.0
- **JWT Tokens**: jsonwebtoken v9.0.3
- **Cookie Management**: cookie-parser v1.4.7

### Templating & Frontend
- **Template Engine**: EJS v6.0.1
- **Environment Variables**: dotenv v17.4.2

### Development
- **TypeScript Definitions**: @types/express v5.0.6, @types/bun (latest)

## Project Structure

```
blog-application/
├── app.ts                          # Main application entry point
├── connection.ts                   # MongoDB connection configuration
├── middelware.ts                   # Express middleware setup
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Project dependencies
├── .env                            # Environment variables (not in git)
│
├── models/                         # Mongoose schemas
│   ├── blogmodel.ts                # Blog post schema
│   └── user.ts                     # User schema
│
├── routes/                         # Express route definitions
│   ├── blog.ts                     # Blog-related routes
│   └── user.ts                     # User authentication routes
│
├── controller/                     # Route handlers/controllers
│   ├── postblog.ts                 # Handle blog post creation
│   ├── allblogs.ts                 # Fetch all blog posts
│   ├── getsingleblog.ts            # Fetch single blog post
│   ├── editblog.ts                 # Edit blog post handler
│   ├── deleteblog.ts               # Delete blog post handler
│   ├── handellogin.ts              # Handle user login
│   └── register.ts                 # Handle user registration
│
├── service/                        # Business logic and utilities
│   └── auth.ts                     # Authentication middleware
│
└── views/                          # EJS templates
    ├── login.ejs                   # Login page
    ├── register.ejs                # Registration page
    ├── postblog.ejs                # Create blog post form
    ├── allBlogs.ejs                # All blogs listing page
    ├── singleblog.ejs              # Single blog post view
    ├── editBlog.ejs                # Edit blog post form
    └── errorPage.ejs               # Error page template
```

## Database Schema

### Blog Schema (`models/blogmodel.ts`)

```typescript
{
  title: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String
  },
  author: {
    type: String
  },
  timestamps: true  // Automatically adds createdAt and updatedAt
}
```

**Indexes**: 
- `title` - Unique index to prevent duplicate blog titles

### User Schema (`models/user.ts`)

```typescript
{
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true
  }
}
```

**Indexes**:
- `email` - Unique index to prevent duplicate accounts

## API Endpoints

### Blog Routes (`/blogs` prefix)

#### Get All Posts
- **Endpoint**: `GET /blogs/getallpost`
- **Endpoint**: `GET /blogs/read`
- **Description**: Retrieve all blog posts
- **Authentication**: Not required
- **Response**: List of all blog posts with timestamps

#### Get Single Post
- **Endpoint**: `GET /blogs/readOne/:id`
- **Description**: Retrieve a specific blog post by ID
- **Parameters**: 
  - `id` (URL param): MongoDB blog post ID
- **Authentication**: Not required
- **Response**: Single blog post object

#### Create New Blog Post
- **Endpoint**: `POST /blogs/new`
- **Description**: Create a new blog post
- **Authentication**: Not required
- **Request Body**:
  ```json
  {
    "title": "string",
    "content": "string",
    "author": "string"
  }
  ```
- **Response**: Created blog post object

#### Get Blog Creation Form
- **Endpoint**: `GET /blogs/newblog`
- **Description**: Render blog creation form page
- **Authentication**: Required (JWT token in cookies)
- **Response**: HTML page for creating a new blog

#### Edit Blog Post
- **Endpoint**: `GET /blogs/edit/:id`
- **Endpoint**: `POST /blogs/edit/:id`
- **Description**: Retrieve edit form (GET) or update blog post (POST)
- **Parameters**: 
  - `id` (URL param): MongoDB blog post ID
- **Authentication**: Not required (GET), Not specified (POST)
- **Request Body (POST)**:
  ```json
  {
    "title": "string",
    "content": "string",
    "author": "string"
  }
  ```
- **Response**: Updated blog post object

#### Delete Blog Post
- **Endpoint**: `POST /blogs/delete/:id`
- **Description**: Delete a blog post
- **Parameters**: 
  - `id` (URL param): MongoDB blog post ID
- **Authentication**: Not required
- **Response**: Confirmation of deletion

### User Routes (`/user` prefix)

#### Login Page
- **Endpoint**: `GET /user/login`
- **Description**: Render login form page
- **Authentication**: Not required
- **Response**: HTML login form

#### Signup Page
- **Endpoint**: `GET /user/signup`
- **Description**: Render registration form page
- **Authentication**: Not required
- **Response**: HTML registration form

#### Handle Login
- **Endpoint**: `POST /user/handellogin`
- **Description**: Authenticate user and create session
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**: Sets JWT token cookie and redirects to dashboard
- **Security**: Password is verified using bcrypt

#### Register New User
- **Endpoint**: `POST /user/register`
- **Description**: Create a new user account
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "user@example.com",
    "password": "string"
  }
  ```
- **Response**: User object or error message
- **Security**: Password is hashed using bcrypt before storage

## Installation

### Prerequisites
- Bun runtime or Node.js (v18+)
- MongoDB instance (local or cloud - MongoDB Atlas)
- npm or Bun package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog-application
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or with npm
   npm install
   ```

3. **Set up environment variables** (see [Configuration](#configuration) section)

4. **Verify MongoDB connection**
   - Ensure MongoDB is running
   - Test the connection string in `.env`

## Configuration

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# MongoDB Connection
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>

# Server Configuration
PORT=8000
```

**Example with MongoDB Atlas**:
```env
MONGO_URL=mongodb+srv://user:password@cluster0.abcdef.mongodb.net/blog_db
PORT=8000
```

**Example with Local MongoDB**:
```env
MONGO_URL=mongodb://localhost:27017/blog_db
PORT=8000
```

### JWT Secret Key

The JWT secret key is currently hardcoded in `service/auth.ts`:
```typescript
const SECRET_KEY = "117d2715-6aab-4839-8805-bc4e8707c3c0"
```

**⚠️ Security Warning**: Move this to `.env` for production:
```env
JWT_SECRET=your-secret-key-here
```

### Middleware Configuration

Configured in `middelware.ts`:
- **JSON Parser**: `express.json()` - Parse JSON request bodies
- **URL Encoded Parser**: `express.urlencoded({extended: true})` - Parse form data
- **Cookie Parser**: `cookie-parser()` - Parse HTTP cookies

## Running the Application

### Development Mode (with auto-reload)
```bash
bun run --watch app.ts
# or
npm run dev
```

### Production Mode
```bash
bun run app.ts
# or
npm start
```

The application will start on the port specified in `.env` (default: `8000`)

**Expected Output**:
```
app is listning on 8000
mongodb connected
```

### Accessing the Application
- **Frontend**: http://localhost:8000
- **Login**: http://localhost:8000/user/login
- **Signup**: http://localhost:8000/user/signup
- **All Blogs**: http://localhost:8000/blogs/getallpost

## Authentication & Security

### Password Security
- Passwords are hashed using **bcrypt** with salt rounds before storage
- Raw passwords are never stored in the database
- Password verification is done during login using bcrypt comparison

### Session Management
- **JWT Tokens**: Users receive a JWT token upon successful login
- **Cookie Storage**: Token is stored in HTTP-only cookies
- **Token Verification**: Protected routes verify the token from cookies before granting access
- **Automatic Redirect**: Unauthenticated users are redirected to login page

### Protected Routes
- `GET /blogs/newblog` - Requires valid JWT token
  - Middleware: `auth.restrictToLogedin`
  - Behavior: Redirects to login if token is missing or invalid

### Security Best Practices (Recommendations)
- ✅ Passwords are hashed with bcrypt
- ✅ JWT tokens for stateless authentication
- ✅ Cookie-based session persistence
- ⚠️ Move JWT_SECRET to environment variables
- ⚠️ Add HTTPS in production
- ⚠️ Implement rate limiting on authentication endpoints
- ⚠️ Add CSRF protection tokens
- ⚠️ Validate and sanitize user inputs

## File Descriptions

### Core Files

**`app.ts`**
- Main application entry point
- Configures Express server
- Sets up middleware and routes
- Configures EJS template engine
- Starts the HTTP server on specified PORT

**`connection.ts`**
- Handles MongoDB connection using Mongoose
- Reads `MONGO_URL` from environment variables
- Logs connection status to console

**`middelware.ts`**
- Configures global Express middleware
- Parses JSON and URL-encoded request bodies
- Parses cookies from requests

**`tsconfig.json`**
- TypeScript compiler configuration
- Specifies compilation targets and module settings

### Models

**`models/blogmodel.ts`**
- Defines Blog document schema
- Fields: `title`, `content`, `author`, timestamps
- Validation: Title must be unique

**`models/user.ts`**
- Defines User document schema
- Fields: `username`, `email`, `password`
- Validation: Email must be unique, username minimum 3 characters

### Routes

**`routes/blog.ts`**
- Routes for blog operations (CRUD)
- Routes for blog listing and viewing

**`routes/user.ts`**
- Routes for authentication (login, signup)
- Routes for form rendering

### Controllers

**`controller/postblog.ts`**
- Handles POST request to create new blog

**`controller/allblogs.ts`**
- Retrieves all blogs from database

**`controller/getsingleblog.ts`**
- Retrieves a single blog by ID

**`controller/editblog.ts`**
- Handles GET (fetch edit form) and POST (update blog)

**`controller/deleteblog.ts`**
- Handles blog deletion

**`controller/handellogin.ts`**
- Validates user credentials
- Generates JWT token
- Sets token in cookies

**`controller/register.ts`**
- Creates new user account
- Hashes password with bcrypt
- Validates user input

### Services

**`service/auth.ts`**
- Authentication middleware
- `restrictToLogedin()` - Verifies JWT token and redirects if invalid

### Views (EJS Templates)

- **`login.ejs`** - User login form
- **`register.ejs`** - User registration form
- **`postblog.ejs`** - Blog creation form
- **`allBlogs.ejs`** - Displays all blog posts
- **`singleblog.ejs`** - Displays single blog post
- **`editBlog.ejs`** - Blog edit form
- **`errorPage.ejs`** - Error message display

---

## Troubleshooting

### MongoDB Connection Error
- Verify `MONGO_URL` in `.env` file
- Ensure MongoDB is running
- Check firewall/network settings for remote MongoDB

### Port Already in Use
- Change `PORT` in `.env` to an available port
- Or kill the process using the current port

### JWT Token Invalid
- Clear browser cookies and login again
- Verify `JWT_SECRET` is consistent

### Template Not Found
- Ensure `.env` file has `PORT` variable set correctly
- Check that EJS files exist in `views/` directory

---

**Last Updated**: June 2026
**Maintained By**: Development Team
