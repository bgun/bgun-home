import React, { useRef, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
// import ConstellationGame from './ConstellationGame'
import ConstellationGame from './ConstellationGame'
import './App.css'

function App() {
  return (
    <>
      <ConstellationGame />
      <h1 className="title">
        <span className="title-name">Ben Gundersen</span>
        <span className="title-subtitle fade1">Technical Product Manager</span>
        <span className="title-subtitle fade2">Engineering Leadership</span>
        <span className="title-subtitle fade3">Experience Designer</span>
      </h1>

      <div className="content-container">
      { /*}
        <div className="content">
          <div className="flex-card">
            <div className="flex-card-container">
              <div className="card-image"></div>
              <div className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            </div>
          </div>
          <div className="flex-card">
            <div className="flex-card-container">
              <div className="card-image"></div>
              <div className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            </div>
          </div>
          <div className="flex-card">
            <div className="flex-card-container">
              <div className="card-image"></div>
              <div className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            </div>
          </div>
          <div className="flex-card">
            <div className="flex-card-container">
              <div className="card-image"></div>
              <div className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            </div>
          </div>
          <div className="flex-card">
            <div className="flex-card-container">
              <div className="card-image"></div>
              <div className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            </div>
          </div>
          <div className="flex-card">
            <div className="flex-card-container">
              <div className="card-image"></div>
              <div className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            </div>
          </div>
        </div>
              */}
        <footer>
          <div className="footer-links">            
            <a href="https://github.com/bgun"><img src="/github.svg" alt="github" /></a>
            <a href="https://bgun.substack.com"><img src="/substack.png" alt="substack" /></a>
          </div>
          <div className="footer-info">
            <a href="tel:+19187607778">918-760-7778</a><br />
            <a href="mailto:ben@bengundersen.com">ben@bengundersen.com</a>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App
