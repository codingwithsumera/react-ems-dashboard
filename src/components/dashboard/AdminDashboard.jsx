import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useTasks } from "../../context/TaskContext.jsx";
import { getUsers } from "../../utilities/localStorage.jsx";

function AdminDashboard() {
  const { user, logout } = useAuth();
  const { tasks, addTask, deleteTask } = useTasks();
  const employees = getUsers().filter((item) => item.role === "employee");

  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: employees[0]?.id || "",
    priority: "Medium",
    dueDate: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.assignedTo || !form.dueDate) return;

    const employee = employees.find((item) => item.id === form.assignedTo);
    addTask({ ...form, assignedToName: employee.name });
    setForm({
      title: "",
      description: "",
      assignedTo: employees[0]?.id || "",
      priority: "Medium",
      dueDate: "",
    });
  };

  const stats = {
    total: tasks.length,
    new: tasks.filter((task) => task.status === "new").length,
    accepted: tasks.filter((task) => task.status === "accepted").length,
    completed: tasks.filter((task) => task.status === "completed").length,
    failed: tasks.filter((task) => task.status === "failed").length,
  };

  return (
    <main className="dashboard">
      <header className="topbar">
        <div>
          <p className="eyebrow">ADMIN PORTAL</p>
          <h1>Welcome, {user.name}</h1>
        </div>
        <button className="secondary-button" onClick={logout}>Logout</button>
      </header>

      <section className="stats-grid">
        {Object.entries(stats).map(([label, value]) => (
          <article className="stat-card" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <article className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">TASK MANAGEMENT</p>
              <h2>Create a task</h2>
            </div>
          </div>

          <form className="task-form" onSubmit={handleSubmit}>
            <input
              placeholder="Task title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <textarea
              placeholder="Task description"
              rows="4"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <select
              value={form.assignedTo}
              onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
            >
              {employees.map((employee) => (
                <option value={employee.id} key={employee.id}>{employee.name}</option>
              ))}
            </select>
            <div className="form-row">
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              />
            </div>
            <button type="submit">Create & Assign Task</button>
          </form>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">TEAM</p>
              <h2>Employees</h2>
            </div>
            <span className="count-pill">{employees.length}</span>
          </div>
          <div className="employee-list">
            {employees.map((employee) => (
              <div className="employee-row" key={employee.id}>
                <div className="avatar">{employee.name[0]}</div>
                <div>
                  <strong>{employee.name}</strong>
                  <span>{employee.email}</span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">OVERVIEW</p>
            <h2>All tasks</h2>
          </div>
          <span className="count-pill">{tasks.length}</span>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-state">No tasks created yet.</p>
          ) : (
            tasks.map((task) => (
              <div className="task-row" key={task.id}>
                <div>
                  <strong>{task.title}</strong>
                  <p>{task.description || "No description provided."}</p>
                  <small>Assigned to {task.assignedToName} · Due {task.dueDate}</small>
                </div>
                <div className="task-actions">
                  <span className={`status status-${task.status}`}>{task.status}</span>
                  <span className="priority">{task.priority}</span>
                  <button className="danger-button" onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default AdminDashboard;
