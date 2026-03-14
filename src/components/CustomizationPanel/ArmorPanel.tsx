import { useState } from 'react'
import { useSpartanStore } from '../../store/useSpartanStore'
import type { SpartanConfig } from '../../types/spartan'

const HALO_PALETTE = [
  '#4A4A4A', '#2C2C2C', '#6B6B6B', '#A0A0A0',
  '#8B0000', '#CC2200', '#003366', '#0055AA',
  '#1A472A', '#2E8B57', '#4B0082', '#7B2FBE',
  '#8B4513', '#CD853F', '#B8860B', '#DAA520',
]

const ARMOR_PARTS: { key: keyof SpartanConfig['armorColors']; label: string }[] = [
  { key: 'helmet', label: 'Helmet' },
  { key: 'chest', label: 'Chest' },
  { key: 'leftShoulder', label: 'L. Shoulder' },
  { key: 'rightShoulder', label: 'R. Shoulder' },
  { key: 'leftArm', label: 'L. Arm' },
  { key: 'rightArm', label: 'R. Arm' },
  { key: 'leftLeg', label: 'L. Leg' },
  { key: 'rightLeg', label: 'R. Leg' },
  { key: 'boots', label: 'Boots' },
  { key: 'undersuit', label: 'Undersuit' },
  { key: 'visor', label: 'Visor' },
]

export function ArmorPanel() {
  const { config, setArmorColor, setArmorMaterial, setPrimaryColor, setSecondaryColor, randomizeColors } = useSpartanStore()
  const { armorColors, armorMaterial } = config
  const [selectedPart, setSelectedPart] = useState<keyof typeof armorColors>('helmet')
  const [hexInput, setHexInput] = useState(armorColors[selectedPart])

  const handlePartSelect = (part: keyof typeof armorColors) => {
    setSelectedPart(part)
    setHexInput(armorColors[part])
  }

  const handleSwatchClick = (color: string) => {
    setArmorColor(selectedPart, color)
    setHexInput(color)
  }

  const handleHexInput = (val: string) => {
    setHexInput(val)
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      setArmorColor(selectedPart, val)
    }
  }

  return (
    <div>
      <div className="section">
        <div className="section-title">Quick Color</div>
        <div className="control-row">
          <span className="control-label">Primary</span>
          <input
            type="color"
            value={armorColors.helmet}
            onChange={(e) => setPrimaryColor(e.target.value)}
          />
          <span className="control-label" style={{ marginLeft: 8 }}>Secondary</span>
          <input
            type="color"
            value={armorColors.undersuit}
            onChange={(e) => setSecondaryColor(e.target.value)}
          />
        </div>
        <button className="btn btn-full" onClick={randomizeColors}>
          🎲 Randomize Colors
        </button>
      </div>

      <div className="section">
        <div className="section-title">Armor Parts</div>
        <div className="part-grid">
          {ARMOR_PARTS.map(({ key, label }) => (
            <button
              key={key}
              className={`part-btn ${selectedPart === key ? 'active' : ''}`}
              onClick={() => handlePartSelect(key)}
            >
              <span
                className="part-color-dot"
                style={{ backgroundColor: armorColors[key] }}
              />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-title">Color — {ARMOR_PARTS.find(p => p.key === selectedPart)?.label}</div>
        <div className="color-swatches">
          {HALO_PALETTE.map((color) => (
            <button
              key={color}
              className={`color-swatch ${armorColors[selectedPart] === color ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => handleSwatchClick(color)}
              title={color}
            />
          ))}
        </div>
        <div className="control-row">
          <span className="control-label">Custom Hex</span>
          <input
            type="text"
            value={hexInput}
            onChange={(e) => handleHexInput(e.target.value)}
            placeholder="#RRGGBB"
            maxLength={7}
          />
          <input
            type="color"
            value={armorColors[selectedPart]}
            onChange={(e) => {
              setArmorColor(selectedPart, e.target.value)
              setHexInput(e.target.value)
            }}
          />
        </div>
      </div>

      <div className="section">
        <div className="section-title">Material</div>
        <div className="control-row">
          <span className="control-label">Metalness</span>
          <input
            type="range"
            min={0} max={1} step={0.01}
            value={armorMaterial.metalness}
            onChange={(e) => setArmorMaterial('metalness', parseFloat(e.target.value))}
          />
          <span className="control-value">{armorMaterial.metalness.toFixed(2)}</span>
        </div>
        <div className="control-row">
          <span className="control-label">Roughness</span>
          <input
            type="range"
            min={0} max={1} step={0.01}
            value={armorMaterial.roughness}
            onChange={(e) => setArmorMaterial('roughness', parseFloat(e.target.value))}
          />
          <span className="control-value">{armorMaterial.roughness.toFixed(2)}</span>
        </div>
        <div className="control-row">
          <span className="control-label">Emissive</span>
          <input
            type="range"
            min={0} max={2} step={0.01}
            value={armorMaterial.emissiveIntensity}
            onChange={(e) => setArmorMaterial('emissiveIntensity', parseFloat(e.target.value))}
          />
          <span className="control-value">{armorMaterial.emissiveIntensity.toFixed(2)}</span>
        </div>
      </div>

      <div className="section">
        <div className="section-title">Visor</div>
        <div className="control-row">
          <span className="control-label">Visor Color</span>
          <input
            type="color"
            value={armorColors.visor}
            onChange={(e) => setArmorColor('visor', e.target.value)}
          />
          <input
            type="text"
            value={armorColors.visor}
            onChange={(e) => /^#[0-9A-Fa-f]{6}$/.test(e.target.value) && setArmorColor('visor', e.target.value)}
            style={{ width: 70 }}
          />
        </div>
      </div>
    </div>
  )
}
