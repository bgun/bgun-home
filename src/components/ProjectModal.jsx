import React, { useEffect, useState } from 'react'

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Trigger animation after mount
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true)
        })
      })
    } else {
      setIsAnimating(false)
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const getDomain = (url) => {
    if (!url) return ''
    try {
      const urlObj = new URL(url)
      return urlObj.hostname.replace('www.', '')
    } catch {
      return url
    }
  }

  if (!project) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-all duration-300 ${
        isOpen && isAnimating ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        className={`relative bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ${
          isOpen && isAnimating ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
          aria-label="Close"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Project Image */}
        <div className="relative h-64 md:h-96 overflow-hidden bg-gray-200">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="20"%3EProject Image%3C/text%3E%3C/svg%3E'
            }}
          />
        </div>

        {/* Content */}
        <div className="p-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            {project.title}
          </h2>

          {project.date && (
            <p className="text-sm text-gray-500 mb-6">
              {new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
            </p>
          )}

          {project.long_description && (
            <div
              className="text-lg text-gray-700 leading-relaxed mb-6 prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: project.long_description }}
            />
          )}

          {project.description && !project.long_description && (
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {project.description}
            </p>
          )}

          {/* Skills */}
          {project.skills && project.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                Skills & Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* URL */}
          {project.link && (
            <div className="pt-6 border-t border-gray-200">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 font-semibold transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>{getDomain(project.link)}</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
