import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useSpartanStore } from '../store/useSpartanStore'
import type { ArmorColors } from '../types/spartan'

const MODEL_PATH = `${import.meta.env.BASE_URL}models/masterchief.glb`

// Maps lowercase mesh-name keywords to armor color slots
const COLOR_MAP: Record<string, keyof ArmorColors> = {
  helmet: 'helmet',
  head: 'helmet',
  visor: 'visor',
  chest: 'chest',
  torso: 'chest',
  body: 'chest',
  'left_shoulder': 'leftShoulder',
  'l_shoulder': 'leftShoulder',
  'right_shoulder': 'rightShoulder',
  'r_shoulder': 'rightShoulder',
  'left_arm': 'leftArm',
  'l_arm': 'leftArm',
  'right_arm': 'rightArm',
  'r_arm': 'rightArm',
  'left_leg': 'leftLeg',
  'l_leg': 'leftLeg',
  'right_leg': 'rightLeg',
  'r_leg': 'rightLeg',
  boot: 'boots',
  foot: 'boots',
  undersuit: 'undersuit',
}

function resolveColor(
  meshName: string,
  armorColors: ArmorColors,
): string {
  const lower = meshName.toLowerCase()
  for (const [keyword, slot] of Object.entries(COLOR_MAP)) {
    if (lower.includes(keyword)) return armorColors[slot]
  }
  return armorColors.chest // default to primary armor color
}

export function SpartanModel() {
  const { config } = useSpartanStore()
  const { armorColors, armorMaterial, animation } = config
  const { metalness, roughness, emissiveIntensity } = armorMaterial

  const { scene } = useGLTF(MODEL_PATH)

  const groupRef = useRef<THREE.Group>(null)

  // Clone the scene so material mutations don't persist across hot-reloads
  const clonedScene = useMemo(() => scene.clone(true), [scene])

  // Apply store material settings to every mesh in the loaded model
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return
      const mats = Array.isArray(child.material) ? child.material : [child.material]
      mats.forEach((mat) => {
        if (!(mat instanceof THREE.MeshStandardMaterial)) return
        const color = resolveColor(child.name, armorColors)
        mat.color.set(color)
        mat.metalness = metalness
        mat.roughness = roughness
        if (child.name.toLowerCase().includes('visor')) {
          mat.emissive.set(armorColors.visor)
          mat.emissiveIntensity = emissiveIntensity > 0 ? emissiveIntensity : 0.5
        } else {
          mat.emissive.set('#000000')
          mat.emissiveIntensity = emissiveIntensity
        }
        mat.needsUpdate = true
      })
    })
  }, [armorColors, metalness, roughness, emissiveIntensity, clonedScene])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * animation.animationSpeed

    if (groupRef.current) {
      if (animation.idleAnimationEnabled) {
        groupRef.current.position.y = Math.sin(t * 0.8) * 0.02
      } else {
        groupRef.current.position.y = 0
      }
    }

  })

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
    </group>
  )
}

useGLTF.preload(MODEL_PATH)
