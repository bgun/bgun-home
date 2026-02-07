import React from 'react'

const Hero = ({ heroImage, name, bio }) => {
  return (
    <section className="relative h-[90vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt={name}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* About Text Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 via-black/60 to-transparent">
        <div className="container-custom max-w-6xl py-12 md:py-16">
          <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white font-serif text-center">
            {bio}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
