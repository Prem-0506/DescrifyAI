import React, { useState } from 'react'
import { generateProductDescription } from '../services/api'
import { copyToClipboard } from '../utils/helpers'

export default function Home() {
  // Form input states
  const [productName, setProductName] = useState('Chocolate Protein Cookie')
  const [ingredients, setIngredients] = useState('Oats, Whey Protein, Cocoa, Dark Chocolate, Honey')
  const [flavorProfile, setFlavorProfile] = useState('Rich, Chocolatey, Slightly Sweet')
  const [targetAudience, setTargetAudience] = useState('Fitness Enthusiasts, Healthy Eaters')
  
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(
    'A delicious fusion of rich cocoa and premium protein to fuel your day. Our Chocolate Protein Cookie is soft, wholesome, and packed with nutrition—perfect for a post-workout boost or a healthy snack on the go.'
  )
  const [copied, setCopied] = useState(false)
  const [feedback, setFeedback] = useState(null) // 'up' or 'down'

  // Contact form states
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [contactSubmitted, setContactSubmitted] = useState(false)

  const handleGenerate = async (e) => {
    e.preventDefault()
    if (!productName || !ingredients) return

    setIsLoading(true)
    setResult('')
    setCopied(false)
    setFeedback(null)

    try {
      const description = await generateProductDescription({
        productName,
        ingredients,
        keyFeatures: `${flavorProfile ? 'Flavor: ' + flavorProfile + '. ' : ''}${targetAudience ? 'Audience: ' + targetAudience : ''}`,
        tone: 'premium'
      })
      setResult(description)
    } catch (err) {
      setResult('Failed to generate description. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!result) return
    const success = await copyToClipboard(result)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setContactSubmitted(true)
    setTimeout(() => {
      setContactSubmitted(false)
      setContactName('')
      setContactEmail('')
      setContactMessage('')
    }, 3000)
  }

  return (
    <div className="landing-page">
      {/* Decorative Blur Blobs */}
      <div className="blob-decorator blob-purple"></div>
      <div className="blob-decorator blob-teal"></div>
      <div className="blob-decorator blob-blue"></div>

      {/* Hero Wrapper */}
      <section className="hero-wrapper">
        <div className="container">
          <div className="hero-grid-layout">
            <div className="hero-content">
              <div className="hero-badge">
                <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '12px', height: '12px' }}>
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 011.707-.707l1 1a1 1 0 010 1.414l-1 1A1 1 0 0112 3V2z" clipRule="evenodd" />
                </svg>
                AI-POWERED FOOD DESCRIPTION GENERATOR
              </div>
              <h1 className="hero-title">
                Elevate Your <span>Product Story.</span>
                <span className="highlight">Instantly.</span>
              </h1>
              <p className="hero-subtitle">
                Generate rich, SEO-friendly food descriptions that attract customers and boost sales — in seconds.
              </p>
              
              <div className="hero-features">
                <div className="hero-feat-tag">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  SEO Optimized
                </div>
                <div className="hero-feat-tag">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  AI-Powered
                </div>
                <div className="hero-feat-tag">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Save Hours
                </div>
              </div>

              <div className="hero-actions">
                <button className="btn-primary-dark" type="button">
                  Start Generating — It's Free
                  <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '16px', height: '16px' }}>
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <a href="#how-it-works" className="btn-watch">
                  <div className="btn-watch-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  See How It Works
                </a>
              </div>
            </div>

            {/* Hero Graphics Visual Mockup */}
            <div className="hero-graphics">
              <div className="graphic-blur-bg"></div>

              {/* Floating Inputs Card */}
              <div className="float-card-inputs">
                <h4>Your Product</h4>
                <div className="input-field-stub">
                  <label>Ingredients</label>
                  <div>Oats, Whey Protein, Almonds, Cocoa, Honey</div>
                </div>
                <div className="input-field-stub">
                  <label>Flavor Profile</label>
                  <div>Rich, Chocolatey, Nutty</div>
                </div>
                <div className="input-field-stub">
                  <label>Target Audience</label>
                  <div>Fitness Enthusiasts</div>
                </div>
              </div>

              {/* Floating Generated Card */}
              <div className="float-card-desc">
                <div className="float-card-desc-header">
                  <h4>
                    <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '12px', height: '12px' }}>
                      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 011.707-.707l1 1a1 1 0 010 1.414l-1 1A1 1 0 0112 3V2z" clipRule="evenodd" />
                    </svg>
                    AI Generated Description
                  </h4>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: '12px', height: '12px', color: '#9ca3af' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </div>
                <p>
                  A rich and wholesome blend of protein-packed oats, real almonds, and natural cocoa. Perfect for a healthy breakfast or a post-workout boost to keep you energized all day.
                </p>
                <div className="float-card-desc-tags">
                  <span className="float-card-tag">SEO Optimized</span>
                  <span className="float-card-tag" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>Ready to Use</span>
                </div>
              </div>

              {/* Floating Chart Badge */}
              <div className="float-badge-chart">
                <div className="float-badge-chart-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="float-badge-chart-bars">
                  <div className="chart-bar fill" style={{ height: '15px' }}></div>
                  <div className="chart-bar fill" style={{ height: '22px' }}></div>
                  <div className="chart-bar fill" style={{ height: '18px' }}></div>
                  <div className="chart-bar fill" style={{ height: '28px' }}></div>
                </div>
              </div>

              {/* Floating SEO Badge */}
              <div className="float-badge-score">
                <div className="float-badge-score-ring"></div>
                <span className="float-badge-score-val">92</span>
                <span className="float-badge-score-lbl">SEO Score</span>
              </div>

              {/* Floating Sparkle Icon */}
              <div className="float-badge-sparkle">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.5 2C11.5 2 12.3 8.3 14 10C15.7 11.7 22 12.5 22 12.5C22 12.5 15.7 13.3 14 15C12.3 16.7 11.5 23 11.5 23C11.5 23 10.7 16.7 9 15C7.3 13.3 1 12.5 1 12.5C1 12.5 7.3 11.7 9 10C10.7 8.3 11.5 2 11.5 2Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Wrapper */}
      <section className="features-wrapper" id="features">
        <div className="container">
          <div className="section-header">
            <p className="section-subtitle">Powerful Features</p>
            <h2 className="section-title">Everything You Need to Create Irresistible Food Descriptions</h2>
          </div>

          <div className="features-grid">
            {/* Card 1: Recipe Inputs */}
            <div className="feat-card">
              <div className="feat-icon-wrapper">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3>Recipe Inputs</h3>
              <p>Add ingredients, steps, and key details. Our AI turns them into compelling product descriptions.</p>
            </div>

            {/* Card 2: Flavor Profiles */}
            <div className="feat-card">
              <div className="feat-icon-wrapper" style={{ backgroundColor: '#f0fdf4', color: '#10b981' }}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3>Flavor Profiles</h3>
              <p>Highlight taste, aroma, texture, and experience that makes your product unique.</p>
            </div>

            {/* Card 3: SEO Optimized */}
            <div className="feat-card">
              <div className="feat-icon-wrapper" style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3>SEO Optimized</h3>
              <p>Descriptions optimized for search engines to improve visibility and drive traffic.</p>
            </div>

            {/* Card 4: Multi-language */}
            <div className="feat-card">
              <div className="feat-icon-wrapper" style={{ backgroundColor: '#ecfeff', color: '#06b6d4' }}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3>Multi-language</h3>
              <p>Generate descriptions in multiple languages to reach global customers.</p>
            </div>

            {/* Card 5: Save Time */}
            <div className="feat-card">
              <div className="feat-icon-wrapper" style={{ backgroundColor: '#fff7ed', color: '#f97316' }}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3>Save Time</h3>
              <p>Create high-quality, ready-to-use content in seconds, not hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section (How It Works) */}
      <section className="demo-wrapper" id="how-it-works">
        <div className="container">
          <div className="demo-layout">
            <div className="demo-info">
              <p className="section-subtitle">SEE DESCRIFYAI IN ACTION</p>
              <h3>From Ingredients to Irresistible Descriptions in Seconds</h3>
              <p>Describe your product with simple inputs and let our AI craft engaging, conversion-ready content that connects with your customers.</p>
              
              <div className="demo-checklist">
                <div className="demo-check-item">
                  <svg fill="currentColor" viewBox="0 0 20 20" style={{ width: '18px', height: '18px' }}>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Describe your product
                </div>
                <div className="demo-check-item">
                  <svg fill="currentColor" viewBox="0 0 20 20" style={{ width: '18px', height: '18px' }}>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  AI generates content
                </div>
                <div className="demo-check-item">
                  <svg fill="currentColor" viewBox="0 0 20 20" style={{ width: '18px', height: '18px' }}>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Review and copy instantly
                </div>
              </div>
            </div>

            {/* Interactive Workspace Grid */}
            <div className="demo-workspace">
              {/* Inputs Panel */}
              <div className="demo-panel">
                <h4 className="demo-panel-title">Your Inputs</h4>
                <form onSubmit={handleGenerate} className="demo-input-card">
                  <div className="demo-field">
                    <label className="demo-label" htmlFor="demo-name">Product Name</label>
                    <input
                      id="demo-name"
                      type="text"
                      className="demo-input"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="Chocolate Protein Cookie"
                      required
                    />
                  </div>

                  <div className="demo-field">
                    <label className="demo-label" htmlFor="demo-ing">Ingredients</label>
                    <textarea
                      id="demo-ing"
                      className="demo-input demo-textarea"
                      value={ingredients}
                      onChange={(e) => setIngredients(e.target.value)}
                      placeholder="Oats, Whey Protein, Cocoa, Dark Chocolate, Honey"
                      required
                    />
                  </div>

                  <div className="demo-field">
                    <label className="demo-label" htmlFor="demo-flavor">Flavor Profile</label>
                    <input
                      id="demo-flavor"
                      type="text"
                      className="demo-input"
                      value={flavorProfile}
                      onChange={(e) => setFlavorProfile(e.target.value)}
                      placeholder="Rich, Chocolatey, Slightly Sweet"
                    />
                  </div>

                  <div className="demo-field">
                    <label className="demo-label" htmlFor="demo-aud">Target Audience</label>
                    <input
                      id="demo-aud"
                      type="text"
                      className="demo-input"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      placeholder="Fitness Enthusiasts, Healthy Eaters"
                    />
                  </div>

                  <button
                    type="submit"
                    className="demo-generate-btn"
                    disabled={isLoading || !productName || !ingredients}
                  >
                    {isLoading ? 'Generating...' : 'Generate Description ✨'}
                  </button>
                </form>
              </div>

              {/* Generated Description Output Panel */}
              <div className="demo-panel">
                <h4 className="demo-panel-title">AI Generated Description</h4>
                <div className="demo-output-card">
                  <div className="demo-output-container">
                    {isLoading && (
                      <div className="loading-indicator">
                        <span style={{ fontSize: '1.5rem' }}>🍦</span>
                        <span style={{ fontSize: '0.75rem' }}>Writing your recipe copy...</span>
                      </div>
                    )}

                    {!isLoading && !result && (
                      <div className="demo-output-empty">
                        Enter ingredients and click Generate.
                      </div>
                    )}

                    {!isLoading && result && (
                      <div className="demo-output-text">{result}</div>
                    )}
                  </div>

                  {result && !isLoading && (
                    <div className="demo-output-meta">
                      <span className="demo-char-count">Characters: {result.length}</span>
                      <div className="demo-actions">
                        <button
                          className="demo-icon-btn"
                          type="button"
                          onClick={() => setFeedback('up')}
                          style={{ color: feedback === 'up' ? '#10b981' : '' }}
                          title="Thumb Up"
                        >
                          <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '12px', height: '12px' }}>
                            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a2 2 0 00-.8 2.4z" />
                          </svg>
                        </button>
                        <button
                          className="demo-icon-btn"
                          type="button"
                          onClick={() => setFeedback('down')}
                          style={{ color: feedback === 'down' ? '#ef4444' : '' }}
                          title="Thumb Down"
                        >
                          <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '12px', height: '12px' }}>
                            <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.106-1.79l-.05-.025A4 4 0 0011.057 2H5.641a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a2 2 0 00.8-2.4z" />
                          </svg>
                        </button>
                        <button
                          className="demo-icon-btn"
                          type="button"
                          onClick={handleCopy}
                          title="Copy to Clipboard"
                        >
                          {copied ? '✓' : (
                            <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '12px', height: '12px' }}>
                              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Score Section */}
                  <div className="demo-score-section">
                    <div className="score-circle-wrapper">
                      <svg className="score-circle-svg">
                        <circle className="score-circle-bg" cx="27" cy="27" r="23" />
                        <circle className="score-circle-bar" cx="27" cy="27" r="23" />
                      </svg>
                      <div className="score-number">
                        <span className="score-number-val">92</span>
                        <span className="score-number-max">/100</span>
                      </div>
                    </div>
                    <div className="score-criteria">
                      <div className="score-crit-item">
                        <span>Keyword Optimized</span>
                        <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '12px', height: '12px' }}>
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="score-crit-item">
                        <span>Readability</span>
                        <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '12px', height: '12px' }}>
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="score-crit-item">
                        <span>Engagement</span>
                        <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '12px', height: '12px' }}>
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section (Use Cases) */}
      <section className="audience-wrapper" id="use-cases">
        <div className="container">
          <div className="section-header">
            <p className="section-subtitle">Perfect for Every Food Business</p>
            <h2 className="section-title">Designed for Food Brands, Creators & Sellers</h2>
          </div>

          <div className="audience-grid">
            {/* Card 1: E-commerce Sellers */}
            <div className="audience-card">
              <div className="audience-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div className="audience-card-info">
                <span className="audience-card-title">E-commerce Sellers</span>
                <span className="audience-card-desc">Create listings that convert.</span>
              </div>
            </div>

            {/* Card 2: Food Brands */}
            <div className="audience-card">
              <div className="audience-icon" style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="audience-card-info">
                <span className="audience-card-title">Food Brands</span>
                <span className="audience-card-desc">Showcase your products with the right words.</span>
              </div>
            </div>

            {/* Card 3: DTC Brands */}
            <div className="audience-card">
              <div className="audience-icon" style={{ backgroundColor: '#fdf2f8', color: '#db2777' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="audience-card-info">
                <span className="audience-card-title">DTC Brands</span>
                <span className="audience-card-desc">Build a strong brand with better copy.</span>
              </div>
            </div>

            {/* Card 4: Recipe Creators */}
            <div className="audience-card">
              <div className="audience-icon" style={{ backgroundColor: '#fdf4ff', color: '#c084fc' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="audience-card-info">
                <span className="audience-card-title">Recipe Creators</span>
                <span className="audience-card-desc">Turn recipes into content that engages.</span>
              </div>
            </div>

            {/* Card 5: Local Food Businesses */}
            <div className="audience-card">
              <div className="audience-icon" style={{ backgroundColor: '#fffbeb', color: '#d97706' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="audience-card-info">
                <span className="audience-card-title">Local Food Businesses</span>
                <span className="audience-card-desc">Attract more customers online.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section Wrapper */}
      <section className="contact-wrapper" id="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-block">
              <p className="section-subtitle">GET IN TOUCH</p>
              <h3>Have Questions? Let's Connect</h3>
              <p>Whether you're a gourmet brand seeking customization, an e-commerce seller needing bulk API access, or just curious about our services, we're here to help.</p>

              <div className="contact-details-list">
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div className="contact-detail-text">
                    <span className="contact-detail-label">Email Us</span>
                    <span className="contact-detail-val">info@vijnananai.com</span>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon" style={{ backgroundColor: '#ecfdf5', color: '#10b981' }}>
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div className="contact-detail-text">
                    <span className="contact-detail-label">Call Us</span>
                    <span className="contact-detail-val">+91 83097 98009</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Card */}
            <div className="contact-form-card">
              {contactSubmitted ? (
                <div style={{
                  textAlign: 'center',
                  padding: '2rem 0',
                  color: '#10b981',
                  fontWeight: 700
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
                  <h4>Message Sent Successfully!</h4>
                  <p style={{ fontWeight: 500, color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="contact-form">
                  <div className="demo-field">
                    <label className="demo-label" htmlFor="contact-name">Full Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      className="demo-input"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="demo-field">
                    <label className="demo-label" htmlFor="contact-email">Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      className="demo-input"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="demo-field">
                    <label className="demo-label" htmlFor="contact-msg">Message</label>
                    <textarea
                      id="contact-msg"
                      className="demo-input demo-textarea"
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="How can we help you?"
                      required
                    />
                  </div>

                  <button type="submit" className="btn-contact-submit">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
