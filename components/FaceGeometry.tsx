
import React, { useMemo } from 'react';
import { FaceParameters, OverlayMode } from '../types';

interface FaceGeometryProps {
  params: FaceParameters;
  overlay: OverlayMode;
}

export const FaceGeometry: React.FC<FaceGeometryProps> = ({ params, overlay }) => {
  const center = { x: 250, y: 250 };
  
  const facePaths = useMemo(() => {
    const { 
      faceWidth, faceHeight, eyeSpacing, eyeHeight, noseWidth, noseHeight, 
      mouthWidth, mouthSmile, browTilt, symmetry, hairLength, hairVolume 
    } = params;
    const asymmetryFactor = (100 - symmetry) / 100;
    
    // Hair calculations based on parameters
    const hairTop = center.y - faceHeight/2 - 20 - (hairVolume / 5);
    const hairWidth = faceWidth + 20 + (hairVolume / 2);
    const hairBottom = center.y + (hairLength * 1.5);
    
    return {
      face: `M ${center.x - faceWidth/2} ${center.y} 
              Q ${center.x - faceWidth/2} ${center.y - faceHeight/2}, ${center.x} ${center.y - faceHeight/2}
              Q ${center.x + faceWidth/2} ${center.y - faceHeight/2}, ${center.x + faceWidth/2} ${center.y}
              Q ${center.x + faceWidth/2} ${center.y + faceHeight/2}, ${center.x} ${center.y + faceHeight/2}
              Q ${center.x - faceWidth/2} ${center.y + faceHeight/2}, ${center.x - faceWidth/2} ${center.y} Z`,
      hair: `M ${center.x - hairWidth/2} ${center.y}
              Q ${center.x - hairWidth/2} ${hairTop}, ${center.x} ${hairTop}
              Q ${center.x + hairWidth/2} ${hairTop}, ${center.x + hairWidth/2} ${center.y}
              L ${center.x + hairWidth/2} ${hairBottom}
              Q ${center.x} ${hairBottom + 20}, ${center.x - hairWidth/2} ${hairBottom} Z`,
      jawLine: `M ${center.x - faceWidth/2.2} ${center.y + 20}
                 Q ${center.x} ${center.y + faceHeight/1.8}, ${center.x + faceWidth/2.2} ${center.y + 20}`,
      leftEye: {
        cx: center.x - eyeSpacing/2,
        cy: center.y - eyeHeight/4,
        rx: 18,
        ry: 12
      },
      rightEye: {
        cx: center.x + (eyeSpacing/2) * (1 - asymmetryFactor * 0.2),
        cy: center.y - eyeHeight/4,
        rx: 18,
        ry: 12
      },
      noseBridge: `M ${center.x} ${center.y - 10} L ${center.x} ${center.y + noseHeight/2}`,
      noseBase: `M ${center.x - noseWidth/2} ${center.y + noseHeight/2}
                  Q ${center.x} ${center.y + noseHeight/2 + 5}, ${center.x + noseWidth/2} ${center.y + noseHeight/2}`,
      mouth: `M ${center.x - mouthWidth/2} ${center.y + faceHeight/4}
               Q ${center.x} ${center.y + faceHeight/4 + mouthSmile}, ${center.x + mouthWidth/2} ${center.y + faceHeight/4}`,
      mouthShadow: `M ${center.x - mouthWidth/2.5} ${center.y + faceHeight/4 + 8}
                     Q ${center.x} ${center.y + faceHeight/4 + mouthSmile + 10}, ${center.x + mouthWidth/2.5} ${center.y + faceHeight/4 + 8}`,
      browLeft: `M ${center.x - eyeSpacing/2 - 25} ${center.y - eyeHeight/4 - 25}
                  L ${center.x - eyeSpacing/2 + 25} ${center.y - eyeHeight/4 - 25 - browTilt}`,
      browRight: `M ${center.x + eyeSpacing/2 - 25} ${center.y - eyeHeight/4 - 25 - browTilt}
                   L ${center.x + eyeSpacing/2 + 25} ${center.y - eyeHeight/4 - 25}`
    };
  }, [params, center]);

  const renderOverlay = () => {
    switch(overlay) {
      case OverlayMode.GOLDEN_RATIO:
        const phi = 1.618;
        return (
          <g className="stroke-indigo-500/20 fill-none" strokeWidth="0.5" strokeDasharray="3 3">
            <line x1="0" y1={center.y - params.faceHeight/2} x2="500" y2={center.y - params.faceHeight/2} />
            <line x1="0" y1={center.y + params.faceHeight/2} x2="500" y2={center.y + params.faceHeight/2} />
            <line x1="0" y1={center.y - params.faceHeight/2 + params.faceHeight/phi} x2="500" y2={center.y - params.faceHeight/2 + params.faceHeight/phi} />
            <line x1={center.x - params.faceWidth/2} y1="0" x2={center.x - params.faceWidth/2} y2="500" />
            <line x1={center.x + params.faceWidth/2} y1="0" x2={center.x + params.faceWidth/2} y2="500" />
            <circle cx={center.x} cy={center.y} r={params.faceWidth/2} className="stroke-indigo-500/10" />
          </g>
        );
      case OverlayMode.COORDINATES:
        return (
          <g className="stroke-emerald-500/30" strokeWidth="0.5">
            <line x1="0" y1={center.y} x2="500" y2={center.y} />
            <line x1={center.x} y1="0" x2={center.x} y2="500" />
            {Array.from({length: 21}).map((_, i) => (
              <React.Fragment key={i}>
                <line x1={i*25} y1={center.y - 3} x2={i*25} y2={center.y + 3} />
                <line x1={center.x - 3} y1={i*25} x2={center.x + 3} y2={i*25} />
              </React.Fragment>
            ))}
          </g>
        );
      case OverlayMode.FIBONACCI:
        return (
          <g className="stroke-amber-500/20 fill-none" strokeWidth="1">
            <path d={`M ${center.x} ${center.y} 
                      A 20 20 0 0 1 ${center.x+20} ${center.y-20} 
                      A 30 30 0 0 1 ${center.x-10} ${center.y-50}
                      A 50 50 0 0 1 ${center.x-60} ${center.y}
                      A 80 80 0 0 1 ${center.x+20} ${center.y+80}
                      A 130 130 0 0 1 ${center.x+150} ${center.y-50}`} 
            />
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <svg viewBox="0 0 500 500" className="w-full h-full">
      <defs>
        <radialGradient id="face3d" cx="50%" cy="40%" r="60%" fx="50%" fy="30%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="60%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>

        <linearGradient id="hairGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
        
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="15" />
          <feOffset dx="0" dy="20" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="hairDepth">
           <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
           <feOffset dx="0" dy="6" result="offset" />
           <feComponentTransfer>
             <feFuncA type="linear" slope="0.4" />
           </feComponentTransfer>
           <feMerge>
             <feMergeNode />
             <feMergeNode in="SourceGraphic" />
           </feMerge>
        </filter>

        <filter id="eyeGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Grid Overlay */}
      {renderOverlay()}

      {/* Cabello (ahora dinámico) */}
      <path 
        d={facePaths.hair} 
        fill="url(#hairGradient)" 
        filter="url(#hairDepth)"
        className="transition-all duration-300 ease-out"
      />

      {/* Face Base */}
      <path 
        d={facePaths.face} 
        fill="url(#face3d)" 
        stroke="#475569" 
        strokeWidth="1"
        filter="url(#softShadow)"
      />

      {/* Sombras volumétricas faciales */}
      <path 
        d={facePaths.jawLine} 
        fill="none" 
        stroke="#000" 
        strokeWidth="15" 
        strokeOpacity="0.15" 
        strokeLinecap="round"
      />

      {/* Ojos Realistas */}
      <g filter="url(#eyeGlow)">
        <ellipse 
          cx={facePaths.leftEye.cx} 
          cy={facePaths.leftEye.cy} 
          rx={facePaths.leftEye.rx} 
          ry={facePaths.leftEye.ry} 
          fill="white" 
          fillOpacity="0.9"
        />
        <circle cx={facePaths.leftEye.cx} cy={facePaths.leftEye.cy} r="8" fill="#4f46e5" />
        <circle cx={facePaths.leftEye.cx} cy={facePaths.leftEye.cy} r="4" fill="black" />
        <circle cx={facePaths.leftEye.cx - 3} cy={facePaths.leftEye.cy - 3} r="2" fill="white" fillOpacity="0.8" />

        <ellipse 
          cx={facePaths.rightEye.cx} 
          cy={facePaths.rightEye.cy} 
          rx={facePaths.rightEye.rx} 
          ry={facePaths.rightEye.ry} 
          fill="white" 
          fillOpacity="0.9"
        />
        <circle cx={facePaths.rightEye.cx} cy={facePaths.rightEye.cy} r="8" fill="#4f46e5" />
        <circle cx={facePaths.rightEye.cx} cy={facePaths.rightEye.cy} r="4" fill="black" />
        <circle cx={facePaths.rightEye.cx - 3} cy={facePaths.rightEye.cy - 3} r="2" fill="white" fillOpacity="0.8" />
      </g>

      {/* Nariz */}
      <g className="stroke-slate-400" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d={facePaths.noseBridge} strokeOpacity="0.3" />
        <path d={facePaths.noseBase} strokeWidth="3" />
      </g>

      {/* Boca */}
      <g className="fill-none stroke-indigo-400" strokeLinecap="round">
        <path d={facePaths.mouthShadow} stroke="#000" strokeOpacity="0.2" strokeWidth="4" />
        <path d={facePaths.mouth} strokeWidth="3" />
      </g>

      {/* Cejas */}
      <g className="stroke-slate-900" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.8">
        <path d={facePaths.browLeft} />
        <path d={facePaths.browRight} />
      </g>

      {/* Puntos de Referencia Geométricos */}
      <g className="fill-indigo-500 shadow-xl">
        <circle cx={center.x} cy={center.y - params.faceHeight/2} r="4" className="animate-pulse" />
        <circle cx={center.x} cy={center.y + params.faceHeight/2} r="4" className="animate-pulse" />
        <circle cx={center.x - params.faceWidth/2} cy={center.y} r="4" className="animate-pulse" />
        <circle cx={center.x + params.faceWidth/2} cy={center.y} r="4" className="animate-pulse" />
      </g>
    </svg>
  );
};
