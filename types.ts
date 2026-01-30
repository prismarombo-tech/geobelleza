
export interface FaceParameters {
  faceWidth: number;
  faceHeight: number;
  eyeSpacing: number;
  eyeHeight: number;
  noseWidth: number;
  noseHeight: number;
  mouthWidth: number;
  mouthSmile: number;
  browTilt: number;
  symmetry: number;
  hairLength: number;
  hairVolume: number;
}

export enum OverlayMode {
  NONE = 'NINGUNO',
  GOLDEN_RATIO = 'PROPORCIÓN_ÁUREA',
  VORONOI = 'VORONOI',
  COORDINATES = 'COORDENADAS',
  FIBONACCI = 'FIBONACCI'
}

export interface AnalysisResponse {
  mathematicalConcept: string;
  artisticInterpretation: string;
  geometricProperties: string[];
  advancedMetrics: {
    label: string;
    value: string;
  }[];
}
