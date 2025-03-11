import React, { useState } from 'react';

const ParameterSlider = ({ label, value, min, max, step, onChange, tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <div className="relative">
          <label className="text-xs text-slate-300 flex items-center">
            {label}
            <button
              className="ml-1 text-slate-500 hover:text-slate-300"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={(e) => e.preventDefault()}
              aria-label="Show information"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </button>
          </label>
          
          {showTooltip && (
            <div className="absolute z-10 bg-slate-900 text-slate-200 text-xs p-2 rounded-md shadow-lg mt-1 max-w-[200px] border border-slate-700">
              {tooltip}
            </div>
          )}
        </div>
        
        <span className="text-xs font-mono text-slate-400">
          {value.toFixed(step < 1 ? 2 : 0)}
        </span>
      </div>
      
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="slider-control"
      />
    </div>
  );
};

export default ParameterSlider;