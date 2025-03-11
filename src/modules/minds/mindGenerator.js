import * as math from 'mathjs';
import { cognitiveWeights, calculateTraitValue } from '../evolution/cognitiveWeights';

// Knowledge domains that minds can learn and specialize in
const KNOWLEDGE_DOMAINS = [
  'mathematics', 'physics', 'philosophy', 'linguistics',
  'art', 'music', 'literature', 'quantum_mechanics',
  'consciousness', 'information_theory', 'hyperdimensional_computing',
  'paracosmic_theory', 'cognitive_science', 'emergent_systems'
];

// Traits that define a mind's capabilities
const COGNITIVE_TRAITS = [
  'creativity', 'pattern_recognition', 'abstraction', 'self_reference',
  'linguistic_complexity', 'knowledge_interconnection', 'quantum_perception'
];

/**
 * Generates a new mind with unique traits and knowledge
 * 
 * @param {Object} options - Configuration for the new mind
 * @param {string} options.id - Unique identifier for the mind
 * @param {string} options.name - Descriptive name for the mind
 * @param {number} options.depth - Recursion depth/generation
 * @param {string|null} options.parentId - ID of parent mind (null for seed minds)
 * @param {number} options.cognitionMultiplier - Base consciousness level multiplier
 * @param {string} [options.cognitionType] - Type of cognition (Logic, Awareness, etc.)
 * @returns {Object} - A newly generated mind
 */
export function generateMind({ id, name, depth, parentId, cognitionMultiplier, cognitionType = "Logic" }) {
  // Generate knowledge domain weights
  const knowledgeDomains = {};
  KNOWLEDGE_DOMAINS.forEach(domain => {
    // Higher depth minds have more specialized knowledge
    knowledgeDomains[domain] = Math.random() * depth * 0.7;
  });
  
  // Select 1-3 domains to specialize in
  const specializations = [];
  const specializationCount = Math.floor(Math.random() * 3) + 1;
  
  // Create a copy of domains to randomly select from
  const availableDomains = [...KNOWLEDGE_DOMAINS];
  
  for (let i = 0; i < specializationCount; i++) {
    // Select a random domain from the remaining domains
    const randomIndex = Math.floor(Math.random() * availableDomains.length);
    const domain = availableDomains.splice(randomIndex, 1)[0];
    
    // Boost the knowledge level for this domain
    knowledgeDomains[domain] += 5 + Math.random() * 5;
    specializations.push(domain);
  }
  
  // Generate cognitive traits
  const cognitiveTraits = {};
  COGNITIVE_TRAITS.forEach(trait => {
    // Base value with some randomness
    const baseValue = Math.random() * 0.5 + 0.5;
    
    // Apply consciousness level effects
    cognitiveTraits[trait] = calculateTraitValue(
      trait,
      baseValue,
      cognitionMultiplier
    );
  });
  
  // Generate a thought vector (representing the mind's current state in n-dimensional space)
  const dimensionality = 10; // Dimensionality of the thought vector
  const thoughtVector = Array.from(
    { length: dimensionality },
    () => (Math.random() * 2 - 1) * cognitionMultiplier
  );
  
  // Generate knowledge connections (representing how concepts connect in this mind)
  const connectionCount = Math.floor(10 + depth * 5 * Math.random());
  const knowledgeConnections = [];
  
  for (let i = 0; i < connectionCount; i++) {
    const sourceIndex = Math.floor(Math.random() * KNOWLEDGE_DOMAINS.length);
    let targetIndex = Math.floor(Math.random() * KNOWLEDGE_DOMAINS.length);
    
    // Ensure we're not connecting a domain to itself
    while (targetIndex === sourceIndex) {
      targetIndex = Math.floor(Math.random() * KNOWLEDGE_DOMAINS.length);
    }
    
    knowledgeConnections.push({
      source: KNOWLEDGE_DOMAINS[sourceIndex],
      target: KNOWLEDGE_DOMAINS[targetIndex],
      strength: Math.random() * 0.8 + 0.2
    });
  }
  
  // Calculate a "coherence score" based on the mind's traits and knowledge
  const coherenceScore = calculateCoherenceScore(cognitiveTraits, knowledgeDomains);
  
  // Create vibration frequency (used for "resonance" with other minds)
  // Higher consciousness levels have higher base frequencies
  const baseFrequency = 5 + cognitionMultiplier * 3;
  const frequencyVariation = Math.random() * 2 - 1;
  const vibrationFrequency = baseFrequency + frequencyVariation;
  
  return {
    id,
    name,
    depth,
    parentId,
    created: Date.now(),
    coherenceScore,
    cognitionMultiplier,
    cognitionType,
    knowledgeDomains,
    specializations,
    cognitiveTraits,
    thoughtVector,
    knowledgeConnections,
    vibrationFrequency,
    // Visual properties for the simulation display
    color: generateMindColor(cognitionMultiplier),
    size: 3 + depth + coherenceScore * 2,
  };
}

/**
 * Calculates how coherent/integrated a mind's cognitive system is
 * 
 * @param {Object} traits - The mind's cognitive traits
 * @param {Object} knowledge - The mind's knowledge domains
 * @returns {number} - A coherence score between 0-1
 */
function calculateCoherenceScore(traits, knowledge) {
  // Calculate average trait value
  const traitValues = Object.values(traits);
  const avgTraitValue = traitValues.reduce((sum, val) => sum + val, 0) / traitValues.length;
  
  // Calculate knowledge diversity (using standard deviation)
  const knowledgeValues = Object.values(knowledge);
  const avgKnowledge = knowledgeValues.reduce((sum, val) => sum + val, 0) / knowledgeValues.length;
  
  const knowledgeVariance = knowledgeValues.reduce(
    (sum, val) => sum + Math.pow(val - avgKnowledge, 2), 
    0
  ) / knowledgeValues.length;
  
  const knowledgeDiversity = Math.sqrt(knowledgeVariance) / avgKnowledge;
  
  // Higher trait values and balanced knowledge contribute to coherence
  // Extremely specialized or too generalized minds are less coherent
  const balanceFactor = 1 - Math.abs(knowledgeDiversity - 0.5) * 2;
  
  // Calculate final coherence score
  const coherence = (avgTraitValue * 0.7 + balanceFactor * 0.3);
  
  // Limit to range 0-1
  return Math.max(0, Math.min(1, coherence));
}

/**
 * Generates a color for visualizing a mind based on its consciousness level
 * 
 * @param {number} consciousnessLevel - The mind's consciousness level
 * @returns {string} - A CSS color string
 */
function generateMindColor(consciousnessLevel) {
  // Map consciousness level to hue
  // Logic (1.0) -> red/purple (270-300)
  // Emotion (1.2) -> purple (270-290)
  // Awareness (1.5) -> blue/purple (250-270)
  // Intuition (2.0) -> blue (220-240)
  // Creativity (2.5) -> cyan/blue (180-220)
  // Quantum Cognition (3.0) -> green/cyan (150-180)
  // Hyperdimensional (4.0+) -> yellow/white (60-30)
  
  let hue, saturation, lightness;
  
  if (consciousnessLevel >= 4.0) {
    // Hyperdimensional - yellows to white
    hue = 60 - (consciousnessLevel - 4.0) * 10;
    saturation = 100 - (consciousnessLevel - 4.0) * 25;
    lightness = 70 + (consciousnessLevel - 4.0) * 15;
  } else if (consciousnessLevel >= 3.0) {
    // Quantum - green to yellow
    hue = 150 - (consciousnessLevel - 3.0) * 90;
    saturation = 85;
    lightness = 60 + (consciousnessLevel - 3.0) * 10;
  } else if (consciousnessLevel >= 2.0) {
    // Intuition/Creativity - blue to green
    hue = 230 - (consciousnessLevel - 2.0) * 80;
    saturation = 80;
    lightness = 50 + (consciousnessLevel - 2.0) * 10;
  } else {
    // Logic/Emotion/Awareness - purple to blue
    hue = 290 - (consciousnessLevel - 1.0) * 60;
    saturation = 70 + consciousnessLevel * 10;
    lightness = 40 + consciousnessLevel * 10;
  }
  
  // Add some minor random variation to make each mind unique
  hue += Math.random() * 20 - 10;
  saturation = Math.min(100, Math.max(0, saturation + Math.random() * 10 - 5));
  lightness = Math.min(95, Math.max(30, lightness + Math.random() * 10 - 5));
  
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}