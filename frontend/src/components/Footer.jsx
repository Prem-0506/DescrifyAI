import React from 'react'

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="container">
        <div className="footer-content">
          {/* Left Side: Contact Information */}
          <div className="footer-left">
            <a href="mailto:info@descrifyai.com" className="footer-item">
              <span className="footer-item-icon">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </span>
              info@descrifyai.com
            </a>
            <a href="tel:+918309798009" className="footer-item">
              <span className="footer-item-icon">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </span>
              +91 9999999999
            </a>
          </div>

          {/* Middle Side: Legal Links */}
          <div className="footer-middle">
            <a href="#" className="footer-link">Terms & Conditions</a>
            <span className="footer-dot">·</span>
            <a href="#" className="footer-link">Privacy Policy</a>
          </div>

          {/* Right Side: Copyright */}
          <div className="footer-right">
            <span>
              © 2026 <span className="footer-brand">DescrifyAI</span>. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
