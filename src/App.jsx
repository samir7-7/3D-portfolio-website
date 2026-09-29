import { Suspense, useState, useCallback } from 'react'
import Scene from './components/Scene'
import Overlay from './components/Overlay'
import LoadingScreen from './components/LoadingScreen'
import NoiseOverlay from './components/NoiseOverlay'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  const handleLoaded = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      <LoadingScreen loaded={loaded} />

      {/* Fixed 3D Canvas Background */}
      <div className="canvas-container">
        <Scene onLoaded={handleLoaded} />
      </div>

      {/* Noise grain — between canvas and text */}
      <NoiseOverlay />

      {/* Scrollable HTML Overlay */}
      <Overlay />
    </>
  )
}
