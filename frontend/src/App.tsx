import { useEffect, useState } from 'react'

function App() {
  const [healthStatus, setHealthStatus] = useState<string>('Checking backend status...')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
        const response = await fetch(`${apiUrl}/api/health`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setHealthStatus(data.message || 'Backend is connected!')
      } catch (err: any) {
        setError(err.message || 'Failed to connect to backend')
      }
    }

    fetchHealth()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-blue-400">Real-Time Sign Language Translator</h1>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 max-w-md w-full text-center">
        <h2 className="text-xl font-semibold mb-4">System Status</h2>
        
        {error ? (
          <div className="text-red-400 font-medium">
            Error: {error}
          </div>
        ) : (
          <div className="text-green-400 font-medium flex items-center justify-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            {healthStatus}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
