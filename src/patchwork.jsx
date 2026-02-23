import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Patchwork from './pages/Patchwork.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Patchwork />
  </StrictMode>,
)
