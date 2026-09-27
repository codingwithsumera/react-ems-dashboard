import Login from "./components/Auth/Login";

function App() {
  return (
    <div>
      <h1>Employee Management System</h1>

      <Login
        title="Employee Login"
        message="Please enter your credentials to continue"
      />
    </div>
  );
}

export default App;
