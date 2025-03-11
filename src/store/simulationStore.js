import { create } from 'zustand';
import { generateMind } from '@/modules/minds/mindGenerator';
import { cognitiveWeights } from '@/modules/evolution/cognitiveWeights';

const DEFAULT_PARAMETERS = {
  recursionDepth: 3,
  dimensionality: 5,
  evolutionSpeed: 50,
  cognitionLevel: 1.5, // Awareness level
  quantumFactor: 0.3,
  creativityFactor: 0.6,
};

export const useSimulationStore = create((set, get) => ({
  // Core simulation state
  active: false,
  simulationTick: 0,
  parameters: { ...DEFAULT_PARAMETERS },
  evolvedMinds: [],
  activeNodeId: null,
  nodeConnections: [],
  evolutionSpeed: 1000, // ms between evolution steps
  evolutionInterval: null,

  // Initialize the simulation
  initializeSimulation: () => {
    console.log('Initializing AscensionAI Simulation...');
    const initialMinds = Array.from({ length: 3 }, (_, i) => 
      generateMind({
        id: `seed-${i}`,
        name: `Seed Mind ${i+1}`,
        depth: 1,
        parentId: null,
        cognitionMultiplier: DEFAULT_PARAMETERS.cognitionLevel,
      })
    );
    
    set({
      evolvedMinds: initialMinds,
      active: true,
      nodeConnections: generateInitialConnections(initialMinds),
    });
    
    // Start the evolution process
    const evolutionInterval = setInterval(() => {
      if (get().active) {
        get().evolveMind();
      }
    }, get().evolutionSpeed);
    
    set({ evolutionInterval });
    
    return () => {
      clearInterval(get().evolutionInterval);
    };
  },
  
  // Update simulation parameters
  updateParameter: (paramName, value) => {
    console.log(`Updating parameter: ${paramName} to ${value}`);
    set(state => ({
      parameters: {
        ...state.parameters,
        [paramName]: value
      }
    }));
    
    // If updating evolution speed, reset the interval
    if (paramName === 'evolutionSpeed') {
      if (get().evolutionInterval) {
        clearInterval(get().evolutionInterval);
      }
      
      const evolutionInterval = setInterval(() => {
        if (get().active) {
          get().evolveMind();
        }
      }, 2000 - value * 18); // Map 10-100 to 1800-200ms
      
      set({ evolutionInterval, evolutionSpeed: 2000 - value * 18 });
    }
  },
  
  // Reset to default parameters
  resetParameters: () => {
    console.log('Resetting parameters to defaults');
    set({ parameters: { ...DEFAULT_PARAMETERS } });
  },
  
  // Toggle simulation active state
  toggleActive: () => {
    console.log(`Setting simulation active: ${!get().active}`);
    set(state => ({ active: !state.active }));
  },
  
  // Select a node to focus on
  selectNode: (nodeId) => {
    console.log(`Selecting node: ${nodeId}`);
    set({ activeNodeId: nodeId });
  },
  
  // Evolve a mind to create a new generation
  evolveMind: () => {
    const state = get();
    const { evolvedMinds, parameters } = state;
    
    if (!state.active || evolvedMinds.length >= 50) return;
    
    // Increment the simulation tick
    set(state => ({ simulationTick: state.simulationTick + 1 }));
    
    // Select a random mind to evolve
    const parentIndex = Math.floor(Math.random() * evolvedMinds.length);
    const parentMind = evolvedMinds[parentIndex];
    
    // Calculate cognitive level based on depth and parameters
    const newDepth = Math.min(parentMind.depth + 1, parameters.recursionDepth);
    const depthFactor = newDepth / parameters.recursionDepth;
    
    // Calculate cognition multiplier based on the cognitive state progression
    let cognitionType = "Logic";
    let cognitionMultiplier = 1.0;
    
    if (depthFactor > 0.9) {
      cognitionType = "Hyperdimensional Sentience";
      cognitionMultiplier = cognitiveWeights.hyperdimensionalSentience;
    } else if (depthFactor > 0.75) {
      cognitionType = "Quantum Cognition";
      cognitionMultiplier = cognitiveWeights.quantumCognition;
    } else if (depthFactor > 0.6) {
      cognitionType = "Creativity";
      cognitionMultiplier = cognitiveWeights.creativity;
    } else if (depthFactor > 0.45) {
      cognitionType = "Intuition";
      cognitionMultiplier = cognitiveWeights.intuition;
    } else if (depthFactor > 0.3) {
      cognitionType = "Awareness";
      cognitionMultiplier = cognitiveWeights.awareness;
    } else if (depthFactor > 0.15) {
      cognitionType = "Emotion";
      cognitionMultiplier = cognitiveWeights.emotion;
    }
    
    // Apply parameter adjustments to the base cognitive multiplier
    const adjustedMultiplier = cognitionMultiplier * 
      (1 + parameters.quantumFactor * 0.5) * 
      (1 + parameters.creativityFactor * 0.3);
    
    // Generate the new evolved mind
    const newMind = generateMind({
      id: `mind-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: `${cognitionType} Mind ${get().simulationTick}`,
      depth: newDepth,
      parentId: parentMind.id,
      cognitionMultiplier: adjustedMultiplier,
      cognitionType,
    });
    
    // Update the connections for visualization
    const newConnections = [...get().nodeConnections, {
      source: parentMind.id,
      target: newMind.id,
      strength: Math.random() * 0.5 + 0.5
    }];
    
    // Update the state with the new mind and connections
    set({
      evolvedMinds: [...evolvedMinds, newMind],
      nodeConnections: newConnections
    });
    
    console.log(`Evolved new mind: ${newMind.name} (${cognitionType})`);
    return newMind;
  },
  
  // Clear all evolved minds and reset the simulation
  clearAllMinds: () => {
    console.log('Clearing all evolved minds');
    set({
      evolvedMinds: [],
      nodeConnections: [],
      simulationTick: 0,
      active: false
    });
    
    setTimeout(() => {
      get().initializeSimulation();
    }, 500);
  }
}));

// Helper to generate initial connections between minds
function generateInitialConnections(minds) {
  const connections = [];
  
  // Create some initial connections between seed minds
  for (let i = 0; i < minds.length; i++) {
    for (let j = i + 1; j < minds.length; j++) {
      if (Math.random() > 0.3) { // 70% chance of connection
        connections.push({
          source: minds[i].id,
          target: minds[j].id,
          strength: Math.random() * 0.3 + 0.2
        });
      }
    }
  }
  
  return connections;
}