**Projects & Expenses Tracker**

**Full-Stack Take-Home Assignment – KEA Building Contracting LLC**

Live Demo
Frontend (Vercel): https://kea-building-contracting-assignment.vercel.app/

Backend (Railway): https://kea-building-contracting-assignment-production.up.railway.app

Tech Stack:
Frontend: Next.js (App Router), React, Tailwind CSS
Backend: Node.js, Express
Database: PostgreSQL

Deployment:
Frontend: Vercel
Backend & Database: Railway

Features Implemented:
1. Create projects with client name and estimated budget
2. View list of all projects with:
  Estimated budget
  Total expenses
  Remaining budget
3. Expand a project to view its expenses (accordion-style)
4. Add expenses to a project
5. Update and delete expenses
6. Budget calculations update in real time after each change

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
git clone https://github.com/huzaifa25a/KEA-Building-Contracting-Assignment
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
CREATE TABLE projects (project_id SERIAL PRIMARY KEY, project_name VARCHAR(255) NOT NULL, client_name VARCHAR(255) NOT NULL, estimated_budget NUMERIC(12, 2) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE expenses (expense_id SERIAL PRIMARY KEY, project_id INTEGER NOT NULL, description TEXT NOT NULL, amount NUMERIC(12, 2) NOT NULL, category VARCHAR(50) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE);

4. Frontend Setup
cd client
npm install

Create .env.local in client/:
NEXT_PUBLIC_API_URL=http://localhost:5000

Run frontend:
npm run dev

Frontend will run on:
http://localhost:3000

Database Schema Explanation:
Projects Table:
1. Column	Type	Description
2. project_id	SERIAL (PK)	Unique project ID
3. project_name	VARCHAR	Project name
4. client_name	VARCHAR	Client name
5. estimated_budget	NUMERIC	Total allocated budget
6. created_at	TIMESTAMP	Creation time

Expenses Table
1. Column	Type	Description
2. expense_id	SERIAL (PK)	Unique expense ID
3. project_id	INTEGER (FK)	Linked project
4. description	TEXT	Expense description
5. amount	NUMERIC	Expense amount
6. category	VARCHAR	Material / Labor / Other
7. created_at	TIMESTAMP	Creation time

One-to-many relationship: one project → many expenses

ON DELETE CASCADE ensures expenses are removed if a project is deleted

API Endpoints (Backend)
Projects:
1. POST /projects/add_projects
2. GET /projects/get_projects

Expenses:
1. POST /expenses/add_expense/:project_id
2. GET /expenses/get_expenses/:project_id
3. PUT /expenses/update_expense/:expense_id
4. DELETE /expenses/delete_expense/:expense_id

Assumptions Made:
1. Authentication is not required
2. One currency (AED) is used throughout
3. Project deletion is not part of scope (expenses delete handled)
4. Basic validation is sufficient for this assessment
5. What I Would Improve With More Time
6. Authentication & role-based access
7. Pagination for large project/expense lists
8. Better form validation and user feedback (toasts)
9. Unit and integration tests
10. Backend aggregation query for optimized budget calculations
11. UI polish and accessibility improvements

Notes:
1. Environment variables are used for clean separation between local and production setups
2. No hardcoded credentials are committed to the repository
3. Code is kept simple and readable as per assignment expectations
