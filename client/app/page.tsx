"use client";

import { useEffect, useState } from "react";
import up from "../up-arrow.svg";
import down from "../down-arrow.svg";

export default function ProjectsPage() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const [projects, setProjects] = useState<any[]>([]);
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);
  const [expensesByProject, setExpensesByProject] = useState<Record<number, any[]>>({});
  const [showExpensePopup, setShowExpensePopup] = useState(false);
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [editingExpenseId, setEditingExpenseId] = useState<number | null>(null);
  const [showProjectPopup, setShowProjectPopup] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [clientName, setClientName] = useState("");
  const [projectBudget, setProjectBudget] = useState("");



  // Fetch all projects
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(`${API_BASE_URL}/projects/get_projects`);;
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    }

    fetchProjects();
  }, []);

  // add project
  async function addProjectHandler() {
    if (!projectName || !clientName || !projectBudget) {
      alert("All fields are required");
      return;
    }
  
    try {
      await fetch(`${API_BASE_URL}/projects/add_projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_name: projectName,
          client_name: clientName,
          estimated_budget: projectBudget,
        }),
      });
  
      // Reset form
      setProjectName("");
      setClientName("");
      setProjectBudget("");
      setShowProjectPopup(false);
  
      // Refresh projects list
      const res = await fetch(`${API_BASE_URL}/projects/get_projects`);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Error adding project:", err);
    }
  }  

  // Fetch expenses for a specific project
  async function fetchExpenses(projectId: number) {
    try {
      const res = await fetch(
        `${API_BASE_URL}/expenses/get_expenses/${projectId}`
      );
      const data = await res.json();

      setExpensesByProject((prev) => ({
        ...prev,
        [projectId]: data.query,
      }));

    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  }

  // Toggle accordion
  function toggleProject(projectId: number) {
    if (expandedProjectId === projectId) {
      setExpandedProjectId(null);
    } else {
      setExpandedProjectId(projectId);
      fetchExpenses(projectId);
    }
  }

  // total expense
  function getTotalExpenses(projectId: number) {
    const expenses = expensesByProject[projectId] || [];
    return expenses.reduce((sum, expense) => {
      return sum + Number(expense.amount);
    }, 0);
  }

  // add expense
  async function addExpensehandler(projectId: number) {
    if (!expenseDescription || !expenseAmount || !expenseCategory) {
      alert("All fields are required");
      return;
    }
  
    try {
      await fetch(
        `${API_BASE_URL}/expenses/add_expense/${projectId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description: expenseDescription,
            amount: expenseAmount,
            category: expenseCategory,
          }),
        }
      );
  
      // Reset form
      setExpenseDescription("");
      setExpenseAmount("");
      setExpenseCategory("");
      setShowExpensePopup(false);
  
      // Refresh data
      fetchExpenses(projectId);
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  }

  // update expense
  async function updateExpenseHandler(expenseId: number, projectId: number) {
    if (!expenseDescription || !expenseAmount || !expenseCategory) {
      alert("All fields are required");
      return;
    }
  
    try {
      await fetch(
        `${API_BASE_URL}/expenses/update_expense/${expenseId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description: expenseDescription,
            amount: expenseAmount,
            category: expenseCategory,
          }),
        }
      );
  
      setEditingExpenseId(null);
      setExpenseDescription("");
      setExpenseAmount("");
      setExpenseCategory("");
  
      fetchExpenses(projectId);
    } catch (err) {
      console.error("Error updating expense:", err);
    }
  }

  // delete expense
  async function deleteExpenseHandler(expenseId: number, projectId: number) {
    const confirmDelete = confirm("Delete this expense?");
    if (!confirmDelete) return;
  
    try {
      await fetch(
        `${API_BASE_URL}/expenses/delete_expense/${expenseId}`,
        { method: "DELETE" }
      );
  
      fetchExpenses(projectId);
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  }
  

  return (
    <div className="bg-[#292929] min-h-screen text-white">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <button 
          className="px-3 py-1 bg-[#b3741d] rounded-md hover:bg-[#b3751d69] cursor-pointer"
          onClick={() => setShowProjectPopup(true)}
        >
          + Add Project
        </button>
      </div>

      {/* Projects List */}
      <div className="flex flex-col gap-6 px-6">
        {projects.map((project) => (
          <div key={project.project_id} className="flex flex-col">
            {/* Project Card */}
            <div className={`flex flex-wrap gap-7 sm:justify-between sm:items-center bg-[#454545] p-4 rounded-t-md ${!expandedProjectId ? 'rounded-b-md' : ''} border-2 border-[#8c6c3f]`}>
              <div className="flex items-start gap-4">
                <button className="cursor-pointer" onClick={() => toggleProject(project.project_id)}>
                  <img
                    src={
                      expandedProjectId === project.project_id
                        ? "/down-arrow.svg"
                        : "/up-arrow.svg"
                    }
                    className="h-4 mt-0.5"
                  />
                </button>

                <div>
                  <h2 className={` font-medium sm:text-xl `}>
                    {project.project_name}
                  </h2>
                  <p className="text-[#b3741d] text-normal">
                    {project.client_name}
                  </p>
                </div>
              </div>

              <div className="flex gap-10">
                <div>
                  <p className="text-[#8c6c3f] text-sm">Estimated Budget</p>
                  <p>
                    AED{" "}
                    {Number(project.estimated_budget).toLocaleString("en-AE")}
                  </p>
                </div>
                <div>
                  <p className="text-[#8c6c3f] text-sm">Remaining Budget</p>
                  <p className="text-green-400 font-medium">
                    AED{" "}
                      {(
                        project.estimated_budget -
                        getTotalExpenses(project.project_id)
                      ).toLocaleString("en-AE")}
                  </p>
                </div>
              </div>
            </div>

            {/* Expenses Section */}
            {expandedProjectId === project.project_id && (
              <div className="bg-[#201f1f] rounded-b-md p-4 flex flex-col border-b-2 border-x-2 border-[#8c6c3f]">
                <div className="flex flex-row justify-between w-full max-w-210 gap-3 p-4">
                  <div>
                    <h3>Estimated Budget</h3>
                    <p>{Number(project.estimated_budget).toLocaleString("en-AE")}</p>
                  </div>
                  <div>
                    <h3>Total Expenses</h3>
                    <p>
                      AED{" "}
                      {(
                        getTotalExpenses(project.project_id)
                      ).toLocaleString("en-AE")}
                    </p>
                  </div> 
                  <div>
                    <h3>Remaining Budget</h3>
                    <p className="text-green-400">
                      AED{" "}
                      {(
                        project.estimated_budget -
                        getTotalExpenses(project.project_id)
                      ).toLocaleString("en-AE")}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4">
                  <h3 className="text-lg font-medium">Expenses</h3>
                  <button 
                    className="text-[#b3741d] px-3 py-1 border border-[#b3741d] rounded-md bg-[#b3751d21] cursor-pointer hover:bg-[#b3751d69]"
                    onClick={() => setShowExpensePopup(true)}
                  >
                    + Add Expense
                  </button>
                </div>
                
                {showExpensePopup ?
                  <div>
                    <div className="flex flex-row justify-between w-full gap-5">
                      <input
                        className="w-1/3 bg-[#c89d6024] border-[#8c6c3f] border-2 rounded-md p-2 focus:outline-none"
                        type="text"
                        placeholder="Enter description"
                        value={expenseDescription}
                        onChange={(e) => setExpenseDescription(e.target.value)}
                      />
                      <input
                        className="w-1/3 bg-[#c89d6024] border-[#8c6c3f] border-2 rounded-md p-2 focus:outline-none"
                        type="text"
                        placeholder="0.00"
                        value={expenseAmount}
                        onChange={(e) => setExpenseAmount(e.target.value)}
                      />
                      <select 
                        className="w-1/3 bg-[#c89d6024] border-[#8c6c3f] border-2 rounded-md p-2 focus:outline-none"
                        value={expenseCategory}
                        onChange={(e) => setExpenseCategory(e.target.value)}
                      >
                        <option className="text-black">Select Category</option>
                        <option className="text-black">Material</option>
                        <option className="text-black">Labor</option>
                        <option className="text-black">Other</option>
                      </select>
                    </div>
                    <div className="flex flex-row gap-3 mt-10 justify-end">
                      <button 
                        onClick={() => setShowExpensePopup(false)}
                        className="text-[#b3741d] px-3 py-1 border border-[#b3741d] rounded-md bg-[#b3751d21] cursor-pointer hover:bg-[#b3751d69]"
                      >
                        Cancel
                      </button>
                      <button
                         onClick={() => addExpensehandler(project.project_id)}
                         className="px-3 py-1 bg-[#b3741d] rounded-md hover:bg-[#b3751d69] cursor-pointer"
                      >
                        Add Expense
                      </button>
                    </div>
                  </div>
                  :
                  <div>
                    <div className="flex justify-between items-start p-3 w-full">
                      <div className="flex items-start justify-between w-full max-w-3/4">
                        <p className="w-1/4 text-sm text-[#8c6c3f]">Description</p>
                        <p className="w-1/4 text-sm text-[#8c6c3f]">Category</p>
                        <p className="w-1/4 text-sm text-[#8c6c3f]">Amount</p>
                      </div>
                      <div className="flex gap-2">
                        <img src='/edit.svg' className="h-5 hidden"/>
                        <img src='/delete.svg' className="h-5.5 hidden"/>
                      </div>
                    </div>
                    {expensesByProject[project.project_id]?.length > 0 ? (
                      expensesByProject[project.project_id].map((expense) => (
                        <div className="flex justify-between items-start border border-[#8c6c3f] p-3 bg-[#c89d6024] w-full">
                          <div className="flex justify-between items-start w-full max-w-3/4">
                            <div className="w-1/4">{expense.description}</div>
                            <div className="w-1/4">{expense.category}</div>
                            <div className="w-1/4">AED {Number(expense.amount).toLocaleString("en-AE")}</div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              className="cursor-pointer transition-all hover:scale-110 duration-200"
                              onClick={() => {
                                setEditingExpenseId(expense.expense_id);
                                setExpenseDescription(expense.description);
                                setExpenseAmount(expense.amount);
                                setExpenseCategory(expense.category);
                                setShowExpensePopup(true);
                              }}
                            >
                              <img src='/edit.svg' className="h-5"/>
                            </button>

                            <button
                              className="cursor-pointer transition-all hover:scale-110 duration-200"
                              onClick={() =>
                                deleteExpenseHandler(expense.expense_id, project.project_id)
                              }
                            >
                              <img src='/delete.svg' className="h-5.5"/>
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400">
                        No expenses found for this project.
                      </p>
                    )}
                  </div>
                }
              </div>
            )}
          </div>
        ))}
      </div>
      {showProjectPopup && (
        <>
          {/* Background Overlay */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"></div>

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <div className="bg-[#2b2b2b] border-2 border-[#8c6c3f] rounded-lg p-6 w-full max-w-120">
              <h2 className="text-xl font-medium mb-6">Add Project</h2>

              <div className="flex flex-col gap-6 min-w-40 max-w-120">
                <div className="flex flex-col">
                  <label className="text-[#b3741d]">Project Name</label>
                  <input
                    className="bg-[#c89d6024] border-[#8c6c3f] border-2 rounded-md p-2 focus:outline-none"
                    placeholder="Enter Project Name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[#b3741d]">Client Name</label>
                  <input
                    className="bg-[#c89d6024] border-[#8c6c3f] border-2 rounded-md p-2 focus:outline-none"
                    placeholder="Enter Client Name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[#b3741d]">Estimated Budget</label>
                  <input
                    type="number"
                    className="bg-[#c89d6024] border-[#8c6c3f] border-2 rounded-md p-2 focus:outline-none"
                    placeholder="0.00"
                    value={projectBudget}
                    onChange={(e) => setProjectBudget(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowProjectPopup(false)}
                  className="text-[#b3741d] px-3 py-1 border border-[#b3741d] rounded-md bg-[#b3751d21] hover:bg-[#b3751d69] cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  onClick={addProjectHandler}
                  className="px-3 py-1 bg-[#b3741d] rounded-md hover:bg-[#b3751d69] cursor-pointer"
                >
                  Save Project
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
