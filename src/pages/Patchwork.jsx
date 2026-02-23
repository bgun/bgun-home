import React, { useEffect } from 'react'

const Patchwork = () => {
  useEffect(() => {
    // Load Mailchimp validation script
    const mcScript = document.createElement('script')
    mcScript.src = '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'
    mcScript.async = true
    document.body.appendChild(mcScript)

    mcScript.onload = () => {
      if (window.jQuery) {
        const $ = window.jQuery
        window.fnames = new Array()
        window.ftypes = new Array()
        window.fnames[0] = 'EMAIL'
        window.ftypes[0] = 'email'
        window.fnames[1] = 'FNAME'
        window.ftypes[1] = 'text'
        window.fnames[2] = 'LNAME'
        window.ftypes[2] = 'text'
        window.$mcj = $.noConflict(true)
      }
    }

    return () => {
      document.body.removeChild(mcScript)
    }
  }, [])

  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center px-4 relative overflow-hidden">
      <img
        src="/images/needle.png"
        alt=""
        className="absolute top-0 left-1/2 -translate-x-1/2 w-48 md:w-64 opacity-20 pointer-events-none select-none"
      />
      <div className="max-w-lg w-full text-center py-16 relative z-10">

        <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mt-6 mb-1">
          Patchwork
        </h1>
        <h2 className="text-xl md:text-xl font-serif font-bold text-gray-900 mt-1 mb-4">
          by Ben Gundersen
        </h2>

        <p className="text-lg text-gray-600 font-sans leading-relaxed mb-3">
          Weekly job listings for creatives who care. Fractional, freelance, and remote roles in design, tech, health, and the public good. Delivered every Monday.
        </p>
        <p className="text-sm text-gray-600 font-sans leading-relaxed mb-6">
          Got an opportunity that might interest 200+ creative weirdos<br />
          (mostly NYC+nomads)? <a href="mailto:ben@bengundersen.com?subject=Patchwork%20Opportunity" className="text-primary-600 hover:text-primary-700 transition-colors underline">Send it here</a>.
        </p>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div id="mc_embed_signup">
            <form
              action="https://gmail.us12.list-manage.com/subscribe/post?u=cc971ac79c99f7679544598b6&amp;id=cbbc2889c3&amp;f_id=00a2e2e1f0"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              className="validate"
              target="_blank"
            >
              <div id="mc_embed_signup_scroll">
                <div className="mc-field-group">
                  <label htmlFor="mce-EMAIL" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="EMAIL"
                    className="required email w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 font-sans"
                    id="mce-EMAIL"
                    required
                    placeholder="you@example.com"
                  />
                </div>

                <div id="mce-responses" className="clear foot">
                  <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
                  <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
                </div>

                {/* Honeypot field */}
                <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
                  <input
                    type="text"
                    name="b_cc971ac79c99f7679544598b6_cbbc2889c3"
                    tabIndex="-1"
                    defaultValue=""
                  />
                </div>

                <div className="mt-4">
                  <input
                    type="submit"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer"
                    value="Subscribe"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-400 font-sans">
          No spam, unsubscribe anytime.
        </p>
      </div>
    </div>
  )
}

export default Patchwork
