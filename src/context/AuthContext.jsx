import { createContext, useContext, useState } from "react";
import { getCurrentUser, getUsers, saveCurrentUser } from "../utilities/localStorage.jsx";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getCurrentUser);

  const login = (email, password) => {
    const foundUser = getUsers().find(
      (item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password
    );

    if (!foundUser) return { success: false, message: "Invalid email or password." };

    const safeUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
    };

    saveCurrentUser(safeUser);
    setUser(safeUser);
    return { success: true };
  };

  const logout = () => {
    saveCurrentUser(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
