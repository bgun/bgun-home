import React from 'react'
import { usePortfolio } from './hooks/usePortfolio'
import Header from './components/Header'
import Hero from './components/Hero'
import ClientLogos from './components/ClientLogos'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Footer from './components/Footer'

function App() {
  const { data, loading, error } = usePortfolio()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 font-serif">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-xl text-red-600 font-serif">Error loading portfolio data</p>
        </div>
      </div>
    )
  }

  const { about, projects } = data

  return (
    <div className="min-h-screen">
      <Header
        name={about.name}
        title={about.title}
        subtitle={about.subtitle}
      />
      <Hero
        heroImage="/images/Ben_Dining_Room-5.jpg"
        name={about.name}
      />
      <ClientLogos />
      <About bio={about.bio} />
      <Portfolio projects={projects} />
      <Footer
        contact={{ email: about.email }}
      />
    </div>
  )
}

export default App
