import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Login.css";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      return;
    }

    const result = login(email, password);
    if (!result.success) setError(result.message);
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="brand-badge">EMS</div>
        <h1>Employee Management System</h1>
        <p className="login-subtitle">Sign in to manage your work and tasks.</p>

        <form onSubmit={handleLogin} className="login-form">
          {error && <p className="error">{error}</p>}

          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        <div className="demo-credentials">
          <strong>Demo accounts</strong>
          <span>Admin: admin@ems.com / admin123</span>
          <span>Employee: ali@ems.com / employee123</span>
        </div>
      </section>
    </main>
  );
}

export default Login;
