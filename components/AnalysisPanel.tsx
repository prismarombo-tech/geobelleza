
import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { FaceParameters, AnalysisResponse } from '../types';
import { X, Cpu, Sparkles, Binary, Sigma, BarChart3 } from 'lucide-react';

interface AnalysisPanelProps {
  params: FaceParameters;
  onClose: () => void;
}

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ params, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Analiza estos parámetros geométricos faciales e incluyendo el cabello: ${JSON.stringify(params)}. 
          Relaciónalos con:
          1. Conceptos clásicos (Proporción Áurea, Fibonacci).
          2. Análisis avanzado (Dimensiones fractales del cabello, distribución de Voronoi facial, alineación con la Espiral Dorada).
          3. Métricas numéricas hipotéticas.
          Proporciona una interpretación artística profunda. RESPONDE SIEMPRE EN ESPAÑOL.`,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                mathematicalConcept: { type: Type.STRING, description: 'Concepto matemático principal.' },
                artisticInterpretation: { type: Type.STRING, description: 'Interpretación artística.' },
                geometricProperties: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING },
                  description: 'Observaciones geométricas.'
                },
                advancedMetrics: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      label: { type: Type.STRING },
                      value: { type: Type.STRING }
                    },
                    required: ['label', 'value']
                  },
                  description: 'Métricas matemáticas avanzadas calculadas (ej. Dimensión Fractal: 1.2).'
                }
              },
              required: ['mathematicalConcept', 'artisticInterpretation', 'geometricProperties', 'advancedMetrics']
            }
          }
        });

        const data = JSON.parse(response.text);
        setAnalysis(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo calcular el análisis matemático avanzado. Por favor, revisa tu conexión.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [params]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-3xl glass rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
        <header className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-3">
            <Cpu className="text-indigo-400" size={24} />
            <div>
              <h2 className="text-xl font-bold">Análisis Geométrico Avanzado</h2>
              <p className="text-xs text-slate-400 font-mono italic">Motor.Neuronal.v4.0_Fractal_Enabled</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400">
            <X size={24} />
          </button>
        </header>

        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles size={20} className="text-indigo-400 animate-pulse" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-slate-200">Procesando Topología y Fractales...</p>
                <p className="text-sm text-slate-500 font-mono mt-2 animate-pulse">Calculando dimensiones de Hausdorff-Besicovitch</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl text-center">
              <p className="text-red-400">{error}</p>
              <button onClick={onClose} className="mt-4 px-6 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-all">Descartar</button>
            </div>
          ) : analysis && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase tracking-widest text-[10px]">
                  <Sigma size={14} />
                  <span>Teorema Matemático Primario</span>
                </div>
                <h3 className="text-3xl font-bold text-slate-100 leading-tight">{analysis.mathematicalConcept}</h3>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <section className="md:col-span-2 space-y-6">
                   <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800 shadow-inner">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-widest text-[10px] mb-4">
                      <Binary size={14} />
                      <span>Matriz Topológica y Observaciones</span>
                    </div>
                    <ul className="space-y-3">
                      {analysis.geometricProperties.map((prop, idx) => (
                        <li key={idx} className="text-sm text-slate-300 flex items-start gap-3 italic">
                          <span className="text-slate-600 font-mono mt-0.5">[{idx}]</span>
                          {prop}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800 shadow-inner">
                    <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-widest text-[10px] mb-3">
                      <Sparkles size={14} />
                      <span>Exégesis Artística</span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed italic">
                      "{analysis.artisticInterpretation}"
                    </p>
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="p-6 bg-indigo-950/30 rounded-2xl border border-indigo-500/20">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase tracking-widest text-[10px] mb-4">
                      <BarChart3 size={14} />
                      <span>Métricas de Geoverse</span>
                    </div>
                    <div className="space-y-4">
                      {analysis.advancedMetrics.map((metric, idx) => (
                        <div key={idx} className="space-y-1">
                          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">{metric.label}</p>
                          <p className="text-lg font-mono text-indigo-300">{metric.value}</p>
                          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                             <div className="h-full bg-indigo-500/50 animate-grow" style={{width: `${Math.random() * 60 + 40}%`}}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>

              <div className="pt-6 border-t border-slate-800 text-center">
                <p className="text-[9px] text-slate-600 uppercase tracking-[0.2em] font-mono">
                  Sincronización de parámetros Geoverse completada. Semilla fractal: {Math.floor(Math.random() * 1000000)}
                </p>
              </div>
            </div>
          )}
        </div>

        <footer className="p-6 bg-slate-900/80 border-t border-slate-800 text-center flex justify-center">
          <button 
            onClick={onClose}
            className="px-12 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/30 active:scale-95"
          >
            Sincronizar Datos
          </button>
        </footer>
      </div>
    </div>
  );
};
