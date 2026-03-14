import { useState } from 'react'
import { ArmorPanel } from './ArmorPanel'
import { EnvironmentPanel } from './EnvironmentPanel'
import { CameraPanel } from './CameraPanel'
import { AnimationPanel } from './AnimationPanel'
import { PostFXPanel } from './PostFXPanel'
import { SavePanel } from './SavePanel'

const TABS = [
  { id: 'armor', label: 'Armor', icon: '🪖' },
  { id: 'env', label: 'Env', icon: '🌍' },
  { id: 'camera', label: 'Camera', icon: '🎥' },
  { id: 'anim', label: 'Anim', icon: '🎬' },
  { id: 'fx', label: 'Effects', icon: '✨' },
  { id: 'save', label: 'Save', icon: '💾' },
]

export function CustomizationPanel() {
  const [activeTab, setActiveTab] = useState('armor')

  return (
    <div className="panel-container panel-scanlines">
      <div className="panel-header">
        <h1>Spartan</h1>
        <p>Customizer — Halo 2 Edition</p>
      </div>
      <div className="tab-bar">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {activeTab === 'armor' && <ArmorPanel />}
        {activeTab === 'env' && <EnvironmentPanel />}
        {activeTab === 'camera' && <CameraPanel />}
        {activeTab === 'anim' && <AnimationPanel />}
        {activeTab === 'fx' && <PostFXPanel />}
        {activeTab === 'save' && <SavePanel />}
      </div>
    </div>
  )
}
