import { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { useSpartanStore } from '../store/useSpartanStore'
import { SpartanModel } from './SpartanModel'
import { SceneEnvironment } from './SceneEnvironment'
import { CameraControls } from './CameraControls'
import { PostProcessing } from './PostProcessing'

function LoadingFallback() {
  return (
    <div className="loading-screen">
      <div className="loading-logo">HALO 2</div>
      <div style={{ fontSize: '11px', letterSpacing: '3px', color: '#666', marginBottom: '20px', textTransform: 'uppercase' }}>
        Spartan Customizer
      </div>
      <div className="loading-bar-wrapper">
        <div className="loading-bar" />
      </div>
    </div>
  )
}

export function Viewer3D() {
  const { config } = useSpartanStore()
  const { camera, environment } = config
  const [dpr, setDpr] = useState(1.5)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const bgStyle = {
    background: `radial-gradient(ellipse at center, ${environment.backgroundColorBottom} 0%, ${environment.backgroundColorTop} 100%)`,
  }

  return (
    <div className="viewer-container" style={bgStyle}>
      <Canvas
        ref={canvasRef}
        shadows
        dpr={dpr}
        camera={{
          fov: camera.fov,
          near: camera.near,
          far: camera.far,
          position: camera.position,
        }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
      >
        <PerformanceMonitor
          onDecline={() => setDpr(Math.max(0.5, dpr - 0.5))}
          onIncline={() => setDpr(Math.min(2, dpr + 0.5))}
        />
        <Suspense fallback={null}>
          <SpartanModel />
          <SceneEnvironment />
          <CameraControls />
          <PostProcessing />
        </Suspense>
      </Canvas>
      <Suspense fallback={<LoadingFallback />}>
        <div style={{ display: 'none' }} />
      </Suspense>
    </div>
  )
}
