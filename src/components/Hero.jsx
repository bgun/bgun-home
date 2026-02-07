import React from 'react'

const Hero = ({ heroImage, name }) => {
  return (
    <section className="relative h-[90vh] overflow-hidden">
      {/* Background Image - No Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt={name}
          className="w-full h-full object-cover object-center"
        />
      </div>
    </section>
  )
}

export default Hero
