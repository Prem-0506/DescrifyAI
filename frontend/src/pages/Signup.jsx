import React, { useState } from 'react'

export default function Signup({ onBack, onLogin }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2500)
  }

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
                <h1>Create Account</h1>
                <p>Start generating premium food descriptions in seconds.</p>
              </div>
            </div>

            <button className="link-button" type="button" onClick={onBack}>
              Back to Home
            </button>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="field-label">
              Full Name
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                placeholder="Your full name"
              />
            </label>

            <label className="field-label">
              Email Address
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                placeholder="chef@descrify.ai"
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
                  placeholder="Create a password"
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
              <button className="btn-primary-dark login-submit" type="submit">
                Create Account
              </button>
              <button type="button" className="login-forgot" onClick={onLogin}>
                Already have an account?
              </button>
            </div>

            {submitted && (
              <div className="login-success">Account created — this is a demo flow.</div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
