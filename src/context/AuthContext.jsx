import { createContext, useEffect, useMemo, useState } from "react";
import api from "../api/axios";

export const authcontext = createContext(null);

const AuthContext = (props) => {
  const [user, setUser] = useState(() => {
    const raw = window.localStorage.getItem("auth_user");
    return raw ? JSON.parse(raw) : null;
  });

  const isAuthenticated = !!user;

  // keep localStorage in sync
  useEffect(() => {
    if (user) {
      window.localStorage.setItem("auth_user", JSON.stringify(user));
    } else {
      window.localStorage.removeItem("auth_user");
    }
  }, [user]);

  // ✅ Real backend login
  const login = async (email, password) => {
    try {
      const res = await api.post("/api/auth/user/login", { email, password });
      const data = res.data;

      // backend should return { user, token } or { user }
      setUser(data.user || data);
      return { ok: true };
    } catch (err) {
      console.error("Login failed:", err);
      const message =
        err.response?.data?.message || "Invalid email or password.";
      return { ok: false, message };
    }
  };

  // ✅ Real backend register
  const register = async (name, email, password, mobile) => {
    try {
      const res = await api.post("/api/auth/user/register", { fullname: name, email, password, mobile });
      const data = res.data;

      setUser(data.user || data);
      return { ok: true };
    } catch (err) {
      console.error("Register failed:", err);
      const message =
        err.response?.data?.message || "Registration failed.";
      return { ok: false, message };
    }
  };

  // ✅ Real backend logout
  const logout = async () => {
    try {
      await api.post("/api/auth/user/logout"); // optional, if backend supports it
    } catch (err) {
      console.warn("Logout request failed:", err);
    }
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      register,
      logout,
    }),
    [user, isAuthenticated]
  );

  return (
    <authcontext.Provider value={value}>
      {props.children}
    </authcontext.Provider>
  );
};

export default AuthContext;
