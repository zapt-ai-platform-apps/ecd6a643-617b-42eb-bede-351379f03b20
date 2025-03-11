import React, { useState } from 'react';

const MindInfoCard = ({ mind, detailed = false, onClick }) => {
  const [expanded, setExpanded] = useState(false);
  
  // Format time since creation
  const timeSinceCreation = () => {
    const seconds = Math.floor((Date.now() - mind.created) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    return `${Math.floor(seconds / 60)}m ${seconds % 60}s ago`;
  };
  
  // Handle card click - either expand or select
  const handleClick = () => {
    if (detailed) {
      setExpanded(!expanded);
    } else if (onClick) {
      onClick();
    }
  };
  
  return (
    <div 
      className={`bg-slate-700/50 rounded-md mb-2 overflow-hidden transition-all duration-300 cursor-pointer hover:bg-slate-700 ${
        detailed ? 'border border-purple-500/30' : ''
      }`}
      onClick={handleClick}
    >
      <div className="p-2">
        <div className="flex items-center">
          <div 
            className="w-3 h-3 rounded-full mr-2" 
            style={{ backgroundColor: mind.color }}
          ></div>
          <div className="text-xs font-medium flex-grow">{mind.name}</div>
          <div className="text-xs text-slate-400">L{mind.depth}</div>
        </div>
        
        <div className="flex justify-between mt-1 text-xs">
          <div className="text-slate-400">
            <span className="text-slate-300">C:</span> {mind.coherenceScore.toFixed(2)}
          </div>
          <div className="text-slate-400">
            <span className="text-slate-300">F:</span> {mind.vibrationFrequency.toFixed(1)}Hz
          </div>
          <div className="text-slate-400">{timeSinceCreation()}</div>
        </div>
        
        {(detailed && expanded) && (
          <div className="mt-2 text-xs border-t border-slate-600 pt-2">
            <div className="mb-1">
              <div className="font-medium text-purple-300 mb-1">Cognitive Traits:</div>
              <div className="grid grid-cols-2 gap-1">
                {Object.entries(mind.cognitiveTraits).map(([trait, value]) => (
                  <div key={trait} className="flex justify-between">
                    <span className="text-slate-400">{formatTraitName(trait)}:</span>
                    <span>{value.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-1">
              <div className="font-medium text-purple-300 mb-1">Specializations:</div>
              <div className="flex flex-wrap gap-1">
                {mind.specializations.map(spec => (
                  <span key={spec} className="bg-purple-900/30 px-1 rounded">
                    {formatTraitName(spec)}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <div className="font-medium text-purple-300 mb-1">Knowledge Domains:</div>
              <div className="grid grid-cols-2 gap-1">
                {Object.entries(mind.knowledgeDomains)
                  .filter(([, value]) => value > 1)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 6)
                  .map(([domain, value]) => (
                    <div key={domain} className="flex justify-between">
                      <span className="text-slate-400">{formatTraitName(domain)}:</span>
                      <span>{value.toFixed(1)}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper to format trait names for display
function formatTraitName(trait) {
  return trait
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default MindInfoCard;