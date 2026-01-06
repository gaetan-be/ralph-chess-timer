import { useState, useEffect, useRef } from 'react'

function App() {
  const [timePlayer1, setTimePlayer1] = useState(300) // 5 minutes in seconds
  const [timePlayer2, setTimePlayer2] = useState(300)
  const [activePlayer, setActivePlayer] = useState<1 | 2 | null>(null)

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
    <div className="w-screen h-screen flex flex-col">
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
    </div>
  )
}

export default App
