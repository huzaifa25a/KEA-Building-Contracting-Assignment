
**Projects & Expenses Tracker**

**Full-Stack Take-Home Assignment – KEA Building Contracting LLC**

**Live Demo:**

 - Frontend (Vercel): https://kea-building-contracting-assignment.vercel.app/ 
 - Backend (Railway): https://kea-building-contracting-assignment-production.up.railway.app

**Tech Stack:** 
 - **Frontend:** Next.js (App Router), React, Tailwind CSS
 - **Backend:**    Node.js, Express
 - **Database**: PostgreSQL
 - **Deployment:**
	 - **Frontend:** Vercel
	 - **Backend & Database:** Railway

**Features Implemented:**

 - Create projects with client name and estimated budget
 - View list of all projects with:   
	 - Estimated budget   
	 - Total expenses   
	 - Remaining budget
 - Expand a project to view its expenses (accordion-style)
 - Add expenses to a project
 - Update and delete expenses
 - Budget calculations update in real time after each change

**Project Structure**

 - KEA-Building-Contracting-Assignment <br/>
├ <br/>
├── client/&emsp;&emsp;&emsp;&emsp;# Next.js frontend<br/>
├ <br/>
├── server/&emsp;&emsp;&emsp;&emsp;# Express backend<br/>
├ <br/>
└── README.md

**Setup Instructions (Local)**
 - **Clone the repository**
	 - git clone
   https://github.com/huzaifa25a/KEA-Building-Contracting-Assignment.git
	 - cd KEA-Building-Contracting-Assignment
	   
 - **Backend Setup**
	 - cd server
	 - npm install
	- Create a .env file in server/:
		- PORT=5000
		- DATABASE_URL=postgresql://postgres:<your_password>@localhost:5432/projects_tracker
	- Start the backend:
		- npm start
	 - Backend will run on:
		 - http://localhost:5000

 - **Database Setup (PostgreSQL)**
	 - Create database: 
		 - CREATE DATABASE projects_tracker;
    - Create tables: 
	    - CREATE TABLE projects (project_id SERIAL PRIMARY KEY, project_name VARCHAR(255) NOT NULL, client_name VARCHAR(255) NOT NULL, estimated_budget NUMERIC(12, 2) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
		 - CREATE TABLE expenses (expense_id SERIAL PRIMARY KEY, project_id    INTEGER NOT NULL, description TEXT NOT NULL, amount  NUMERIC(12, 2) NOT NULL, category VARCHAR(50) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE);
   
 - **Frontend Setup**
	 - cd client 
	 - npm install
	 - Create .env.local in client/:
		 - NEXT_PUBLIC_API_URL=http://localhost:5000
	 - Run frontend: 
		 - npm run dev
	- Frontend will run on: 
		- http://localhost:3000

**Database Schema Explanation:**

 - **Projects Table:**
<table>
	<tr>
		<th>Column</th>
		<th>Type</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>project_id</td>
		<td>SERIAL (PK)</td>
		<td>Unique project ID</td>
	</tr>
	<tr>
		<td>project_name</td>
		<td>VARCHAR</td>
		<td>Project name</td>
	</tr>
	<tr>
		<td>client_name</td>
		<td>VARCHAR</td>
		<td>Client name</td>
	</tr>
	<tr>
		<td>estimated_budget</td>
		<td>NUMERIC</td>
		<td>Total allocated budget</td>
	</tr>
	<tr>
		<td>created_at</td>
		<td>TIMESTAMP</td>
		<td>Creation time</td>
	</tr>
</table>

 - **Expenses Table:**
<table>
  <tr>
    <th>Column</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>expense_id</td>
    <td>SERIAL (PK)</td>
    <td>Unique expense ID</td>
  </tr>
  <tr>
    <td>project_id</td>
    <td>INTEGER (FK)</td>
    <td>Linked project</td>
  </tr>
  <tr>
    <td>description</td>
    <td>TEXT</td>
    <td>Expense description</td>
  </tr>
  <tr>
    <td>amount</td>
    <td>NUMERIC</td>
    <td>Expense amount</td>
  </tr>
  <tr>
    <td>category</td>
    <td>VARCHAR</td>
    <td>Material / Labor / Other</td>
  </tr>
  <tr>
    <td>created_at</td>
    <td>TIMESTAMP</td>
    <td>Creation time</td>
  </tr>
</table>

 - **One-to-many relationship: one project → many expenses**

 - **ON DELETE CASCADE ensures expenses are removed if a project is deleted**

**API Endpoints (Backend)**

 - **Projects:**
	 - POST /projects/add_projects
	 - GET /projects/get_projects

 - **Expenses:**
	 - POST /expenses/add_expense/:project_id
	 - GET /expenses/get_expenses/:project_id
	 - PUT /expenses/update_expense/:expense_id
	 - DELETE /expenses/delete_expense/:expense_id

**Assumptions Made:**

 - Authentication is not required
 - One currency (AED) is used throughout
 - Project deletion is not part of scope (expenses delete handled)
 - Basic validation is sufficient for this assessment

**What I Would Improve With More Time:**

 - Authentication & role-based access
 - Pagination for large project/expense lists
 - Better form validation and user feedback (toasts)
 - Unit and integration tests
 - Backend aggregation query for optimized budget calculations
 - UI polish and accessibility improvements

**Notes:**

 - Environment variables are used for clean separation between local and production setups
 - No hardcoded credentials are committed to the repository
 - Code is kept simple and readable as per assignment expectations
