Projects & Expenses Tracker

Full-Stack Take-Home Assignment – KEA Building Contracting LLC

Live Demo

Frontend (Vercel): https://kea-building-contracting-assignment.vercel.app/

Backend (Railway): https://kea-building-contracting-assignment-production.up.railway.app

Tech Stack

Frontend: Next.js (App Router), React, Tailwind CSS

Backend: Node.js, Express

Database: PostgreSQL

Deployment:

Frontend: Vercel

Backend & Database: Railway

Features Implemented

Create projects with client name and estimated budget

View list of all projects with:

Estimated budget

Total expenses

Remaining budget

Expand a project to view its expenses (accordion-style)

Add expenses to a project

Update and delete expenses

Budget calculations update in real time after each change

Project Structure
KEA-Building-Contracting-Assignment
│
├── client/        # Next.js frontend
│
├── server/        # Express backend
│
└── README.md

Setup Instructions (Local)
1. Clone the repository
git clone <YOUR_GITHUB_REPO_URL>
cd KEA-Building-Contracting-Assignment

2. Backend Setup
cd server
npm install


Create a .env file in server/:

PORT=5000
DATABASE_URL=postgresql://postgres:<your_password>@localhost:5432/projects_tracker


Start the backend:

npm start


Backend will run on:

http://localhost:5000

3. Database Setup (PostgreSQL)

Create database:

CREATE DATABASE projects_tracker;


Create tables:

CREATE TABLE projects (
  project_id SERIAL PRIMARY KEY,
  project_name VARCHAR(255) NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  estimated_budget NUMERIC(12,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expenses (
  expense_id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL,
  description TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_project
    FOREIGN KEY (project_id)
    REFERENCES projects(project_id)
    ON DELETE CASCADE
);

4. Frontend Setup
cd client
npm install


Create .env.local in client/:

NEXT_PUBLIC_API_URL=http://localhost:5000


Run frontend:

npm run dev


Frontend will run on:

http://localhost:3000

Database Schema Explanation
Projects Table
Column	Type	Description
project_id	SERIAL (PK)	Unique project ID
project_name	VARCHAR	Project name
client_name	VARCHAR	Client name
estimated_budget	NUMERIC	Total allocated budget
created_at	TIMESTAMP	Creation time
Expenses Table
Column	Type	Description
expense_id	SERIAL (PK)	Unique expense ID
project_id	INTEGER (FK)	Linked project
description	TEXT	Expense description
amount	NUMERIC	Expense amount
category	VARCHAR	Material / Labor / Other
created_at	TIMESTAMP	Creation time

One-to-many relationship: one project → many expenses

ON DELETE CASCADE ensures expenses are removed if a project is deleted

API Endpoints (Backend)
Projects

POST /projects/add_projects

GET /projects/get_projects

Expenses

POST /expenses/add_expense/:project_id

GET /expenses/get_expenses/:project_id

PUT /expenses/update_expense/:expense_id

DELETE /expenses/delete_expense/:expense_id

Assumptions Made

Authentication is not required

One currency (AED) is used throughout

Project deletion is not part of scope (expenses delete handled)

Basic validation is sufficient for this assessment

What I Would Improve With More Time

Authentication & role-based access

Pagination for large project/expense lists

Better form validation and user feedback (toasts)

Unit and integration tests

Backend aggregation query for optimized budget calculations

UI polish and accessibility improvements

Notes

Environment variables are used for clean separation between local and production setups

No hardcoded credentials are committed to the repository

Code is kept simple and readable as per assignment expectations
