import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'

export default function AvatarModel({ onLoaded }) {
  const { scene } = useGLTF('/Samir-Avatar.glb')

  useEffect(() => {
    if (scene) {
      // Disable real-time shadows on every mesh (guide §6.1)
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = false
          child.receiveShadow = false
          child.frustumCulled = true
        }
      })
      onLoaded?.()
    }
  }, [scene, onLoaded])

  return (
    <primitive
      object={scene}
      position={[0, -2.4, 6.1]}
      scale={1.6}
    />
  )
}

// Preload the model so loading starts immediately
useGLTF.preload('/Samir-Avatar.glb')
