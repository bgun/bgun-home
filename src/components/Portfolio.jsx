import React, { useState } from 'react'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'

const Portfolio = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCardClick = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <>
      <section id="work" className="py-24 bg-zinc-200">
        <div className="container-custom">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-center">
            Selected Projects
          </h2>
          <p className="text-xl text-gray-600 mb-16 text-center max-w-2xl mx-auto">
            A collection of projects showcasing product management, engineering leadership, and user experience design
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                onClick={() => handleCardClick(project)}
              />
            ))}
          </div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default Portfolio
