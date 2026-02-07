import React from 'react'

const ProjectCard = ({ project, onClick }) => {
  const { title, description, image, skills, date } = project

  return (
    <article
      className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
      onClick={onClick}
    >
      {/* Project Image */}
      <div className="relative h-80 overflow-hidden bg-gray-200">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="20"%3EProject Image%3C/text%3E%3C/svg%3E'
          }}
        />
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl font-serif font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
          {date && (
            <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
              {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
            </span>
          )}
        </div>

        <p className="text-gray-700 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

      </div>
    </article>
  )
}

export default ProjectCard
