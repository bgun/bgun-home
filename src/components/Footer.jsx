import React from 'react'

const Footer = ({ contact, social }) => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-serif font-bold mb-4">Get In Touch</h3>
            <div className="space-y-2">
              <a
                href={`tel:${contact.phone.replace(/\D/g, '')}`}
                className="block text-gray-300 hover:text-white transition-colors text-lg"
              >
                {contact.phone}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="block text-gray-300 hover:text-white transition-colors text-lg"
              >
                {contact.email}
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-6">
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              aria-label="GitHub"
            >
              <img
                src="/github.svg"
                alt="GitHub"
                className="w-12 h-12 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
              />
            </a>
            <a
              href={social.substack}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              aria-label="Substack"
            >
              <img
                src="/substack.png"
                alt="Substack"
                className="w-12 h-12 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
              />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Ben Gundersen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
