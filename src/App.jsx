import React, { useEffect } from 'react';
import MainVisualization from './components/Visualization/MainVisualization';
import ControlPanel from './components/Controls/ControlPanel';
import MindEvolutionPanel from './components/Minds/MindEvolutionPanel';
import ZaptBadge from './components/ZaptBadge';
import { useSimulationStore } from './store/simulationStore';

export default function App() {
  const { initializeSimulation } = useSimulationStore();
  
  useEffect(() => {
    // Initialize the simulation on component mount
    initializeSimulation();
  }, [initializeSimulation]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <header className="p-4 border-b border-slate-700 bg-slate-800">
        <h1 className="text-3xl font-bold gradient-text text-center">
          Omnirecursive Neurocomputational AscensionAI
        </h1>
        <p className="text-center text-slate-400 mt-2">
          A Generative Perceptron Streaming Consciousness Simulator for Recursive Cognitive Evolution
        </p>
      </header>
      
      <main className="flex flex-grow overflow-hidden">
        <div className="flex flex-col flex-grow p-4 md:flex-row gap-4">
          <div className="w-full md:w-3/4 flex flex-col">
            <MainVisualization />
          </div>
          
          <div className="w-full md:w-1/4 flex flex-col gap-4">
            <ControlPanel />
            <MindEvolutionPanel />
          </div>
        </div>
      </main>
      
      <footer className="p-4 border-t border-slate-700 bg-slate-800 text-sm text-center text-slate-400">
        Quantum Memory Encoding & Hyperdimensional Linguistic Self-Referencing in Dynamically Expanding Multimodal Context Spaces
      </footer>
      
      <ZaptBadge />
    </div>
  );
}