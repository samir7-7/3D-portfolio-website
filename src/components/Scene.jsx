import { Canvas } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import AvatarModel from './AvatarModel'
import CameraRig from './CameraRig'
import PostProcessingEffects from './PostProcessingEffects'

export default function Scene({ onLoaded }) {
  // Shared state object that GSAP animates and R3F reads on every frame.
  // Using a mutable ref avoids React re-renders — critical for 60fps.
  const isMobile = window.innerWidth <= 768
  const cameraTarget = useRef({
    x: 0,
    y: -0.2,
    z: 10.5,
    lookAtX: 0,
    lookAtY: -0.5,
    lookAtZ: 6.1,
    focusDistance: 0.04,
  })

  return (
    <Canvas
      // Listen to mouse events globally so the HTML overlay doesn't block them
      eventSource={document.getElementById('root')}
      // Cap DPR at 1.5 — a DPR of 2+ pushes 4x-9x more pixels (guide §2)
      dpr={[1, 1.5]}
      camera={{ position: [0, -0.2, 10.5], fov: 45, near: 0.1, far: 100 }}
      // Disable default antialiasing; DoF softens edges (guide §2)
      gl={{ antialias: false }}
    >
      {/* Dramatic diagonal lighting — key from upper-left, front fill to soften shadows */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[-4, 5, 3]} intensity={3.75} color="#ffe0b2" />
      <directionalLight position={[0, 0, 8]} intensity={2.1} />
      <directionalLight position={[3, 0, 5]} intensity={0.3} />
      <directionalLight position={[2, -1, -2]} intensity={0.4} />

      <Suspense fallback={null}>
        <AvatarModel onLoaded={onLoaded} />
      </Suspense>

      <CameraRig cameraTarget={cameraTarget} />
      <PostProcessingEffects cameraTarget={cameraTarget} />
    </Canvas>
  )
}
