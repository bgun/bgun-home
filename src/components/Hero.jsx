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
        <div className="container-custom max-w-5xl py-12 md:py-16">
          <p className="px-6 text-md md:text-lg lg:text-xl leading-relaxed text-white font-serif text-center">
            {bio.split('weekly newsletter').length > 1 ? (
              <>
                {bio.split('weekly newsletter')[0]}
                <a href="/patchwork" className="underline hover:text-primary-200 transition-colors">weekly newsletter</a>
                {bio.split('weekly newsletter')[1]}
              </>
            ) : bio}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
