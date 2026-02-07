import React, { useState } from 'react'

const Footer = ({ contact }) => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Using Formspree or similar service - update action URL as needed
    try {
      const response = await fetch('https://formsubmit.co/25e52e00fb26130116dbdc604f60419a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      })

      if (response.ok) {
        setSubmitMessage('Thank you! Your message has been sent.')
        setFormState({ name: '', email: '', message: '' })
      } else {
        setSubmitMessage('Sorry, there was an error. Please try again.')
      }
    } catch (error) {
      setSubmitMessage('Sorry, there was an error. Please try again.')
    }

    setIsSubmitting(false)
  }

  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="container-custom max-w-2xl">
        <h3 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-center">Get In Touch</h3>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary-500 text-white"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary-500 text-white"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              name="message"
              required
              rows="4"
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary-500 text-white resize-none"
              placeholder="Your message..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {submitMessage && (
            <p className={`text-center ${submitMessage.includes('Thank') ? 'text-green-400' : 'text-red-400'}`}>
              {submitMessage}
            </p>
          )}
        </form>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Ben Gundersen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
