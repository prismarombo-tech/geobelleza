
import React, { useState } from 'react';
import { FaceGeometry } from './components/FaceGeometry';
import { ControlPanel } from './components/ControlPanel';
import { AnalysisPanel } from './components/AnalysisPanel';
import { FaceParameters, OverlayMode } from './types';
import { Info, Maximize, Share2, Layers, Cpu, Users } from 'lucide-react';

const INITIAL_PARAMS: FaceParameters = {
  faceWidth: 160,
  faceHeight: 220,
  eyeSpacing: 65,
  eyeHeight: 70,
  noseWidth: 30,
  noseHeight: 40,
  mouthWidth: 50,
  mouthSmile: 0,
  browTilt: 5,
  symmetry: 100,
  hairLength: 40,
  hairVolume: 50
};

const App: React.FC = () => {
  const [params, setParams] = useState<FaceParameters>(INITIAL_PARAMS);
  const [overlay, setOverlay] = useState<OverlayMode>(OverlayMode.GOLDEN_RATIO);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleParamChange = (key: keyof FaceParameters, value: number) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const randomizeParams = () => {
    setParams({
      faceWidth: 140 + Math.random() * 60,
      faceHeight: 180 + Math.random() * 80,
      eyeSpacing: 50 + Math.random() * 40,
      eyeHeight: 50 + Math.random() * 40,
      noseWidth: 20 + Math.random() * 40,
      noseHeight: 30 + Math.random() * 50,
      mouthWidth: 30 + Math.random() * 60,
      mouthSmile: -20 + Math.random() * 40,
      browTilt: -20 + Math.random() * 40,
      symmetry: 80 + Math.random() * 20,
      hairLength: 10 + Math.random() * 90,
      hairVolume: 20 + Math.random() * 80
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar Controls */}
      <aside className="w-full md:w-80 lg:w-96 glass border-r border-slate-800 flex flex-col h-screen overflow-y-auto z-10">
        <header className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Layers size={18} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Geoverse</h1>
          </div>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest italic">Retratística Matemática</p>
        </header>

        <div className="p-6 space-y-8 flex-1">
          <ControlPanel 
            params={params} 
            onChange={handleParamChange} 
            onRandomize={randomizeParams}
            onReset={() => setParams(INITIAL_PARAMS)}
          />

          <div className="pt-6 border-t border-slate-800">
            <label className="text-sm font-semibold text-slate-400 mb-4 block uppercase tracking-wider">Superposiciones Geométricas</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(OverlayMode).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setOverlay(mode)}
                  className={`px-3 py-2 rounded-md text-[10px] font-bold transition-all ${
                    overlay === mode 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {mode.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        <footer className="p-4 border-t border-slate-800 bg-slate-900/50 space-y-4">
          <button 
            onClick={() => setShowAnalysis(true)}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-50 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20"
          >
            <Cpu size={18} />
            Análisis Geométrico IA
          </button>
          
          <div className="pt-2 px-2">
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">
               <Users size={12} />
               <span>Diseñadores</span>
            </div>
            <div className="grid grid-cols-2 gap-y-1 gap-x-2">
               {['Diana', 'Nestor', 'Saida', 'Daniel'].map(name => (
                 <span key={name} className="text-xs text-slate-400 hover:text-indigo-400 transition-colors cursor-default">
                   • {name}
                 </span>
               ))}
            </div>
          </div>
        </footer>
      </aside>

      {/* Main Canvas Area */}
      <main className="flex-1 relative flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black overflow-hidden p-8">
        <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="relative w-full max-w-2xl aspect-square flex items-center justify-center animate-in zoom-in duration-1000">
          <div className="absolute w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse"></div>
          <FaceGeometry params={params} overlay={overlay} />
        </div>

        {/* Floating Actions */}
        <div className="absolute bottom-8 right-8 flex gap-3">
          <button className="p-3 glass rounded-full hover:bg-slate-800 transition-colors text-slate-400 hover:text-white" title="Información">
            <Info size={20} />
          </button>
          <button className="p-3 glass rounded-full hover:bg-slate-800 transition-colors text-slate-400 hover:text-white" title="Pantalla Completa">
            <Maximize size={20} />
          </button>
          <button className="p-3 glass rounded-full hover:bg-slate-800 transition-colors text-slate-400 hover:text-white" title="Compartir">
            <Share2 size={20} />
          </button>
        </div>
      </main>

      {/* AI Analysis Modal */}
      {showAnalysis && (
        <AnalysisPanel 
          params={params} 
          onClose={() => setShowAnalysis(false)} 
        />
      )}
    </div>
  );
};

export default App;
