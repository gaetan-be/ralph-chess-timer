import { useState, useEffect, useRef } from 'react'

function App() {
  const [timePlayer1, setTimePlayer1] = useState(300) // 5 minutes in seconds
  const [timePlayer2, setTimePlayer2] = useState(300)
  const [activePlayer, setActivePlayer] = useState<1 | 2 | null>(null)
  const [showConfig, setShowConfig] = useState(false)

  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (activePlayer === null) return

    intervalRef.current = window.setInterval(() => {
      if (activePlayer === 1) {
        setTimePlayer1(prev => {
          if (prev <= 0) {
            clearInterval(intervalRef.current!)
            return 0
          }
          return prev - 1
        })
      } else {
        setTimePlayer2(prev => {
          if (prev <= 0) {
            clearInterval(intervalRef.current!)
            return 0
          }
          return prev - 1
        })
      }
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [activePlayer])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handlePlayerClick = (player: 1 | 2) => {
    if (activePlayer === player) {
      // Switch to the other player
      setActivePlayer(player === 1 ? 2 : 1)
    } else if (activePlayer === null) {
      // Start the game
      setActivePlayer(player)
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col relative">
      {/* Settings Icon */}
      <button
        onClick={() => setShowConfig(true)}
        className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        aria-label="Settings"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>

      {/* Player 1 - Top half */}
      <div
        onClick={() => handlePlayerClick(1)}
        className={`w-full h-1/2 flex items-center justify-center text-9xl font-bold cursor-pointer transition-colors ${
          activePlayer === 1
            ? 'bg-green-500 text-white'
            : 'bg-gray-200 text-gray-700'
        }`}
      >
        <div className="rotate-180">
          {formatTime(timePlayer1)}
        </div>
      </div>

      {/* Player 2 - Bottom half */}
      <div
        onClick={() => handlePlayerClick(2)}
        className={`w-full h-1/2 flex items-center justify-center text-9xl font-bold cursor-pointer transition-colors ${
          activePlayer === 2
            ? 'bg-green-500 text-white'
            : 'bg-gray-200 text-gray-700'
        }`}
      >
        {formatTime(timePlayer2)}
      </div>

      {/* Configuration Modal */}
      {showConfig && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Configuration</h2>

            {/* Configuration content will go here */}
            <div className="mb-6">
              <p className="text-gray-600">Settings will be added here</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfig(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => setShowConfig(false)}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
