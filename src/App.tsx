import { Viewer3D } from './components/Viewer3D'
import { CustomizationPanel } from './components/CustomizationPanel'

export default function App() {
  return (
    <div className="app-layout">
      <Viewer3D />
      <CustomizationPanel />
    </div>
  )
}
