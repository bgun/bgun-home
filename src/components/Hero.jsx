import React from 'react'

const Hero = ({ heroImage, name, bio }) => {
  return (
    <section className="relative h-[90vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroImage}
          alt={name}
          className="w-full h-full object-cover"
          style={{ position: 'absolute', top: 0, right: 0 }}
        />
      </div>

      {/* Bio Box - Bottom Center */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center p-6 md:p-12">
        <div className="bg-black/60 backdrop-blur-md p-8 max-w-4xl">
          <p className="text-md md:text-md leading-relaxed text-white font-sans" dangerouslySetInnerHTML={{ __html: bio }} />
        </div>
      </div>
    </section>
  )
}

export default Hero
