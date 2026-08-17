import { useEffect, useState } from 'react'

function BackendTest() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/test')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        return response.text()
      })
      .then((data) => {
        setMessage(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p>Loading backend status...</p>
  }

  if (error) {
    return <p>Error connecting to backend: {error}</p>
  }

  return <p>Backend says: {message}</p>
}

export default BackendTest