import React, { useState } from 'react'

export default function ForgotPassword({ onBack, onLogin }) {
  const [email, setEmail] = useState('')
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
                <h1>Forgot Password?</h1>
                <p>Enter your email to receive a reset link.</p>
              </div>
            </div>

            <button className="link-button" type="button" onClick={onBack}>
              Back to Home
            </button>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
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

            <div className="login-actions">
              <button className="btn-primary-dark login-submit" type="submit">
                Send Reset Link
              </button>
              <button type="button" className="login-forgot" onClick={onLogin}>
                Remembered your password?
              </button>
            </div>

            {submitted && (
              <div className="login-success">Reset link sent — this is a demo flow.</div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
