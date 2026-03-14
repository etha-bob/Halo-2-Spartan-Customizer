import { useSpartanStore } from '../../store/useSpartanStore'

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="toggle">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="toggle-slider" />
    </label>
  )
}

const POSES = [
  { index: 0, label: 'T-Pose', icon: '🧍', description: 'Standard T-pose' },
  { index: 1, label: 'Idle', icon: '🪖', description: 'Relaxed idle stance' },
  { index: 2, label: 'Combat', icon: '⚔️', description: 'Combat ready' },
]

export function AnimationPanel() {
  const { config, setAnimation } = useSpartanStore()
  const { animation } = config

  return (
    <div>
      <div className="section">
        <div className="section-title">Idle Animation</div>
        <div className="control-row">
          <span className="control-label">Breathing</span>
          <Toggle checked={animation.idleAnimationEnabled} onChange={(v) => setAnimation('idleAnimationEnabled', v)} />
        </div>
        <div className="control-row">
          <span className="control-label">Turntable</span>
          <Toggle checked={animation.turntableEnabled} onChange={(v) => setAnimation('turntableEnabled', v)} />
        </div>
        <div className="control-row">
          <span className="control-label">Speed</span>
          <input type="range" min={0.1} max={3} step={0.1} value={animation.animationSpeed}
            onChange={(e) => setAnimation('animationSpeed', parseFloat(e.target.value))} />
          <span className="control-value">{animation.animationSpeed.toFixed(1)}x</span>
        </div>
      </div>

      <div className="section">
        <div className="section-title">Pose</div>
        <div className="pose-grid">
          {POSES.map((pose) => (
            <button
              key={pose.index}
              className={`pose-btn ${animation.poseIndex === pose.index ? 'active' : ''}`}
              onClick={() => setAnimation('poseIndex', pose.index)}
            >
              <span className="pose-icon">{pose.icon}</span>
              {pose.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
