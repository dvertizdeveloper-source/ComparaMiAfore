import { useState } from "react";
import { isAuthenticated, login, logout } from "./lib/auth";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";

export default function App() {
  const [authed, setAuthed] = useState(isAuthenticated());
  const [checking, setChecking] = useState(false);

  async function handleLogin(apiKey: string) {
    setChecking(true);
    const ok = await login(apiKey);
    setChecking(false);
    if (ok) setAuthed(true);
    return ok;
  }

  function handleLogout() {
    logout();
    setAuthed(false);
  }

  if (!authed) {
    return <LoginPage onLogin={handleLogin} loading={checking} />;
  }

  return <DashboardPage onLogout={handleLogout} />;
}
