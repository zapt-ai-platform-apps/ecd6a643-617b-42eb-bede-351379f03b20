import React from 'react';

const SimulationControls = ({ active, onToggle, onReset }) => {
  return (
    <div className="flex justify-between gap-2">
      <button
        onClick={onToggle}
        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
          active 
            ? 'bg-red-600 hover:bg-red-500 text-white' 
            : 'bg-green-600 hover:bg-green-500 text-white'
        }`}
      >
        {active ? 'Pause Evolution' : 'Start Evolution'}
      </button>
      
      <button
        onClick={onReset}
        className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 cursor-pointer"
      >
        Reset Simulation
      </button>
    </div>
  );
};

export default SimulationControls;