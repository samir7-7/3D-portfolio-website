import { EffectComposer, Vignette } from '@react-three/postprocessing'

export default function PostProcessingEffects() {
  return (
    <EffectComposer multisampling={0} disableNormalPass>
      <Vignette
        offset={0.6}
        darkness={0.45}
        eskil={false}
      />
    </EffectComposer>
  )
}

