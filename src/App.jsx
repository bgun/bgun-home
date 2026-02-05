import React from 'react'
import { usePortfolio } from './hooks/usePortfolio'
import Hero from './components/Hero'
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
      <Hero
        name={about.name}
        title={about.title}
        subtitle={about.subtitle}
        heroImage="/images/Ben_Dining_Room-5.jpg"
      />
      <About bio={about.bio} />
      <Portfolio projects={projects} />
      <Footer
        contact={{ phone: about.phone, email: about.email }}
        social={about.social}
      />
    </div>
  )
}

export default App
