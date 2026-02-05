import React from 'react'
import ProjectCard from './ProjectCard'

const Portfolio = ({ projects }) => {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-center">
          Selected Work
        </h2>
        <p className="text-xl text-gray-600 mb-16 text-center max-w-2xl mx-auto">
          A collection of projects showcasing product management, engineering leadership, and user experience design
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
