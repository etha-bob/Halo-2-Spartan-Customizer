import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useSpartanStore } from '../store/useSpartanStore'

function createMaterial(color: string, metalness: number, roughness: number, emissiveIntensity = 0, emissiveColor = '#000000') {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness,
    roughness,
    emissive: new THREE.Color(emissiveColor),
    emissiveIntensity,
  })
}

const POSES = {
  0: {
    leftArmRotation: [0, 0, -Math.PI / 2] as [number, number, number],
    rightArmRotation: [0, 0, Math.PI / 2] as [number, number, number],
    leftLegRotation: [0, 0, 0] as [number, number, number],
    rightLegRotation: [0, 0, 0] as [number, number, number],
    lean: 0,
  },
  1: {
    leftArmRotation: [0.2, 0, -Math.PI / 6] as [number, number, number],
    rightArmRotation: [0.2, 0, Math.PI / 6] as [number, number, number],
    leftLegRotation: [0.1, 0, 0.05] as [number, number, number],
    rightLegRotation: [0.1, 0, -0.05] as [number, number, number],
    lean: 0,
  },
  2: {
    leftArmRotation: [-Math.PI / 4, 0, -Math.PI / 8] as [number, number, number],
    rightArmRotation: [-Math.PI / 4, 0, Math.PI / 8] as [number, number, number],
    leftLegRotation: [0.2, 0, 0.08] as [number, number, number],
    rightLegRotation: [0.2, 0, -0.08] as [number, number, number],
    lean: 0.1,
  },
}

export function SpartanModel() {
  const { config } = useSpartanStore()
  const { armorColors, armorMaterial, animation } = config

  const groupRef = useRef<THREE.Group>(null)
  const chestRef = useRef<THREE.Mesh>(null)
  const visorRef = useRef<THREE.Mesh>(null)

  const { metalness, roughness, emissiveIntensity } = armorMaterial

  const materials = useMemo(() => ({
    helmet: createMaterial(armorColors.helmet, metalness, roughness, emissiveIntensity),
    chest: createMaterial(armorColors.chest, metalness, roughness, emissiveIntensity),
    leftShoulder: createMaterial(armorColors.leftShoulder, metalness, roughness, emissiveIntensity),
    rightShoulder: createMaterial(armorColors.rightShoulder, metalness, roughness, emissiveIntensity),
    leftArm: createMaterial(armorColors.leftArm, metalness, roughness, emissiveIntensity),
    rightArm: createMaterial(armorColors.rightArm, metalness, roughness, emissiveIntensity),
    leftLeg: createMaterial(armorColors.leftLeg, metalness, roughness, emissiveIntensity),
    rightLeg: createMaterial(armorColors.rightLeg, metalness, roughness, emissiveIntensity),
    boots: createMaterial(armorColors.boots, metalness, roughness, emissiveIntensity),
    undersuit: createMaterial(armorColors.undersuit, 0.1, 0.8),
    visor: createMaterial(armorColors.visor, 0.9, 0.1, 1.0, armorColors.visor),
  }), [armorColors, metalness, roughness, emissiveIntensity])

  const pose = POSES[animation.poseIndex as keyof typeof POSES] || POSES[1]

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * animation.animationSpeed

    if (groupRef.current) {
      if (animation.idleAnimationEnabled) {
        groupRef.current.position.y = Math.sin(t * 0.8) * 0.02
      } else {
        groupRef.current.position.y = 0
      }
    }

    if (chestRef.current && animation.idleAnimationEnabled) {
      chestRef.current.scale.y = 1 + Math.sin(t * 1.2) * 0.005
    }

    if (visorRef.current) {
      const visorMat = visorRef.current.material as THREE.MeshStandardMaterial
      visorMat.emissiveIntensity = 0.5 + Math.sin(t * 2) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[pose.lean, 0, 0]}>
      {/* Neck */}
      <mesh material={materials.undersuit} position={[0, 1.1, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.14, 0.2, 8]} />
      </mesh>

      {/* Helmet */}
      <group position={[0, 1.4, 0]}>
        <mesh name="helmet" material={materials.helmet} castShadow>
          <sphereGeometry args={[0.28, 16, 16]} />
        </mesh>
        <mesh ref={visorRef} name="visor" material={materials.visor} position={[0, -0.04, 0.18]} castShadow>
          <boxGeometry args={[0.32, 0.12, 0.06]} />
        </mesh>
        <mesh material={materials.helmet} position={[0, 0.05, 0.22]} castShadow>
          <boxGeometry args={[0.32, 0.06, 0.08]} />
        </mesh>
        <mesh material={materials.helmet} position={[0, -0.15, 0.12]} castShadow>
          <boxGeometry args={[0.22, 0.1, 0.1]} />
        </mesh>
      </group>

      {/* Chest */}
      <mesh ref={chestRef} name="chest" material={materials.chest} position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[0.65, 0.55, 0.38]} />
      </mesh>
      <mesh material={materials.chest} position={[0, 0.62, 0.2]} castShadow>
        <boxGeometry args={[0.5, 0.3, 0.06]} />
      </mesh>

      {/* Undersuit torso */}
      <mesh material={materials.undersuit} position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.25, 0.3, 8]} />
      </mesh>

      {/* Pelvis */}
      <mesh material={materials.undersuit} position={[0, -0.02, 0]} castShadow>
        <boxGeometry args={[0.42, 0.2, 0.3]} />
      </mesh>

      {/* Shoulder pads */}
      <mesh name="left_shoulder" material={materials.leftShoulder} position={[-0.48, 0.72, 0]} castShadow>
        <boxGeometry args={[0.22, 0.18, 0.3]} />
      </mesh>
      <mesh name="right_shoulder" material={materials.rightShoulder} position={[0.48, 0.72, 0]} castShadow>
        <boxGeometry args={[0.22, 0.18, 0.3]} />
      </mesh>

      {/* Left arm */}
      <group position={[-0.45, 0.55, 0]} rotation={pose.leftArmRotation}>
        <mesh name="left_arm" material={materials.leftArm} position={[0, -0.2, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.09, 0.32, 8]} />
        </mesh>
        <mesh material={materials.leftArm} position={[0, -0.38, 0]} castShadow>
          <sphereGeometry args={[0.1, 8, 8]} />
        </mesh>
        <mesh material={materials.leftArm} position={[0, -0.55, 0]} castShadow>
          <cylinderGeometry args={[0.09, 0.08, 0.3, 8]} />
        </mesh>
        <mesh material={materials.undersuit} position={[0, -0.73, 0]} castShadow>
          <boxGeometry args={[0.13, 0.14, 0.09]} />
        </mesh>
      </group>

      {/* Right arm */}
      <group position={[0.45, 0.55, 0]} rotation={pose.rightArmRotation}>
        <mesh name="right_arm" material={materials.rightArm} position={[0, -0.2, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.09, 0.32, 8]} />
        </mesh>
        <mesh material={materials.rightArm} position={[0, -0.38, 0]} castShadow>
          <sphereGeometry args={[0.1, 8, 8]} />
        </mesh>
        <mesh material={materials.rightArm} position={[0, -0.55, 0]} castShadow>
          <cylinderGeometry args={[0.09, 0.08, 0.3, 8]} />
        </mesh>
        <mesh material={materials.undersuit} position={[0, -0.73, 0]} castShadow>
          <boxGeometry args={[0.13, 0.14, 0.09]} />
        </mesh>
      </group>

      {/* Left leg */}
      <group position={[-0.18, -0.15, 0]} rotation={pose.leftLegRotation}>
        <mesh name="left_leg" material={materials.leftLeg} position={[0, -0.22, 0]} castShadow>
          <cylinderGeometry args={[0.13, 0.11, 0.38, 8]} />
        </mesh>
        <mesh material={materials.leftLeg} position={[0, -0.44, 0]} castShadow>
          <boxGeometry args={[0.18, 0.1, 0.2]} />
        </mesh>
        <mesh material={materials.leftLeg} position={[0, -0.64, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.09, 0.38, 8]} />
        </mesh>
        <mesh name="left_boot" material={materials.boots} position={[0, -0.9, 0.04]} castShadow>
          <boxGeometry args={[0.16, 0.2, 0.28]} />
        </mesh>
      </group>

      {/* Right leg */}
      <group position={[0.18, -0.15, 0]} rotation={pose.rightLegRotation}>
        <mesh name="right_leg" material={materials.rightLeg} position={[0, -0.22, 0]} castShadow>
          <cylinderGeometry args={[0.13, 0.11, 0.38, 8]} />
        </mesh>
        <mesh material={materials.rightLeg} position={[0, -0.44, 0]} castShadow>
          <boxGeometry args={[0.18, 0.1, 0.2]} />
        </mesh>
        <mesh material={materials.rightLeg} position={[0, -0.64, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.09, 0.38, 8]} />
        </mesh>
        <mesh name="right_boot" material={materials.boots} position={[0, -0.9, 0.04]} castShadow>
          <boxGeometry args={[0.16, 0.2, 0.28]} />
        </mesh>
      </group>
    </group>
  )
}
