import { useState, useRef } from 'react'
import { useSpartanStore } from '../../store/useSpartanStore'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import type { SavedPreset, SpartanConfig } from '../../types/spartan'

function Toast({ message }: { message: string }) {
  return <div className="toast">{message}</div>
}

export function SavePanel() {
  const { config, loadConfig } = useSpartanStore()
  const [presets, setPresets] = useLocalStorage<SavedPreset[]>('h2sc_presets', [])
  const [newPresetName, setNewPresetName] = useState('')
  const [toast, setToast] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const handleSaveConfig = () => {
    localStorage.setItem('h2sc_config', JSON.stringify({ state: { config }, version: 0 }))
    showToast('Configuration saved!')
  }

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `spartan_config_${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
    showToast('Config exported!')
  }

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string) as SpartanConfig
        loadConfig(parsed)
        showToast('Config imported!')
      } catch {
        showToast('Error: Invalid config file')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleScreenshot = () => {
    const canvas = document.querySelector('canvas')
    if (!canvas) { showToast('Canvas not found'); return }
    const dataURL = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = dataURL
    a.download = `spartan_${Date.now()}.png`
    a.click()
    showToast('Screenshot saved!')
  }

  const handleSavePreset = () => {
    if (!newPresetName.trim()) { showToast('Enter a preset name'); return }
    if (presets.length >= 10) { showToast('Max 10 presets reached'); return }
    const newPreset: SavedPreset = { name: newPresetName.trim(), config: { ...config } }
    setPresets([...presets, newPreset])
    setNewPresetName('')
    showToast(`Preset "${newPreset.name}" saved!`)
  }

  const handleLoadPreset = (preset: SavedPreset) => {
    loadConfig(preset.config)
    showToast(`Preset "${preset.name}" loaded!`)
  }

  const handleDeletePreset = (index: number) => {
    const updated = presets.filter((_, i) => i !== index)
    setPresets(updated)
    showToast('Preset deleted')
  }

  return (
    <div>
      {toast && <Toast message={toast} />}

      <div className="section">
        <div className="section-title">Configuration</div>
        <button className="btn btn-full" onClick={handleSaveConfig}>💾 Save Configuration</button>
        <button className="btn btn-full" onClick={handleExportJSON}>📤 Export as JSON</button>
        <label className="file-label">
          📥 Import from JSON
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImportJSON} />
        </label>
      </div>

      <div className="section">
        <div className="section-title">Screenshot</div>
        <button className="btn btn-full" onClick={handleScreenshot}>📸 Save Screenshot</button>
      </div>

      <div className="section">
        <div className="section-title">Saved Presets ({presets.length}/10)</div>
        <div className="control-row" style={{ marginBottom: 8 }}>
          <input
            type="text"
            value={newPresetName}
            onChange={(e) => setNewPresetName(e.target.value)}
            placeholder="Preset name..."
            style={{ flex: 1 }}
            onKeyDown={(e) => e.key === 'Enter' && handleSavePreset()}
          />
          <button className="btn" style={{ marginLeft: 8 }} onClick={handleSavePreset}>Save</button>
        </div>
        <div className="preset-list">
          {presets.map((preset, i) => (
            <div key={i} className="preset-item">
              <span className="preset-name">{preset.name}</span>
              <div className="preset-actions">
                <button className="preset-btn" onClick={() => handleLoadPreset(preset)}>Load</button>
                <button className="preset-btn delete" onClick={() => handleDeletePreset(i)}>✕</button>
              </div>
            </div>
          ))}
          {presets.length === 0 && (
            <div style={{ fontSize: 11, color: '#555', letterSpacing: 1, textAlign: 'center', padding: '12px 0' }}>
              No presets saved yet
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
