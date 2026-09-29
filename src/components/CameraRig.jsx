import { useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

export default function CameraRig({ cameraTarget }) {
  const target = cameraTarget.current
  const lookAtVec = new THREE.Vector3()

  useEffect(() => {
    // Main scroll-driven timeline (guide §3)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2, // Smooth scrubbing with slight lag for cinematic feel
      },
    })

    const isMobile = window.innerWidth <= 768

    // Section 1 → 2: Pull in to left cheek close-up (Itahari International College sticker), framing it on the left
    tl.to(target, {
      x: isMobile ? 0.8 : 1.6, // Moved camera left towards front of face on mobile
      y: -0.5,
      z: 7.0,
      lookAtX: -0.2,
      lookAtY: -0.7,
      lookAtZ: 6.1,
      focusDistance: 0.03,
      duration: 1,
      ease: 'power2.inOut',
    })

    // Section 2 → 3: Orbit to left side, close-up on Clove IT sticker, framing right
    tl.to(target, {
      x: -0.9,
      y: -0.8,
      z: 6.8, // Back to the front of the face to avoid going behind the ear
      lookAtX: -0.4, // Panned left to center the sticker
      lookAtY: -0.65, // Panned up to center the sticker
      lookAtZ: 6.4,
      focusDistance: 0.015,
      duration: 1,
      ease: 'power2.inOut',
    })

    // Hold step for Experience block (lots of text)
    tl.to(target, {
      x: -0.9,
      y: -0.8,
      z: 6.8,
      lookAtX: -0.4,
      lookAtY: -0.65,
      lookAtZ: 6.4,
      focusDistance: 0.015,
      duration: 0.3, // Reduced to perfectly sync with text height
      ease: 'none',
    })

    // Section 3 → 4: Close-up on forehead (Sigmoit sticker), framing left
    tl.to(target, {
      x: -0.6,
      y: 0.1,
      z: 7.0,
      lookAtX: 0.1,
      lookAtY: -0.1,
      lookAtZ: 6.1,
      focusDistance: 0.02,
      duration: 1,
      ease: 'power2.inOut',
    })

    // Section 4 → 5: Side view of left cheek (Lekhakar & Moment stickers), camera from right
    tl.to(target, {
      x: isMobile ? 1.3 : 1.2,
      y: isMobile ? -1.1 : -0.8,
      z: isMobile ? 9.5 : 6.15,
      lookAtX: isMobile ? 0.2 : 0.1,
      lookAtY: -0.8,
      lookAtZ: 6.1,
      focusDistance: 0.015,
      duration: 1,
      ease: 'power2.inOut',
    })

    // Hold step for Selected Works block (lots of text)
    tl.to(target, {
      x: isMobile ? 1.3 : 1.2,
      y: isMobile ? -1.1 : -0.8,
      z: isMobile ? 9.5 : 6.15,
      lookAtX: isMobile ? 0.2 : 0.1,
      lookAtY: -0.8,
      lookAtZ: 6.1,
      focusDistance: 0.015,
      duration: 0.4,
      ease: 'none',
    })

    // Section 5 → 6 (part 1): Travel behind the head to avoid clipping through the face
    tl.to(target, {
      x: 0,
      y: -0.2,
      z: 3.8, // Behind the head
      lookAtX: 0,
      lookAtY: -0.4,
      lookAtZ: 6.1,
      focusDistance: 0.04,
      duration: 0.4, // Quick pass behind
      ease: 'power1.inOut',
    })

    // Section 5 → 6 (part 2): Arrive at right cheek (Tools & Tech stickers)
    tl.to(target, {
      x: -1.7, // Positioned on the left side
      y: -0.6,
      z: 6.8, // Slightly in front again
      lookAtX: 0.3,
      lookAtY: -0.8,
      lookAtZ: 6.1,
      focusDistance: 0.015,
      duration: 0.6, // Rest of the gap
      ease: 'power2.out',
    })

    // Section 6 → 7: Socials (LinkedIn/Github/Insta stickers on right cheek)
    tl.to(target, {
      x: -1.0,
      y: -0.45, // Nudged up
      z: 6.9,
      lookAtX: 0.25, // Nudged right
      lookAtY: -0.6, // Nudged up
      lookAtZ: 6.1,
      focusDistance: 0.012,
      duration: 1,
      ease: 'power2.inOut',
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [target])

  useFrame((state) => {
    // Calculate subtle parallax offsets based on mouse position
    // Drastically reduced multiplier so extreme close-ups don't swing wildly
    const parallaxX = state.pointer.x * 0.02
    const parallaxY = state.pointer.y * 0.02

    // Smooth interpolation toward GSAP target values + parallax offset
    state.camera.position.lerp(
      { 
        x: target.x + parallaxX, 
        y: target.y + parallaxY, 
        z: target.z 
      },
      0.08
    )
    lookAtVec.set(target.lookAtX, target.lookAtY, target.lookAtZ)
    state.camera.lookAt(lookAtVec)
  })

  return null
}
