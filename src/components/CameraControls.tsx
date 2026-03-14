import { useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { useSpartanStore } from '../store/useSpartanStore'

export function CameraControls() {
  const { config } = useSpartanStore()
  const { camera } = config
  const controlsRef = useRef<OrbitControlsImpl>(null)

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={camera.dampingFactor}
      autoRotate={camera.autoRotate && config.animation.turntableEnabled}
      autoRotateSpeed={camera.autoRotateSpeed}
      minPolarAngle={camera.minPolarAngle}
      maxPolarAngle={camera.maxPolarAngle}
      minDistance={camera.minDistance}
      maxDistance={camera.maxDistance}
      makeDefault
    />
  )
}
