import React from 'react'

const About = ({ bio }) => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-center">
          About
        </h2>
        <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-serif text-center">
          {bio}
        </p>
      </div>
    </section>
  )
}

export default About
