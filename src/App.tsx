import { useState, useEffect, useRef } from 'react'

function App() {
  const [timePlayer1, setTimePlayer1] = useState(300) // 5 minutes in seconds
  const [timePlayer2, setTimePlayer2] = useState(300)
  const [activePlayer, setActivePlayer] = useState<1 | 2 | null>(null)
  const [showConfig, setShowConfig] = useState(false)
  const [durationInput, setDurationInput] = useState('5')
  const [isVertical, setIsVertical] = useState(true) // true = vertical, false = horizontal
  const [configuredDuration, setConfiguredDuration] = useState(300) // Store the configured duration
  const [isFlashing, setIsFlashing] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState('')

  const intervalRef = useRef<number | null>(null)
  const flashTimeoutRef = useRef<number | null>(null)

  // Load random background image from Lorem Picsum
  useEffect(() => {
    const randomId = Math.floor(Math.random() * 1000)
    setBackgroundImage(`https://picsum.photos/1920/1080?random=${randomId}`)
  }, [])

  useEffect(() => {
    if (activePlayer === null) return

    intervalRef.current = window.setInterval(() => {
      if (activePlayer === 1) {
        setTimePlayer1(prev => {
          if (prev <= 0) {
            clearInterval(intervalRef.current!)
            setIsFlashing(true)
            flashTimeoutRef.current = window.setTimeout(() => {
              setIsFlashing(false)
            }, 3000)
            return 0
          }
          return prev - 1
        })
      } else {
        setTimePlayer2(prev => {
          if (prev <= 0) {
            clearInterval(intervalRef.current!)
            setIsFlashing(true)
            flashTimeoutRef.current = window.setTimeout(() => {
              setIsFlashing(false)
            }, 3000)
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
      if (flashTimeoutRef.current) {
        clearTimeout(flashTimeoutRef.current)
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

  const handleSaveConfig = () => {
    const minutes = parseInt(durationInput, 10)
    if (!isNaN(minutes) && minutes > 0) {
      const seconds = minutes * 60
      setConfiguredDuration(seconds)
      setTimePlayer1(seconds)
      setTimePlayer2(seconds)
      setActivePlayer(null)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
    setShowConfig(false)
  }

  const handleReset = () => {
    setTimePlayer1(configuredDuration)
    setTimePlayer2(configuredDuration)
    setActivePlayer(null)
    setIsFlashing(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    if (flashTimeoutRef.current) {
      clearTimeout(flashTimeoutRef.current)
    }
  }

  return (
    <div className={`w-screen h-screen flex ${isVertical ? 'flex-col' : 'flex-row'} relative`}>
      {/* Background Image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

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

      {/* Rotation Icon */}
      <button
        onClick={() => setIsVertical(!isVertical)}
        className="absolute top-4 left-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        aria-label="Rotate Layout"
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
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>

      {/* Reset Icon */}
      <button
        onClick={handleReset}
        className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        aria-label="Reset Timer"
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
            d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8m-18 0V8a2 2 0 012-2h12a2 2 0 012 2v4m-6 4h.01M8 16h.01"
          />
        </svg>
      </button>

      {/* Player 1 */}
      <div
        onClick={() => handlePlayerClick(1)}
        className={`${isVertical ? 'w-full h-1/2' : 'w-1/2 h-full'} flex items-center justify-center text-9xl font-bold cursor-pointer transition-colors ${
          activePlayer === 1
            ? 'bg-green-500 text-white'
            : 'bg-gray-200 text-gray-700'
        }`}
      >
        <div className={isVertical ? 'rotate-180' : ''}>
          {formatTime(timePlayer1)}
        </div>
      </div>

      {/* Player 2 */}
      <div
        onClick={() => handlePlayerClick(2)}
        className={`${isVertical ? 'w-full h-1/2' : 'w-1/2 h-full'} flex items-center justify-center text-9xl font-bold cursor-pointer transition-colors ${
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

            {/* Timer Duration Setting */}
            <div className="mb-6">
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                Timer Duration (minutes)
              </label>
              <input
                id="duration"
                type="number"
                min="1"
                value={durationInput}
                onChange={(e) => setDurationInput(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter minutes"
              />
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
                onClick={handleSaveConfig}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Red Flash Overlay */}
      {isFlashing && (
        <div className="absolute inset-0 bg-red-500 z-30 animate-pulse pointer-events-none" />
      )}
    </div>
  )
}

export default App
