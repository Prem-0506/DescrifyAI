import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import "./login.css"

export default function Login({ onBack, onForgotPassword, onLoginSuccess }) {
  const [email, setEmail] = useState('chef@descrify.ai')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate();
  const handleSubmit = (event) => {
  event.preventDefault();

  setSubmitted(true);

  setTimeout(() => {
    setSubmitted(false);
    navigate("/dashboard");
  }, 600);
};

  return (
    <div className="login-page">
      <div className="login-blur-top" />
      <div className="login-blur-bottom" />

      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <div className="login-brand">
              <div className="login-brand-icon">
                <span />
                <span />
              </div>
              <div>
                <h1>Welcome Back</h1>
                <p>Elevate your culinary descriptions with AI.</p>
              </div>
            </div>

            <button className="link-button" type="button" onClick={onBack}>
              Back to Home
            </button>
          </div>

          <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
            <label className="field-label">
              Email Address
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                placeholder="chef@descrifyai.com"
              />
            </label>

            <label className="field-label password-field">
              <span>Password</span>
              <div className="password-input-row">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>

            <div className="login-actions">
              <button className="btn-primary-dark login-submit" type="submit" onClick={() => navigate("/dashboard")}>
                Log In
              </button>
              <button type="button" className="login-forgot" onClick={() => navigate("/forgot-password")}>
                Forgot Password?
              </button>
            </div>

            {submitted && (
              <div className="login-success">Login request submitted — this is a demo page.</div>
            )}
          </form>

          <div className="login-divider">OR CONNECT WITH</div>

          <button type="button" className="btn-google">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21.35 11.1H12v2.8h5.6c-.28 1.6-1.38 2.9-2.95 3.55v2.95h4.75c2.8-2.6 4.4-6.4 4.4-10.85 0-.72-.06-1.42-.16-2.1z" fill="#4285F4" />
              <path d="M12 22c2.43 0 4.48-.8 5.97-2.17l-4.75-2.95c-1.32.88-3 .93-4.37.12-1.33-.8-2.12-2.24-2.12-3.82 0-1.6.8-3.04 2.12-3.84V6.3H5.09A9.98 9.98 0 002 11.98c0 2.7 1.03 5.2 2.87 7.03C6.7 21.02 9.24 22 12 22z" fill="#34A853" />
              <path d="M6.92 13.9a5.99 5.99 0 010-3.85V6.3H2.92a9.98 9.98 0 000 11.4l4-3.8z" fill="#FBBC05" />
              <path d="M12 4.4c1.33 0 2.53.46 3.48 1.37l2.6-2.6C16.48 1.6 14.43 1 12 1 9.24 1 6.7 1.98 4.87 3.8l4 3.8A5.92 5.92 0 0112 4.4z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  )
}
