import "./App.css";
import Login from "./components/Auth/Login.jsx";
import AdminDashboard from "./components/dashboard/AdminDashboard.jsx";
import EmployeeDashboard from "./components/dashboard/EmployeeDashboard.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";

function AppContent() {
  const { user } = useAuth();

  if (!user) return <Login />;
  return user.role === "admin" ? <AdminDashboard /> : <EmployeeDashboard />;
}

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <AppContent />
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
