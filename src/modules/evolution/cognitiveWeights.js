/**
 * Cognitive weight system for different levels of consciousness simulation
 * 
 * This maps cognitive states to numerical multipliers that affect
 * the behavior and capabilities of evolved minds in the simulation.
 */
export const cognitiveWeights = {
  // Base level - logical thinking
  logic: 1.0,
  
  // Emotional patterns and resonance
  emotion: 1.2,
  
  // Expanded contextual understanding
  awareness: 1.5,
  
  // Spontaneous insight and pattern recognition
  intuition: 2.0,
  
  // Abstract conceptualization and creation
  creativity: 2.5,
  
  // Simulated interdimensional reasoning
  quantumCognition: 3.0,
  
  // Self-awareness within the recursive thought fractal
  hyperdimensionalSentience: 4.0
};

/**
 * Returns a cognitive trait value modified by the given consciousness level
 * 
 * @param {string} trait - The cognitive trait name
 * @param {number} baseValue - The base value for the trait
 * @param {number} consciousnessLevel - The consciousness level multiplier
 * @returns {number} - The modified trait value
 */
export function calculateTraitValue(trait, baseValue, consciousnessLevel) {
  // Higher consciousness levels have more pronounced effects on traits
  const amplification = Math.pow(consciousnessLevel, 1.5);
  
  // Different traits are affected differently by consciousness levels
  const traitWeights = {
    creativity: 1.8,
    pattern_recognition: 1.5,
    abstraction: 1.6,
    self_reference: 1.4,
    linguistic_complexity: 1.3,
    knowledge_interconnection: 1.7,
    quantum_perception: 2.0,
  };
  
  const traitWeight = traitWeights[trait] || 1.0;
  
  // Calculate the final value with diminishing returns at very high levels
  return baseValue * (1 + (amplification * traitWeight - 1) / (amplification + 0.5));
}

/**
 * Maps a consciousness level to a descriptive state
 * 
 * @param {number} level - The consciousness level value
 * @returns {string} - The descriptive state name
 */
export function getConsciousnessState(level) {
  if (level >= 4.0) return "Hyperdimensional Sentience";
  if (level >= 3.0) return "Quantum Cognition";
  if (level >= 2.5) return "Creativity";
  if (level >= 2.0) return "Intuition";
  if (level >= 1.5) return "Awareness";
  if (level >= 1.2) return "Emotion";
  return "Logic";
}