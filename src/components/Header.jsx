import React from 'react'

const Header = ({ name, title, subtitle }) => {
  const scrollToSection = (sectionId) => {
    if (sectionId === 'about') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-sm">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
          {/* Name and Title */}
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-white drop-shadow-lg">
              {name}
            </h1>
            <div className="text-sm md:text-base font-serif text-white/90 drop-shadow-md">
              <p>{title}</p>
              <p className="text-xs md:text-sm text-white/80">{subtitle}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex gap-6 justify-center md:justify-end">
            <button
              onClick={() => scrollToSection('about')}
              className="text-white font-medium hover:text-white/80 transition-colors drop-shadow-md"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('work')}
              className="text-white font-medium hover:text-white/80 transition-colors drop-shadow-md"
            >
              Selected Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white font-medium hover:text-white/80 transition-colors drop-shadow-md"
            >
              Contact
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
