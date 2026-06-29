import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../services/api'
import "./dashboard.css"

const navItems = [
  { label: 'Dashboard', icon: '📊', active: true },
  { label: 'Generator', icon: '🧠' },
  { label: 'Saved Products', icon: '💾' },
  { label: 'Analytics', icon: '📈' },
  { label: 'Settings', icon: '⚙️' },
]

const summaryCards = [
  {
    title: 'Recent Drafts',
    description: 'Pick up where you left off with your last 12 projects.',
    value: '12 drafts',
  },
  {
    title: 'Product Library',
    description: 'Manage your custom AI presets and tone profiles.',
    value: '24 items',
  },
]

const recentGenerations = [
  {
    name: 'Madagascar Bourbon Vanilla',
    date: 'Oct 24, 2023',
    status: 'SEO Optimized',
    action: 'View Result',
  },
  {
    name: 'Sumatra Dark Roast Blend',
    date: 'Oct 23, 2023',
    status: 'Draft',
    action: 'Edit Draft',
  },
  {
    name: 'Wildflower Raw Honey',
    date: 'Oct 21, 2023',
    status: 'SEO Optimized',
    action: 'View Result',
  },
]

export default function Dashboard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Unable to load products from the backend right now.')
        setLoading(false)
      })
  }, [])

  return (
    <div className="dashboard-page">
      <div className="dashboard-grid">
        <aside className="dashboard-sidebar">
          <div>
            <div className="sidebar-brand">
              <div className="brand-mark">D</div>
              <div>
                <p className="brand-title">DescrifyAI</p>
                <p className="brand-subtitle">Creative product copy studio</p>
              </div>
            </div>

            <nav className="sidebar-nav">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={`sidebar-link${item.active ? ' active' : ''}`}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="sidebar-footer">
            <button type="button" className="link-button sidebar-footer-btn">
              Help Center
            </button>
            <button type="button" className="link-button sidebar-footer-btn">
              Log Out
            </button>
          </div>
        </aside>

        <main className="dashboard-main">
          <section className="dashboard-header">
            <div>
              <p className="dashboard-overline">Dashboard</p>
              <h1>Welcome back, Chef!</h1>
              <p className="dashboard-text">
                Your kitchen of high-performance descriptions is ready. What are we cooking up today?
              </p>
            </div>
            <button type="button" className="btn-primary-dark dashboard-create-btn">
              + New Description
            </button>
          </section>

          <section className="dashboard-summary-grid">
            <div className="dashboard-card dashboard-card-highlight">
              <div className="dashboard-card-top">
                <span className="card-label">Generate New Description</span>
              </div>
              <h2>Create gourmet copy in seconds</h2>
              <p>Turn raw product details into polished descriptions that convert.</p>
            </div>

            {summaryCards.map((card) => (
              <div key={card.title} className="dashboard-card dashboard-card-small">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <span className="card-meta">{card.value}</span>
              </div>
            ))}
          </section>

          <section className="dashboard-table-card">
            <div className="dashboard-table-header">
              <div>
                <h2>Recent Generations</h2>
                <p>Live data from the backend API.</p>
              </div>
            </div>

            <div className="dashboard-table-wrap">
              {loading ? (
                <p>Loading backend products…</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>
                          <span className={`status-pill status-${product.in_stock ? 'seo-optimized' : 'draft'}`}>
                            {product.in_stock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
