const USERS_KEY = "ems_users";
const TASKS_KEY = "ems_tasks";
const CURRENT_USER_KEY = "ems_current_user";

const defaultUsers = [
  { id: "u1", name: "Admin", email: "admin@ems.com", password: "admin123", role: "admin" },
  { id: "u2", name: "Ali", email: "ali@ems.com", password: "employee123", role: "employee" },
  { id: "u3", name: "Sara", email: "sara@ems.com", password: "employee123", role: "employee" },
];

const defaultTasks = [
  {
    id: "t1",
    title: "Prepare monthly sales report",
    description: "Prepare the monthly sales report and submit it to the admin.",
    assignedTo: "u2",
    assignedToName: "Ali",
    priority: "High",
    dueDate: "2026-10-05",
    status: "new",
    createdAt: "2026-09-27",
  },
  {
    id: "t2",
    title: "Update employee records",
    description: "Review and update the employee records.",
    assignedTo: "u3",
    assignedToName: "Sara",
    priority: "Medium",
    dueDate: "2026-10-08",
    status: "accepted",
    createdAt: "2026-09-27",
  },
];

const read = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export const getUsers = () => {
  const users = read(USERS_KEY, null);
  if (users) return users;
  localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  return defaultUsers;
};

export const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

export const getTasks = () => {
  const tasks = read(TASKS_KEY, null);
  if (tasks) return tasks;
  localStorage.setItem(TASKS_KEY, JSON.stringify(defaultTasks));
  return defaultTasks;
};

export const saveTasks = (tasks) => localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));

export const getCurrentUser = () => read(CURRENT_USER_KEY, null);

export const saveCurrentUser = (user) =>
  user
    ? localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    : localStorage.removeItem(CURRENT_USER_KEY);
