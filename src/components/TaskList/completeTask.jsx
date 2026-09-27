function CompleteTask({ task }) {
  return (
    <article className="employee-task">
      <div className="task-main">
        <div className="task-title-line">
          <h3>{task.title}</h3>
          <span className="status status-completed">completed</span>
        </div>
        <p>{task.description || "No description provided."}</p>
        <div className="task-meta">
          <span>Priority: {task.priority}</span>
          <span>Due: {task.dueDate}</span>
        </div>
      </div>
      <span className="done-label">Completed ✓</span>
    </article>
  );
}

export default CompleteTask;
