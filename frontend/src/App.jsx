import React from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app-container">
      {/* Decorative gradient glow elements */}
      <div className="bg-glow-one" />
      <div className="bg-glow-two" />

      {/* Main navigation header */}
      <Header />

      {/* Main content body */}
      <main className="app-main">
        <Home />
      </main>

      {/* Site footer */}
      <Footer />
    </div>
  )
}

export default App
