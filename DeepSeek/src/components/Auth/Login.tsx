import React, { useState } from "react";
import type { FormEvent } from "react";
import {
  validateLoginFormWithCredentials,
  hasFormErrors,
} from "../../utils/validation";
import type { FormErrors } from "../../utils/validation";
import "./Login.css";

interface LoginProps {
  onLogin?: (username: string, password: string) => void;
  onForgotPassword?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onForgotPassword }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form with credentials
    const validationErrors = validateLoginFormWithCredentials(
      formData.username,
      formData.password
    );
    setErrors(validationErrors);

    // If there are errors, don't submit
    if (hasFormErrors(validationErrors)) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Call the onLogin callback if provided
      if (onLogin) {
        onLogin(formData.username, formData.password);
      } else {
        // Default behavior - show success message
        alert("Login successful! (This is a demo)");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (onForgotPassword) {
      onForgotPassword();
    } else {
      alert("Forgot password feature coming soon!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">CypherX</h1>
          <p className="login-subtitle">AI-Powered Chatbot Experience</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={`form-input ${errors.username ? "error" : ""}`}
              placeholder="Enter your username"
              autoComplete="username"
            />
            {errors.username && (
              <div className="form-error">{errors.username}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-input ${errors.password ? "error" : ""}`}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {errors.password && (
              <div className="form-error">{errors.password}</div>
            )}
          </div>

          {/* Display credential validation error */}
          {errors.credentials && (
            <div className="form-group">
              <div className="form-error credentials-error">
                {errors.credentials}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary login-button"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          <button
            type="button"
            className="btn btn-secondary forgot-password-button"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
        </form>

        <div className="login-footer">
          <p>Welcome to the future of AI conversation</p>

          {/* Development credentials display */}
          <details className="dev-credentials">
            <summary>Test Credentials (Development)</summary>
            <div className="credentials-list">
              <div className="credential-item">
                <strong>Admin:</strong> admin / Admin123!
              </div>
              <div className="credential-item">
                <strong>Test User:</strong> testuser / Test123!
              </div>
              <div className="credential-item">
                <strong>Demo:</strong> demo / Demo123!
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default Login;
