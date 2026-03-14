export interface ArmorColors {
  helmet: string;
  chest: string;
  leftShoulder: string;
  rightShoulder: string;
  leftArm: string;
  rightArm: string;
  leftLeg: string;
  rightLeg: string;
  boots: string;
  undersuit: string;
  visor: string;
}

export interface ArmorMaterial {
  metalness: number;
  roughness: number;
  emissiveIntensity: number;
}

export interface EnvironmentConfig {
  preset: 'studio' | 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'city' | 'park' | 'lobby';
  showGrid: boolean;
  gridColor: string;
  showSkybox: boolean;
  fogEnabled: boolean;
  fogColor: string;
  fogNear: number;
  fogFar: number;
  ambientLightIntensity: number;
  ambientLightColor: string;
  directionalLightIntensity: number;
  directionalLightColor: string;
  directionalLightX: number;
  directionalLightY: number;
  directionalLightZ: number;
  pointLightEnabled: boolean;
  pointLightColor: string;
  pointLightIntensity: number;
  pointLightX: number;
  pointLightY: number;
  pointLightZ: number;
  backgroundColorTop: string;
  backgroundColorBottom: string;
}

export interface CameraConfig {
  fov: number;
  near: number;
  far: number;
  autoRotate: boolean;
  autoRotateSpeed: number;
  minPolarAngle: number;
  maxPolarAngle: number;
  minDistance: number;
  maxDistance: number;
  dampingFactor: number;
  position: [number, number, number];
}

export interface PostFXConfig {
  bloomEnabled: boolean;
  bloomIntensity: number;
  bloomThreshold: number;
  bloomRadius: number;
  dofEnabled: boolean;
  dofFocusDistance: number;
  dofFocalLength: number;
  dofBokehScale: number;
  ssaoEnabled: boolean;
  vignetteEnabled: boolean;
  vignetteOffset: number;
  vignetteDarkness: number;
  chromaticAberrationEnabled: boolean;
  chromaticAberrationOffset: number;
}

export interface AnimationConfig {
  idleAnimationEnabled: boolean;
  turntableEnabled: boolean;
  poseIndex: number;
  animationSpeed: number;
}

export interface SpartanConfig {
  armorColors: ArmorColors;
  armorMaterial: ArmorMaterial;
  environment: EnvironmentConfig;
  camera: CameraConfig;
  postFX: PostFXConfig;
  animation: AnimationConfig;
}

export interface SavedPreset {
  name: string;
  config: SpartanConfig;
}
