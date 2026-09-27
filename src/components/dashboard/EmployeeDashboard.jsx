import { useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useTasks } from "../../context/TaskContext.jsx";

function EmployeeDashboard() {
  const { user, logout } = useAuth();
  const { tasks, updateTaskStatus } = useTasks();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const myTasks = useMemo(() => tasks.filter((task) => task.assignedTo === user.id), [tasks, user.id]);
  const visibleTasks = myTasks.filter((task) => {
    const matchesFilter = filter === "all" || task.status === filter;
    return matchesFilter && task.title.toLowerCase().includes(search.trim().toLowerCase());
  });
  const stats = {
    total: myTasks.length, new: myTasks.filter((t) => t.status === "new").length,
    accepted: myTasks.filter((t) => t.status === "accepted").length,
    completed: myTasks.filter((t) => t.status === "completed").length,
    failed: myTasks.filter((t) => t.status === "failed").length,
  };

  return (
    <main className="dashboard">
      <header className="topbar">
        <div><p className="eyebrow">EMPLOYEE PORTAL</p><h1>Welcome, {user.name}</h1><p className="muted">Review your assignments and update their progress.</p></div>
        <button className="secondary-button" onClick={logout}>Logout</button>
      </header>

      <section className="stats-grid">
        {Object.entries(stats).map(([label, value]) => <article className="stat-card" key={label}><span>{label}</span><strong>{value}</strong></article>)}
      </section>

      <section className="panel">
        <div className="panel-heading"><div><p className="eyebrow">MY WORK</p><h2>Assigned tasks</h2></div><span className="count-pill">{visibleTasks.length} shown</span></div>
        <div className="toolbar">
          <input className="search-input" placeholder="Search your tasks..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}><option value="all">All statuses</option><option value="new">New</option><option value="accepted">Accepted</option><option value="completed">Completed</option><option value="failed">Failed</option></select>
        </div>
        <div className="task-list">
          {visibleTasks.length === 0 ? <p className="empty-state">No matching tasks.</p> : visibleTasks.map((task) => (
            <article className="employee-task" key={task.id}>
              <div className="task-main"><div className="task-title-line"><h3>{task.title}</h3><span className={`status status-${task.status}`}>{task.status}</span></div><p>{task.description || "No description provided."}</p><div className="task-meta"><span>Priority: {task.priority}</span><span>Due: {task.dueDate}</span></div></div>
              <div className="button-group">
                {task.status === "new" && <button onClick={() => updateTaskStatus(task.id, "accepted")}>Accept</button>}
                {(task.status === "accepted" || task.status === "failed") && <><button onClick={() => updateTaskStatus(task.id, "completed")}>Complete</button><button className="danger-button" onClick={() => updateTaskStatus(task.id, "failed")}>Failed</button></>}
                {task.status === "completed" && <span className="done-label">Completed ✓</span>}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default EmployeeDashboard;
