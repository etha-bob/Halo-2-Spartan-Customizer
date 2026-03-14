import { useSpartanStore } from '../../store/useSpartanStore'

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="toggle">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="toggle-slider" />
    </label>
  )
}

export function PostFXPanel() {
  const { config, setPostFX } = useSpartanStore()
  const { postFX } = config

  return (
    <div>
      <div className="section">
        <div className="section-title">Bloom</div>
        <div className="control-row">
          <span className="control-label">Enabled</span>
          <Toggle checked={postFX.bloomEnabled} onChange={(v) => setPostFX('bloomEnabled', v)} />
        </div>
        {postFX.bloomEnabled && (
          <>
            <div className="control-row">
              <span className="control-label">Intensity</span>
              <input type="range" min={0} max={3} step={0.01} value={postFX.bloomIntensity}
                onChange={(e) => setPostFX('bloomIntensity', parseFloat(e.target.value))} />
              <span className="control-value">{postFX.bloomIntensity.toFixed(2)}</span>
            </div>
            <div className="control-row">
              <span className="control-label">Threshold</span>
              <input type="range" min={0} max={1} step={0.01} value={postFX.bloomThreshold}
                onChange={(e) => setPostFX('bloomThreshold', parseFloat(e.target.value))} />
              <span className="control-value">{postFX.bloomThreshold.toFixed(2)}</span>
            </div>
            <div className="control-row">
              <span className="control-label">Radius</span>
              <input type="range" min={0} max={1} step={0.01} value={postFX.bloomRadius}
                onChange={(e) => setPostFX('bloomRadius', parseFloat(e.target.value))} />
              <span className="control-value">{postFX.bloomRadius.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>

      <div className="section">
        <div className="section-title">Depth of Field</div>
        <div className="control-row">
          <span className="control-label">Enabled</span>
          <Toggle checked={postFX.dofEnabled} onChange={(v) => setPostFX('dofEnabled', v)} />
        </div>
        {postFX.dofEnabled && (
          <>
            <div className="control-row">
              <span className="control-label">Focus</span>
              <input type="range" min={0} max={1} step={0.001} value={postFX.dofFocusDistance}
                onChange={(e) => setPostFX('dofFocusDistance', parseFloat(e.target.value))} />
              <span className="control-value">{postFX.dofFocusDistance.toFixed(3)}</span>
            </div>
            <div className="control-row">
              <span className="control-label">Focal Len</span>
              <input type="range" min={0} max={1} step={0.001} value={postFX.dofFocalLength}
                onChange={(e) => setPostFX('dofFocalLength', parseFloat(e.target.value))} />
              <span className="control-value">{postFX.dofFocalLength.toFixed(3)}</span>
            </div>
            <div className="control-row">
              <span className="control-label">Bokeh</span>
              <input type="range" min={0} max={10} step={0.1} value={postFX.dofBokehScale}
                onChange={(e) => setPostFX('dofBokehScale', parseFloat(e.target.value))} />
              <span className="control-value">{postFX.dofBokehScale.toFixed(1)}</span>
            </div>
          </>
        )}
      </div>

      <div className="section">
        <div className="section-title">SSAO</div>
        <div className="control-row">
          <span className="control-label">Enabled</span>
          <Toggle checked={postFX.ssaoEnabled} onChange={(v) => setPostFX('ssaoEnabled', v)} />
        </div>
      </div>

      <div className="section">
        <div className="section-title">Vignette</div>
        <div className="control-row">
          <span className="control-label">Enabled</span>
          <Toggle checked={postFX.vignetteEnabled} onChange={(v) => setPostFX('vignetteEnabled', v)} />
        </div>
        {postFX.vignetteEnabled && (
          <>
            <div className="control-row">
              <span className="control-label">Offset</span>
              <input type="range" min={0} max={1} step={0.01} value={postFX.vignetteOffset}
                onChange={(e) => setPostFX('vignetteOffset', parseFloat(e.target.value))} />
              <span className="control-value">{postFX.vignetteOffset.toFixed(2)}</span>
            </div>
            <div className="control-row">
              <span className="control-label">Darkness</span>
              <input type="range" min={0} max={1} step={0.01} value={postFX.vignetteDarkness}
                onChange={(e) => setPostFX('vignetteDarkness', parseFloat(e.target.value))} />
              <span className="control-value">{postFX.vignetteDarkness.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>

      <div className="section">
        <div className="section-title">Chromatic Aberration</div>
        <div className="control-row">
          <span className="control-label">Enabled</span>
          <Toggle checked={postFX.chromaticAberrationEnabled} onChange={(v) => setPostFX('chromaticAberrationEnabled', v)} />
        </div>
        {postFX.chromaticAberrationEnabled && (
          <div className="control-row">
            <span className="control-label">Offset</span>
            <input type="range" min={0} max={0.01} step={0.0001} value={postFX.chromaticAberrationOffset}
              onChange={(e) => setPostFX('chromaticAberrationOffset', parseFloat(e.target.value))} />
            <span className="control-value">{postFX.chromaticAberrationOffset.toFixed(4)}</span>
          </div>
        )}
      </div>
    </div>
  )
}
