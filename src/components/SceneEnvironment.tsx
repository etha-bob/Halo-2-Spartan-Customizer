import { useRef } from 'react'
import { Environment, Grid, Sky, Stars, ContactShadows } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useSpartanStore } from '../store/useSpartanStore'

export function SceneEnvironment() {
  const { config } = useSpartanStore()
  const { environment: env } = config

  const fogRef = useRef<THREE.Fog | null>(null)

  useFrame(({ scene }) => {
    if (env.fogEnabled) {
      if (!scene.fog || !(scene.fog instanceof THREE.Fog)) {
        scene.fog = new THREE.Fog(env.fogColor, env.fogNear, env.fogFar)
      } else {
        scene.fog.color.set(env.fogColor)
        ;(scene.fog as THREE.Fog).near = env.fogNear
        ;(scene.fog as THREE.Fog).far = env.fogFar
      }
    } else {
      scene.fog = null
    }
    fogRef.current = null
  })

  return (
    <>
      <ambientLight
        intensity={env.ambientLightIntensity}
        color={env.ambientLightColor}
      />
      <directionalLight
        intensity={env.directionalLightIntensity}
        color={env.directionalLightColor}
        position={[env.directionalLightX, env.directionalLightY, env.directionalLightZ]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      {env.pointLightEnabled && (
        <pointLight
          intensity={env.pointLightIntensity}
          color={env.pointLightColor}
          position={[env.pointLightX, env.pointLightY, env.pointLightZ]}
        />
      )}
      <Environment preset={env.preset} />
      {env.showSkybox && (
        <>
          <Sky sunPosition={[100, 20, 100]} />
          <Stars radius={100} depth={50} count={5000} factor={4} />
        </>
      )}
      {env.showGrid && (
        <Grid
          position={[0, -1.5, 0]}
          args={[20, 20]}
          cellColor={env.gridColor}
          sectionColor={env.gridColor}
          cellSize={0.5}
          sectionSize={2}
          infiniteGrid
          fadeDistance={30}
        />
      )}
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.5}
        scale={10}
        blur={2}
        far={4}
      />
    </>
  )
}
