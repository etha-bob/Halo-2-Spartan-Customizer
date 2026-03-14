# Halo 2 Spartan Customizer

A real-time 3D Spartan armor customizer inspired by the Halo 2 (2004) era. Built with React 19, TypeScript, Three.js, and @react-three/fiber.

🚀 **[Live Demo](https://etha-bob.github.io/Halo-2-Spartan-Customizer/)**

---

## Features

### 🪖 3D Spartan Model
- Procedurally generated humanoid Spartan from Three.js primitives (no assets required)
- Named body parts: helmet, visor, chest, shoulders, arms, hands, legs, boots, undersuit
- Each part has its own independent material (color, metalness, roughness, emissive)
- **3 Poses**: T-Pose, Idle Stance, Combat Ready
- **Procedural Animations**: breathing chest pulse, idle body bob, visor glow pulse

### 🎨 Armor Customization
- Per-part color selection with a 16-color Halo-era palette
- Custom hex color input and native color picker per armor slot
- Primary/Secondary color quick-set (apply to all armor vs. undersuit)
- Metalness, Roughness, and Emissive intensity sliders (affect all armor uniformly)
- Visor color with configurable glow
- **Randomize** button for instant color variation

### 🌍 Environment Control
- 10 environment presets (studio, sunset, dawn, night, warehouse, forest, apartment, city, park, lobby)
- Ambient light: intensity + color
- Directional light: intensity, color, XYZ position
- Point light: toggle + intensity, color, XYZ position
- Grid floor: show/hide + color
- Atmospheric fog: toggle + color, near, far
- Background gradient: top + bottom colors
- Skybox with procedural sky + stars

### 🎥 Camera Controls
- FOV slider (20–120°)
- Auto-rotate toggle + speed
- Polar angle limits (min/max)
- Orbit distance limits (min/max)
- Damping factor
- Reset Camera button

### 🎬 Animation
- Idle breathing animation toggle
- Turntable rotation toggle
- Animation speed multiplier
- 3 pose selectors with visual thumbnails

### ✨ Post-Processing Effects
- **Bloom**: intensity, luminance threshold, radius
- **Depth of Field**: focus distance, focal length, bokeh scale
- **SSAO** (Screen Space Ambient Occlusion): toggle
- **Vignette**: offset + darkness
- **Chromatic Aberration**: offset

### 💾 Save & Load
- Auto-persist to `localStorage` via Zustand `persist` middleware
- Export full config as JSON file
- Import config from JSON file
- Screenshot download as PNG (`spartan_[timestamp].png`)
- Named presets: save/load/delete up to 10 named configurations

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [Vite 8](https://vitejs.dev/) | Build tool & dev server |
| [React 19](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety (strict mode) |
| [Three.js](https://threejs.org/) | 3D engine |
| [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) | React renderer for Three.js |
| [@react-three/drei](https://github.com/pmndrs/drei) | R3F helpers (OrbitControls, Environment, etc.) |
| [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing) | Post-processing effects |
| [Zustand](https://zustand-demo.pmnd.rs/) | Global state management |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Run

```bash
# Clone the repository
git clone https://github.com/etha-bob/Halo-2-Spartan-Customizer.git
cd Halo-2-Spartan-Customizer

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173/halo2-spartan-customizer/](http://localhost:5173/halo2-spartan-customizer/) in your browser.

### Build for Production

```bash
npm run build
```

The output is in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## Project Structure

```
src/
├── main.tsx                    # Vite entry point
├── App.tsx                     # Root layout: Viewer3D + CustomizationPanel
├── store/
│   └── useSpartanStore.ts      # Zustand store (all state + localStorage persist)
├── components/
│   ├── Viewer3D.tsx            # R3F <Canvas> + PerformanceMonitor
│   ├── SpartanModel.tsx        # Procedural 3D Spartan with animations
│   ├── SceneEnvironment.tsx    # Lights, env presets, fog, grid, sky
│   ├── CameraControls.tsx      # OrbitControls wrapper
│   ├── PostProcessing.tsx      # Bloom, DoF, SSAO, Vignette, CA
│   └── CustomizationPanel/
│       ├── index.tsx           # Tab container
│       ├── ArmorPanel.tsx      # Color + material controls
│       ├── EnvironmentPanel.tsx # Lighting + env controls
│       ├── CameraPanel.tsx     # FOV, orbit, auto-rotate
│       ├── AnimationPanel.tsx  # Poses + animation toggles
│       ├── PostFXPanel.tsx     # Post-processing sliders
│       └── SavePanel.tsx       # Save/load/export/screenshot/presets
├── hooks/
│   ├── useLocalStorage.ts      # Generic localStorage hook
│   └── useScreenshot.ts        # Three.js canvas screenshot
├── types/
│   └── spartan.ts              # All TypeScript interfaces
└── styles/
    └── global.css              # Halo 2 dark UI theme
```

---

## localStorage Keys

| Key | Contents |
|---|---|
| `h2sc_config` | Full `SpartanConfig` JSON (auto-persisted via Zustand) |
| `h2sc_presets` | Array of `{ name: string, config: SpartanConfig }` (up to 10) |

---

## Deployment

The app auto-deploys to GitHub Pages on every push to `main` via `.github/workflows/deploy.yml`.

The live URL is: `https://etha-bob.github.io/Halo-2-Spartan-Customizer/`

To deploy manually:
```bash
npm run build
# Then push to main branch
```

---

## Performance

- Uses `PerformanceMonitor` from drei to automatically reduce pixel ratio when FPS drops below threshold
- Post-processing effects are conditionally rendered (disabled = no overhead)
- `preserveDrawingBuffer: true` is set on the WebGL renderer to support screenshot capture

---

## Visual Style

The UI is styled to evoke the **Halo 2 (2004) Bungie era** aesthetic:
- Dark charcoal backgrounds (`#0D0D0D`)
- Orange/gold accent color `#E8A020` for borders, highlights, and active states
- Uppercase labels with tight letter-spacing
- Subtle scanline overlay on the panel
- `1px solid #E8A020` borders with `box-shadow` glow effect
- Rajdhani font (Google Fonts)

---

## License

MIT
