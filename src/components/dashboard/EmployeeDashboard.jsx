import { useAuth } from "../../context/AuthContext.jsx";
import { useTasks } from "../../context/TaskContext.jsx";

function EmployeeDashboard() {
  const { user, logout } = useAuth();
  const { tasks, updateTaskStatus } = useTasks();
  const myTasks = tasks.filter((task) => task.assignedTo === user.id);

  const stats = {
    total: myTasks.length,
    new: myTasks.filter((task) => task.status === "new").length,
    accepted: myTasks.filter((task) => task.status === "accepted").length,
    completed: myTasks.filter((task) => task.status === "completed").length,
    failed: myTasks.filter((task) => task.status === "failed").length,
  };

  const action = (taskId, status) => updateTaskStatus(taskId, status);

  return (
    <main className="dashboard">
      <header className="topbar">
        <div>
          <p className="eyebrow">EMPLOYEE PORTAL</p>
          <h1>Welcome, {user.name}</h1>
          <p className="muted">Here are the tasks assigned to you.</p>
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

      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">MY WORK</p>
            <h2>Assigned tasks</h2>
          </div>
          <span className="count-pill">{myTasks.length}</span>
        </div>

        <div className="task-list">
          {myTasks.length === 0 ? (
            <p className="empty-state">You don't have any tasks right now.</p>
          ) : (
            myTasks.map((task) => (
              <article className="employee-task" key={task.id}>
                <div className="task-main">
                  <div className="task-title-line">
                    <h3>{task.title}</h3>
                    <span className={`status status-${task.status}`}>{task.status}</span>
                  </div>
                  <p>{task.description || "No description provided."}</p>
                  <div className="task-meta">
                    <span>Priority: {task.priority}</span>
                    <span>Due: {task.dueDate}</span>
                  </div>
                </div>

                <div className="button-group">
                  {task.status === "new" && (
                    <button onClick={() => action(task.id, "accepted")}>Accept</button>
                  )}
                  {(task.status === "accepted" || task.status === "failed") && (
                    <>
                      <button onClick={() => action(task.id, "completed")}>Complete</button>
                      <button className="danger-button" onClick={() => action(task.id, "failed")}>Failed</button>
                    </>
                  )}
                  {task.status === "completed" && <span className="done-label">Completed ✓</span>}
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default EmployeeDashboard;
