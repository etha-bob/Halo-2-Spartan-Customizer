import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SpartanConfig } from '../types/spartan';

const defaultConfig: SpartanConfig = {
  armorColors: {
    helmet: '#4A4A4A',
    chest: '#4A4A4A',
    leftShoulder: '#4A4A4A',
    rightShoulder: '#4A4A4A',
    leftArm: '#4A4A4A',
    rightArm: '#4A4A4A',
    leftLeg: '#4A4A4A',
    rightLeg: '#4A4A4A',
    boots: '#4A4A4A',
    undersuit: '#1A1A1A',
    visor: '#FF6600',
  },
  armorMaterial: {
    metalness: 0.7,
    roughness: 0.3,
    emissiveIntensity: 0.0,
  },
  environment: {
    preset: 'studio',
    showGrid: true,
    gridColor: '#333333',
    showSkybox: false,
    fogEnabled: false,
    fogColor: '#111111',
    fogNear: 10,
    fogFar: 50,
    ambientLightIntensity: 0.5,
    ambientLightColor: '#ffffff',
    directionalLightIntensity: 1.5,
    directionalLightColor: '#c8e0ff',
    directionalLightX: 5,
    directionalLightY: 10,
    directionalLightZ: 5,
    pointLightEnabled: false,
    pointLightColor: '#0044ff',
    pointLightIntensity: 1.0,
    pointLightX: 0,
    pointLightY: 3,
    pointLightZ: 3,
    backgroundColorTop: '#040a14',
    backgroundColorBottom: '#0c1829',
  },
  camera: {
    fov: 45,
    near: 0.1,
    far: 1000,
    autoRotate: true,
    autoRotateSpeed: 1.5,
    minPolarAngle: 0,
    maxPolarAngle: Math.PI,
    minDistance: 1,
    maxDistance: 20,
    dampingFactor: 0.05,
    position: [0, 1.5, 5],
  },
  postFX: {
    bloomEnabled: true,
    bloomIntensity: 0.4,
    bloomThreshold: 0.85,
    bloomRadius: 0.4,
    dofEnabled: false,
    dofFocusDistance: 0.1,
    dofFocalLength: 0.05,
    dofBokehScale: 2,
    ssaoEnabled: false,
    vignetteEnabled: true,
    vignetteOffset: 0.5,
    vignetteDarkness: 0.5,
    chromaticAberrationEnabled: false,
    chromaticAberrationOffset: 0.002,
  },
  animation: {
    idleAnimationEnabled: true,
    turntableEnabled: true,
    poseIndex: 1,
    animationSpeed: 1.0,
  },
};

interface SpartanStore {
  config: SpartanConfig;
  setArmorColor: (part: keyof SpartanConfig['armorColors'], color: string) => void;
  setArmorMaterial: (key: keyof SpartanConfig['armorMaterial'], value: number) => void;
  setEnvironment: (key: keyof SpartanConfig['environment'], value: unknown) => void;
  setCamera: (key: keyof SpartanConfig['camera'], value: unknown) => void;
  setPostFX: (key: keyof SpartanConfig['postFX'], value: unknown) => void;
  setAnimation: (key: keyof SpartanConfig['animation'], value: unknown) => void;
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
  randomizeColors: () => void;
  loadConfig: (config: SpartanConfig) => void;
  resetConfig: () => void;
}

const HALO_COLORS = [
  '#4A4A4A', '#2C2C2C', '#6B6B6B', '#8B0000',
  '#003366', '#1A472A', '#4B0082', '#8B4513',
  '#2F4F4F', '#556B2F', '#8B8B00', '#4682B4',
  '#B8860B', '#800020', '#1C1C8B', '#3D5A3D',
];

export const useSpartanStore = create<SpartanStore>()(
  persist(
    (set) => ({
      config: defaultConfig,
      setArmorColor: (part, color) =>
        set((state) => ({
          config: {
            ...state.config,
            armorColors: { ...state.config.armorColors, [part]: color },
          },
        })),
      setArmorMaterial: (key, value) =>
        set((state) => ({
          config: {
            ...state.config,
            armorMaterial: { ...state.config.armorMaterial, [key]: value },
          },
        })),
      setEnvironment: (key, value) =>
        set((state) => ({
          config: {
            ...state.config,
            environment: { ...state.config.environment, [key]: value },
          },
        })),
      setCamera: (key, value) =>
        set((state) => ({
          config: {
            ...state.config,
            camera: { ...state.config.camera, [key]: value },
          },
        })),
      setPostFX: (key, value) =>
        set((state) => ({
          config: {
            ...state.config,
            postFX: { ...state.config.postFX, [key]: value },
          },
        })),
      setAnimation: (key, value) =>
        set((state) => ({
          config: {
            ...state.config,
            animation: { ...state.config.animation, [key]: value },
          },
        })),
      setPrimaryColor: (color) =>
        set((state) => ({
          config: {
            ...state.config,
            armorColors: {
              ...state.config.armorColors,
              helmet: color,
              chest: color,
              leftShoulder: color,
              rightShoulder: color,
              leftArm: color,
              rightArm: color,
              leftLeg: color,
              rightLeg: color,
              boots: color,
            },
          },
        })),
      setSecondaryColor: (color) =>
        set((state) => ({
          config: {
            ...state.config,
            armorColors: { ...state.config.armorColors, undersuit: color },
          },
        })),
      randomizeColors: () =>
        set((state) => ({
          config: {
            ...state.config,
            armorColors: {
              helmet: HALO_COLORS[Math.floor(Math.random() * HALO_COLORS.length)],
              chest: HALO_COLORS[Math.floor(Math.random() * HALO_COLORS.length)],
              leftShoulder: HALO_COLORS[Math.floor(Math.random() * HALO_COLORS.length)],
              rightShoulder: HALO_COLORS[Math.floor(Math.random() * HALO_COLORS.length)],
              leftArm: HALO_COLORS[Math.floor(Math.random() * HALO_COLORS.length)],
              rightArm: HALO_COLORS[Math.floor(Math.random() * HALO_COLORS.length)],
              leftLeg: HALO_COLORS[Math.floor(Math.random() * HALO_COLORS.length)],
              rightLeg: HALO_COLORS[Math.floor(Math.random() * HALO_COLORS.length)],
              boots: HALO_COLORS[Math.floor(Math.random() * HALO_COLORS.length)],
              undersuit: state.config.armorColors.undersuit,
              visor: '#FF6600',
            },
          },
        })),
      loadConfig: (config) => set({ config }),
      resetConfig: () => set({ config: defaultConfig }),
    }),
    {
      name: 'h2sc_config',
    }
  )
);
