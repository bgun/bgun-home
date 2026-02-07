import React from 'react'

const ProjectCard = ({ project }) => {
  const { title, description, image, skills, link, date } = project

  return (
    <article className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
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

        {/* View More Link */}
        {link && (
          <div className="pt-4 border-t border-gray-200">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 font-semibold transition-colors"
            >
              <span>View More</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </article>
  )
}

export default ProjectCard
