function NewTask({ task, onAccept }) {
  return (
    <article className="employee-task">
      <div className="task-main">
        <div className="task-title-line">
          <h3>{task.title}</h3>
          <span className="status status-new">new</span>
        </div>
        <p>{task.description || "No description provided."}</p>
        <div className="task-meta">
          <span>Priority: {task.priority}</span>
          <span>Due: {task.dueDate}</span>
        </div>
      </div>
      <div className="button-group">
        <button onClick={() => onAccept(task.id)}>Accept</button>
      </div>
    </article>
  );
}

export default NewTask;
