import { useState } from "react";
import Login from "./components/Auth/Login";
import Header from "./components/Layout/Header";
import ChatInterface from "./components/Chat/ChatInterface";
import { validateCredentials } from "./utils/validation";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  const handleLogin = (username: string, password: string) => {
    // Validate credentials against stored users
    const authResult = validateCredentials(username, password);

    if (authResult.success && authResult.user) {
      console.log("Login successful:", authResult.user);
      setUser(authResult.user.username);
      setIsLoggedIn(true);
    } else {
      console.log("Login failed:", authResult.message);
      // The error will be handled by the Login component
    }
  };

  const handleForgotPassword = () => {
    alert(
      "Forgot password functionality will be implemented in the next phase!"
    );
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const handleProfileClick = () => {
    alert("Profile settings will be implemented in the next phase!");
  };

  if (!isLoggedIn) {
    return (
      <Login onLogin={handleLogin} onForgotPassword={handleForgotPassword} />
    );
  }

  return (
    <div className="app-container">
      <Header
        user={user || "User"}
        onLogout={handleLogout}
        onProfileClick={handleProfileClick}
      />
      <ChatInterface user={user || "User"} onLogout={handleLogout} />
    </div>
  );
}

export default App;
