import { EffectComposer, Bloom, DepthOfField, Vignette, ChromaticAberration, SSAO } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Vector2 } from 'three'
import { useSpartanStore } from '../store/useSpartanStore'

export function PostProcessing() {
  const { config } = useSpartanStore()
  const { postFX } = config

  const hasAnyEffect = postFX.bloomEnabled || postFX.dofEnabled || postFX.vignetteEnabled ||
    postFX.chromaticAberrationEnabled || postFX.ssaoEnabled

  if (!hasAnyEffect) return null

  const effects = []

  if (postFX.bloomEnabled) {
    effects.push(
      <Bloom
        key="bloom"
        intensity={postFX.bloomIntensity}
        luminanceThreshold={postFX.bloomThreshold}
        luminanceSmoothing={postFX.bloomRadius}
      />
    )
  }

  if (postFX.dofEnabled) {
    effects.push(
      <DepthOfField
        key="dof"
        focusDistance={postFX.dofFocusDistance}
        focalLength={postFX.dofFocalLength}
        bokehScale={postFX.dofBokehScale}
      />
    )
  }

  if (postFX.ssaoEnabled) {
    effects.push(
      <SSAO
        key="ssao"
        blendFunction={BlendFunction.MULTIPLY}
        samples={30}
        rings={4}
        distanceThreshold={1.0}
        distanceFalloff={0.0}
        rangeThreshold={0.5}
        rangeFalloff={0.1}
        luminanceInfluence={0.9}
        radius={20}
        intensity={0.5}
        bias={0.5}
      />
    )
  }

  if (postFX.vignetteEnabled) {
    effects.push(
      <Vignette
        key="vignette"
        offset={postFX.vignetteOffset}
        darkness={postFX.vignetteDarkness}
        eskil={false}
        blendFunction={BlendFunction.NORMAL}
      />
    )
  }

  if (postFX.chromaticAberrationEnabled) {
    effects.push(
      <ChromaticAberration
        key="ca"
        offset={new Vector2(postFX.chromaticAberrationOffset, postFX.chromaticAberrationOffset)}
        blendFunction={BlendFunction.NORMAL}
        radialModulation={false}
        modulationOffset={0}
      />
    )
  }

  return <EffectComposer>{...effects}</EffectComposer>
}
