import { useState, useEffect } from 'react'
import portfolioData from '../data/portfolio.json'

export const usePortfolio = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      // In a real app, this could be an API call
      // For now, we're importing the JSON directly
      setData(portfolioData)
      setLoading(false)
    } catch (err) {
      setError(err)
      setLoading(false)
    }
  }, [])

  return { data, loading, error }
}
