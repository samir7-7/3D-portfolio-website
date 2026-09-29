# Building a High-Performance 3D Scroll Experience

This guide details the core implementation for building a 3D scroll-driven portfolio (similar to the reference video) using React Three Fiber (R3F) and GSAP. A major focus is placed on maintaining a strict 60fps framerate even with Depth of Field (DoF) post-processing.

## 1. Asset Optimization (The Foundation of Performance)
Before writing any code, the 3D model must be optimized. Real-time web rendering cannot handle cinematic-quality unoptimized assets.

*   **Format:** Export as `.glb` (glTF binary).
*   **Compression:** Use Draco compression. You can run your model through the `gltf-pipeline` CLI tool:
    `gltf-pipeline -i model.glb -o model_draco.glb -d`
*   **Texture Baking:** Do not compute dynamic lights or shadows in the browser. Bake all lighting, ambient occlusion, and shadows directly into the textures using Blender. Use `MeshBasicMaterial` in Three.js wherever possible, as it requires zero light calculation.

## 2. Core Scene Setup (React Three Fiber)
Initialize the canvas. To prevent performance degradation on high-resolution displays (like Apple Retina screens), strictly cap the Device Pixel Ratio (DPR).

```jsx
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

export default function Scene() {
  return (
    <Canvas
      // Cap DPR at 1.5. A DPR of 2 or 3 pushes 4x-9x more pixels, severely hurting performance.
      dpr={[1, 1.5]} 
      camera={{ position: [0, 0, 5], fov: 45 }}
      // Disable default antialiasing if post-processing is heavy, we'll handle it there
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <YourModel />
      </Suspense>
    </Canvas>
  )
}
```

## 3. Scroll-Driven Animation (GSAP + ScrollTrigger)
Instead of animating the model, animate the camera to orbit and zoom in on specific parts of the face.

Use GSAP's `ScrollTrigger` combined with R3F's `useFrame` hook. The most performant approach is to animate a state object linked to the scroll, and sync the 3D camera to its values on every frame.

```jsx
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function CameraRig({ cameraTargetObj }) {
  useEffect(() => {
    // Create a timeline linked to the scroll of the page
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrubbing
      }
    })

    // Animate camera position and focus distance towards the character's cheek/eye
    tl.to(cameraTargetObj, {
      x: 1.2, 
      y: 0.5, 
      z: 2, 
      focusDistance: 0.05, // Animate the focal variable simultaneously
      ease: "power2.inOut"
    }, 0)
  }, [])

  useFrame((state) => {
    // Smoothly interpolate the actual camera to match the GSAP target object
    state.camera.position.lerp(
      { x: cameraTargetObj.x, y: cameraTargetObj.y, z: cameraTargetObj.z }, 
      0.1
    )
    state.camera.lookAt(0, 0, 0)
  })

  return null
}
```

## 4. Depth of Field (DoF) Implementation
Post-processing is the biggest performance bottleneck. Use `@react-three/postprocessing` which relies on the highly optimized `postprocessing` library, rather than vanilla Three.js effects.

```jsx
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'

function PostProcessingEffects({ cameraTargetObj }) {
  return (
    // multisampling={0} saves performance if you rely on the DoF to soften edges
    <EffectComposer multisampling={0} disableNormalPass>
      <DepthOfField 
        focusDistance={cameraTargetObj.focusDistance} // Sync this with your GSAP object
        focalLength={0.02} 
        bokehScale={2} // Keep below 3 for performance
        height={480} // Downsample the blur computation resolution internally
      />
    </EffectComposer>
  )
}
```

## 5. The UI Overlay Layer
Layer your HTML on top of the fixed `Canvas`. To contrast with the complex 3D rendering, maintain a modern tech branding aesthetic for the overlay. 

Use a Vercel-style monochrome palette. Construct frosted-glass cards using `backdrop-filter` and subtle borders. For typography, implement Geist or Inter fonts to keep the textual elements sharp, minimal, and highly legible against the 3D background. 

```css
.canvas-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

.scroll-container {
  position: relative;
  height: 400vh; /* Determines the total scroll length */
}

.glass-card {
  background: rgba(20, 20, 20, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: 'Geist', 'Inter', sans-serif;
  border-radius: 12px;
  color: #fff;
}
```

## 6. Final Performance Checklist
1. **No Real-time Shadows:** Disable `castShadow` and `receiveShadow` on all meshes. Use baked textures.
2. **Instanced Meshes:** If your character has repeating geometry (e.g., hundreds of floating elements or particles), use `InstancedMesh` to render them in a single draw call.
3. **Dispose Geometry:** Ensure you dispose of materials and geometries if components ever unmount.
4. **Resolution Downsampling:** As shown in the DoF snippet, capping the `height` prop in post-processing effects calculates the blur math on a smaller texture, vastly improving GPU performance.
