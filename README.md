# College Platform Backend

Production-ready backend API for a College Discovery Platform built using Next.js, Prisma ORM, PostgreSQL, JWT Authentication, and Swagger API Documentation.

---

# Live Deployment

## Backend URL

https://college-platform-backend-three.vercel.app/

## Swagger API Docs

https://college-platform-backend-three.vercel.app/api-docs

---

# Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes

## College APIs

- Get All Colleges
- Search Colleges
- Filter Colleges
- Pagination
- College Details
- Compare Colleges

## Saved Colleges

- Save College
- Fetch Saved Colleges
- Delete Saved Colleges

## Backend Engineering Features

- PostgreSQL Database
- Prisma ORM
- Zod Validation
- REST API Architecture
- Error Handling
- Authorization Checks
- Swagger Documentation

---

# Tech Stack

- Next.js 16
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT
- Zod
- Swagger
- Supabase
- Vercel

---

# API Endpoints

## Authentication

### Register

POST `/api/auth/register`

### Login

POST `/api/auth/login`

### Profile

GET `/api/profile`

---

## Colleges

### Get Colleges

GET `/api/colleges`

### Search Colleges

GET `/api/colleges?search=IIT`

### Filter Colleges

GET `/api/colleges?location=Delhi`

### Pagination

GET `/api/colleges?page=1&limit=2`

### College Details

GET `/api/colleges/:id`

### Compare Colleges

GET `/api/colleges/compare?id=1&id=2`

---

## Saved Colleges

### Save College

POST `/api/saved`

### Get Saved Colleges

GET `/api/saved`

### Delete Saved College

DELETE `/api/saved/:id`

---

# Local Setup

## Clone Repository

```bash
git clone https://github.com/ManiDeep1822/college-platform-backend.git
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create `.env`

```env
DATABASE_URL="YOUR_DATABASE_URL"
JWT_SECRET="YOUR_SECRET"
```

## Run Development Server

```bash
npm run dev
```

---

# Database

PostgreSQL database hosted using Supabase.

ORM:

- Prisma

---

# Swagger Documentation

Swagger UI available at:

```txt
/api-docs
```

---

# Author

Mani Deep

GitHub:
https://github.com/ManiDeep1822
