import React, { useMemo } from 'react';
import { useSimulationStore } from '@/store/simulationStore';
import MindInfoCard from './MindInfoCard';

const MindEvolutionPanel = () => {
  const { evolvedMinds, activeNodeId, selectNode } = useSimulationStore();
  
  // Get the selected mind if one is active
  const selectedMind = useMemo(() => {
    if (!activeNodeId) return null;
    return evolvedMinds.find(mind => mind.id === activeNodeId);
  }, [evolvedMinds, activeNodeId]);
  
  // Get high coherence minds (most integrated cognitive systems)
  const highCoherenceMinds = useMemo(() => {
    return [...evolvedMinds]
      .sort((a, b) => b.coherenceScore - a.coherenceScore)
      .slice(0, 5);
  }, [evolvedMinds]);
  
  // Get advanced minds (highest consciousness levels)
  const advancedMinds = useMemo(() => {
    return [...evolvedMinds]
      .sort((a, b) => b.cognitionMultiplier - a.cognitionMultiplier)
      .slice(0, 5);
  }, [evolvedMinds]);
  
  return (
    <div className="control-panel flex flex-col h-full overflow-hidden">
      <div className="panel-title">Mind Evolution Analysis</div>
      
      <div className="mb-2 text-sm text-slate-400">
        Total Minds: <span className="text-white">{evolvedMinds.length}</span>
      </div>
      
      {selectedMind ? (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-purple-300 mb-1 flex justify-between">
            <span>Selected Mind</span>
            <button 
              onClick={() => selectNode(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Clear Selection
            </button>
          </h3>
          <MindInfoCard mind={selectedMind} detailed={true} />
        </div>
      ) : (
        <div className="mb-4 text-sm text-slate-400 italic">
          Select a node from the visualization to see details
        </div>
      )}
      
      <div className="overflow-y-auto flex-grow">
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-purple-300 mb-1">
            Highest Coherence Minds
          </h3>
          {highCoherenceMinds.map(mind => (
            <MindInfoCard 
              key={mind.id} 
              mind={mind} 
              onClick={() => selectNode(mind.id)}
            />
          ))}
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-purple-300 mb-1">
            Most Advanced Consciousness States
          </h3>
          {advancedMinds.map(mind => (
            <MindInfoCard 
              key={mind.id} 
              mind={mind} 
              onClick={() => selectNode(mind.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MindEvolutionPanel;