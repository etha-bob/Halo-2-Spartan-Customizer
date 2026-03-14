import { useSpartanStore } from '../../store/useSpartanStore'

const ENV_PRESETS = ['studio', 'sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'city', 'park', 'lobby'] as const

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="toggle">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="toggle-slider" />
    </label>
  )
}

export function EnvironmentPanel() {
  const { config, setEnvironment } = useSpartanStore()
  const { environment: env } = config

  return (
    <div>
      <div className="section">
        <div className="section-title">Environment Preset</div>
        <div className="control-row">
          <select
            value={env.preset}
            onChange={(e) => setEnvironment('preset', e.target.value)}
          >
            {ENV_PRESETS.map((p) => (
              <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="section">
        <div className="section-title">Background</div>
        <div className="control-row">
          <span className="control-label">Top Color</span>
          <input type="color" value={env.backgroundColorTop} onChange={(e) => setEnvironment('backgroundColorTop', e.target.value)} />
        </div>
        <div className="control-row">
          <span className="control-label">Bottom Color</span>
          <input type="color" value={env.backgroundColorBottom} onChange={(e) => setEnvironment('backgroundColorBottom', e.target.value)} />
        </div>
        <div className="control-row">
          <span className="control-label">Skybox</span>
          <Toggle checked={env.showSkybox} onChange={(v) => setEnvironment('showSkybox', v)} />
        </div>
      </div>

      <div className="section">
        <div className="section-title">Ambient Light</div>
        <div className="control-row">
          <span className="control-label">Intensity</span>
          <input type="range" min={0} max={3} step={0.01} value={env.ambientLightIntensity}
            onChange={(e) => setEnvironment('ambientLightIntensity', parseFloat(e.target.value))} />
          <span className="control-value">{env.ambientLightIntensity.toFixed(2)}</span>
        </div>
        <div className="control-row">
          <span className="control-label">Color</span>
          <input type="color" value={env.ambientLightColor} onChange={(e) => setEnvironment('ambientLightColor', e.target.value)} />
        </div>
      </div>

      <div className="section">
        <div className="section-title">Directional Light</div>
        <div className="control-row">
          <span className="control-label">Intensity</span>
          <input type="range" min={0} max={5} step={0.01} value={env.directionalLightIntensity}
            onChange={(e) => setEnvironment('directionalLightIntensity', parseFloat(e.target.value))} />
          <span className="control-value">{env.directionalLightIntensity.toFixed(2)}</span>
        </div>
        <div className="control-row">
          <span className="control-label">Color</span>
          <input type="color" value={env.directionalLightColor} onChange={(e) => setEnvironment('directionalLightColor', e.target.value)} />
        </div>
        <div className="control-row">
          <span className="control-label">X</span>
          <input type="range" min={-10} max={10} step={0.1} value={env.directionalLightX}
            onChange={(e) => setEnvironment('directionalLightX', parseFloat(e.target.value))} />
          <span className="control-value">{env.directionalLightX.toFixed(1)}</span>
        </div>
        <div className="control-row">
          <span className="control-label">Y</span>
          <input type="range" min={0} max={20} step={0.1} value={env.directionalLightY}
            onChange={(e) => setEnvironment('directionalLightY', parseFloat(e.target.value))} />
          <span className="control-value">{env.directionalLightY.toFixed(1)}</span>
        </div>
        <div className="control-row">
          <span className="control-label">Z</span>
          <input type="range" min={-10} max={10} step={0.1} value={env.directionalLightZ}
            onChange={(e) => setEnvironment('directionalLightZ', parseFloat(e.target.value))} />
          <span className="control-value">{env.directionalLightZ.toFixed(1)}</span>
        </div>
      </div>

      <div className="section">
        <div className="section-title">Point Light</div>
        <div className="control-row">
          <span className="control-label">Enabled</span>
          <Toggle checked={env.pointLightEnabled} onChange={(v) => setEnvironment('pointLightEnabled', v)} />
        </div>
        {env.pointLightEnabled && (
          <>
            <div className="control-row">
              <span className="control-label">Intensity</span>
              <input type="range" min={0} max={5} step={0.01} value={env.pointLightIntensity}
                onChange={(e) => setEnvironment('pointLightIntensity', parseFloat(e.target.value))} />
              <span className="control-value">{env.pointLightIntensity.toFixed(2)}</span>
            </div>
            <div className="control-row">
              <span className="control-label">Color</span>
              <input type="color" value={env.pointLightColor} onChange={(e) => setEnvironment('pointLightColor', e.target.value)} />
            </div>
            <div className="control-row">
              <span className="control-label">X</span>
              <input type="range" min={-10} max={10} step={0.1} value={env.pointLightX}
                onChange={(e) => setEnvironment('pointLightX', parseFloat(e.target.value))} />
              <span className="control-value">{env.pointLightX.toFixed(1)}</span>
            </div>
            <div className="control-row">
              <span className="control-label">Y</span>
              <input type="range" min={-5} max={10} step={0.1} value={env.pointLightY}
                onChange={(e) => setEnvironment('pointLightY', parseFloat(e.target.value))} />
              <span className="control-value">{env.pointLightY.toFixed(1)}</span>
            </div>
            <div className="control-row">
              <span className="control-label">Z</span>
              <input type="range" min={-10} max={10} step={0.1} value={env.pointLightZ}
                onChange={(e) => setEnvironment('pointLightZ', parseFloat(e.target.value))} />
              <span className="control-value">{env.pointLightZ.toFixed(1)}</span>
            </div>
          </>
        )}
      </div>

      <div className="section">
        <div className="section-title">Grid</div>
        <div className="control-row">
          <span className="control-label">Show Grid</span>
          <Toggle checked={env.showGrid} onChange={(v) => setEnvironment('showGrid', v)} />
        </div>
        <div className="control-row">
          <span className="control-label">Grid Color</span>
          <input type="color" value={env.gridColor} onChange={(e) => setEnvironment('gridColor', e.target.value)} />
        </div>
      </div>

      <div className="section">
        <div className="section-title">Fog</div>
        <div className="control-row">
          <span className="control-label">Enabled</span>
          <Toggle checked={env.fogEnabled} onChange={(v) => setEnvironment('fogEnabled', v)} />
        </div>
        {env.fogEnabled && (
          <>
            <div className="control-row">
              <span className="control-label">Color</span>
              <input type="color" value={env.fogColor} onChange={(e) => setEnvironment('fogColor', e.target.value)} />
            </div>
            <div className="control-row">
              <span className="control-label">Near</span>
              <input type="range" min={1} max={50} step={0.5} value={env.fogNear}
                onChange={(e) => setEnvironment('fogNear', parseFloat(e.target.value))} />
              <span className="control-value">{env.fogNear.toFixed(1)}</span>
            </div>
            <div className="control-row">
              <span className="control-label">Far</span>
              <input type="range" min={5} max={200} step={1} value={env.fogFar}
                onChange={(e) => setEnvironment('fogFar', parseFloat(e.target.value))} />
              <span className="control-value">{env.fogFar.toFixed(0)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
