import { useSpartanStore } from '../../store/useSpartanStore'

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="toggle">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="toggle-slider" />
    </label>
  )
}

export function CameraPanel() {
  const { config, setCamera } = useSpartanStore()
  const { camera } = config

  return (
    <div>
      <div className="section">
        <div className="section-title">Field of View</div>
        <div className="control-row">
          <span className="control-label">FOV</span>
          <input type="range" min={20} max={120} step={1} value={camera.fov}
            onChange={(e) => setCamera('fov', parseInt(e.target.value))} />
          <span className="control-value">{camera.fov}°</span>
        </div>
      </div>

      <div className="section">
        <div className="section-title">Auto Rotate</div>
        <div className="control-row">
          <span className="control-label">Enabled</span>
          <Toggle checked={camera.autoRotate} onChange={(v) => setCamera('autoRotate', v)} />
        </div>
        {camera.autoRotate && (
          <div className="control-row">
            <span className="control-label">Speed</span>
            <input type="range" min={0.1} max={10} step={0.1} value={camera.autoRotateSpeed}
              onChange={(e) => setCamera('autoRotateSpeed', parseFloat(e.target.value))} />
            <span className="control-value">{camera.autoRotateSpeed.toFixed(1)}</span>
          </div>
        )}
      </div>

      <div className="section">
        <div className="section-title">Orbit Limits</div>
        <div className="control-row">
          <span className="control-label">Min Polar</span>
          <input type="range" min={0} max={Math.PI} step={0.01} value={camera.minPolarAngle}
            onChange={(e) => setCamera('minPolarAngle', parseFloat(e.target.value))} />
          <span className="control-value">{(camera.minPolarAngle * 180 / Math.PI).toFixed(0)}°</span>
        </div>
        <div className="control-row">
          <span className="control-label">Max Polar</span>
          <input type="range" min={0} max={Math.PI} step={0.01} value={camera.maxPolarAngle}
            onChange={(e) => setCamera('maxPolarAngle', parseFloat(e.target.value))} />
          <span className="control-value">{(camera.maxPolarAngle * 180 / Math.PI).toFixed(0)}°</span>
        </div>
        <div className="control-row">
          <span className="control-label">Min Dist</span>
          <input type="range" min={0.5} max={10} step={0.1} value={camera.minDistance}
            onChange={(e) => setCamera('minDistance', parseFloat(e.target.value))} />
          <span className="control-value">{camera.minDistance.toFixed(1)}</span>
        </div>
        <div className="control-row">
          <span className="control-label">Max Dist</span>
          <input type="range" min={5} max={50} step={0.5} value={camera.maxDistance}
            onChange={(e) => setCamera('maxDistance', parseFloat(e.target.value))} />
          <span className="control-value">{camera.maxDistance.toFixed(1)}</span>
        </div>
      </div>

      <div className="section">
        <div className="section-title">Damping</div>
        <div className="control-row">
          <span className="control-label">Factor</span>
          <input type="range" min={0.01} max={0.5} step={0.01} value={camera.dampingFactor}
            onChange={(e) => setCamera('dampingFactor', parseFloat(e.target.value))} />
          <span className="control-value">{camera.dampingFactor.toFixed(2)}</span>
        </div>
      </div>

      <div className="section">
        <button className="btn btn-full" onClick={() => setCamera('position', [0, 1.5, 5])}>
          ↺ Reset Camera
        </button>
      </div>
    </div>
  )
}
