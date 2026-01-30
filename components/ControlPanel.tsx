
import React from 'react';
import { FaceParameters } from '../types';
import { RefreshCw, RotateCcw } from 'lucide-react';

interface ControlPanelProps {
  params: FaceParameters;
  onChange: (key: keyof FaceParameters, value: number) => void;
  onRandomize: () => void;
  onReset: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ params, onChange, onRandomize, onReset }) => {
  const sliders = [
    { label: 'Ancho del Rostro', key: 'faceWidth', min: 100, max: 250 },
    { label: 'Altura del Rostro', key: 'faceHeight', min: 150, max: 300 },
    { label: 'Espacio entre Ojos', key: 'eyeSpacing', min: 40, max: 120 },
    { label: 'Posición de Ojos', key: 'eyeHeight', min: 20, max: 120 },
    { label: 'Largo de Cabello', key: 'hairLength', min: 0, max: 150 },
    { label: 'Volumen de Cabello', key: 'hairVolume', min: 0, max: 100 },
    { label: 'Ancho de Nariz', key: 'noseWidth', min: 10, max: 60 },
    { label: 'Largo de Nariz', key: 'noseHeight', min: 20, max: 80 },
    { label: 'Ancho de Boca', key: 'mouthWidth', min: 20, max: 100 },
    { label: 'Curva de Sonrisa', key: 'mouthSmile', min: -30, max: 30 },
    { label: 'Ángulo de Cejas', key: 'browTilt', min: -30, max: 30 },
    { label: 'Simetría', key: 'symmetry', min: 0, max: 100 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Parámetros</h2>
        <div className="flex gap-2">
          <button 
            onClick={onRandomize}
            className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Aleatorio"
          >
            <RefreshCw size={16} />
          </button>
          <button 
            onClick={onReset}
            className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Reiniciar"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {sliders.map((slider) => (
          <div key={slider.key} className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
              <span className="text-slate-400">{slider.label}</span>
              <span className="text-indigo-400 mono">{(params as any)[slider.key]}</span>
            </div>
            <input
              type="range"
              min={slider.min}
              max={slider.max}
              value={(params as any)[slider.key]}
              onChange={(e) => onChange(slider.key as keyof FaceParameters, parseInt(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
