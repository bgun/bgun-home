import React from 'react'

const ClientLogos = () => {
  const logos = [
    { name: 'TripAdvisor', src: '/images/client-logo_tripadvisor.png' },
    { name: 'Beverly Hills', src: '/images/client-logo_beverly-hills.png' },
    { name: 'Eli Lilly', src: '/images/client-logo_eli-lilly.png' },
    { name: 'Foursquare', src: '/images/client-logo_foursquare.png' },
    { name: 'NCAA', src: '/images/client-logo_ncaa.png' },
    { name: 'Procter & Gamble', src: '/images/client-logo_proctergamble.png' },
  ]

  return (
    <section className="py-16 bg-white border-b border-gray-200">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-12 text-gray-800">
          Companies I've worked for and with
        </h2>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-6 gap-8 items-center justify-items-center">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="max-h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* Mobile: Horizontal Scrolling Carousel */}
        <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-8 items-center min-w-max pb-4">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center grayscale opacity-60"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-14 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClientLogos
