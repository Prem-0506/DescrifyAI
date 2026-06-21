import React, { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="app-header">
      <div className="container">
        <div className="header-content">
          <a href="#" className="logo-container">
            <div className="logo-icon">
              <div className="logo-circle-1"></div>
              <div className="logo-circle-2"></div>
            </div>
            <span>DescrifyAI</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#use-cases" className="nav-link">Use Cases</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>

          <div className="header-actions">
            <button className="btn-login" type="button">Log in</button>
            <button className="btn-teal" type="button">Get Started — It's Free</button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <button 
            className="mobile-nav-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            type="button"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1rem 0 1.5rem 0',
            borderTop: '1px solid var(--color-border)',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <a href="#features" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#how-it-works" className="nav-link" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
            <a href="#use-cases" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Use Cases</a>
            <a href="#contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <button className="btn-login" style={{ paddingLeft: 0 }} type="button">Log in</button>
              <button className="btn-teal" style={{ padding: '0.5rem 1rem' }} type="button">Get Started</button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
