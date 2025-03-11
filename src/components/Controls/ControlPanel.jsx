import React from 'react';
import { useSimulationStore } from '@/store/simulationStore';
import SimulationControls from './SimulationControls';
import ParameterSlider from './ParameterSlider';

const ControlPanel = () => {
  const { 
    parameters, 
    updateParameter, 
    resetParameters,
    active,
    toggleActive,
    clearAllMinds
  } = useSimulationStore();
  
  return (
    <div className="control-panel">
      <div className="panel-title">Simulation Control Panel</div>
      
      <SimulationControls 
        active={active}
        onToggle={toggleActive}
        onReset={clearAllMinds}
      />
      
      <div className="mt-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm text-purple-300">Parameter Controls</span>
          <button 
            onClick={resetParameters}
            className="text-xs text-slate-400 hover:text-white"
          >
            Reset Defaults
          </button>
        </div>
        
        <ParameterSlider
          label="Recursion Depth"
          value={parameters.recursionDepth}
          min={1}
          max={8}
          step={1}
          onChange={(value) => updateParameter('recursionDepth', value)}
          tooltip="Controls how many layers of recursive minds can evolve"
        />
        
        <ParameterSlider
          label="Dimensionality"
          value={parameters.dimensionality}
          min={2}
          max={10}
          step={1}
          onChange={(value) => updateParameter('dimensionality', value)}
          tooltip="Determines the complexity of mind representation in dimensional space"
        />
        
        <ParameterSlider
          label="Evolution Speed"
          value={parameters.evolutionSpeed}
          min={10}
          max={100}
          step={1}
          onChange={(value) => updateParameter('evolutionSpeed', value)}
          tooltip="Controls how quickly new minds evolve from existing ones"
        />
        
        <ParameterSlider
          label="Cognition Level"
          value={parameters.cognitionLevel}
          min={1.0}
          max={4.0}
          step={0.1}
          onChange={(value) => updateParameter('cognitionLevel', value)}
          tooltip="Base consciousness level for new minds"
        />
        
        <ParameterSlider
          label="Quantum Factor"
          value={parameters.quantumFactor}
          min={0}
          max={1}
          step={0.05}
          onChange={(value) => updateParameter('quantumFactor', value)}
          tooltip="Influences quantum-like probabilistic behavior in mind evolution"
        />
        
        <ParameterSlider
          label="Creativity Factor"
          value={parameters.creativityFactor}
          min={0}
          max={1}
          step={0.05}
          onChange={(value) => updateParameter('creativityFactor', value)}
          tooltip="Affects novelty and divergence in evolved mind properties"
        />
      </div>
    </div>
  );
};

export default ControlPanel;