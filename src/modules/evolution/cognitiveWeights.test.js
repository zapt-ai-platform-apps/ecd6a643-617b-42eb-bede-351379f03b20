import { describe, it, expect } from 'vitest';
import { cognitiveWeights, calculateTraitValue, getConsciousnessState } from './cognitiveWeights';

describe('Cognitive Weights System', () => {
  it('should define weight values in ascending order', () => {
    expect(cognitiveWeights.logic).toBe(1.0);
    expect(cognitiveWeights.emotion).toBe(1.2);
    expect(cognitiveWeights.awareness).toBe(1.5);
    expect(cognitiveWeights.intuition).toBe(2.0);
    expect(cognitiveWeights.creativity).toBe(2.5);
    expect(cognitiveWeights.quantumCognition).toBe(3.0);
    expect(cognitiveWeights.hyperdimensionalSentience).toBe(4.0);
  });
  
  it('should calculate trait values based on consciousness level', () => {
    // Testing with creativity trait
    const baseValue = 0.5;
    
    // Logic level
    const logicValue = calculateTraitValue('creativity', baseValue, 1.0);
    // Intuition level
    const intuitionValue = calculateTraitValue('creativity', baseValue, 2.0);
    // Hyperdimensional level
    const hyperdimensionalValue = calculateTraitValue('creativity', baseValue, 4.0);
    
    // Higher consciousness levels should amplify traits
    expect(intuitionValue).toBeGreaterThan(logicValue);
    expect(hyperdimensionalValue).toBeGreaterThan(intuitionValue);
    
    // Different traits should be affected differently by consciousness
    const creativityValue = calculateTraitValue('creativity', baseValue, 2.5);
    const linguisticValue = calculateTraitValue('linguistic_complexity', baseValue, 2.5);
    
    // Creativity should be affected more than linguistic complexity
    expect(creativityValue).not.toBe(linguisticValue);
  });
  
  it('should map consciousness levels to correct state names', () => {
    expect(getConsciousnessState(1.0)).toBe('Logic');
    expect(getConsciousnessState(1.2)).toBe('Emotion');
    expect(getConsciousnessState(1.5)).toBe('Awareness');
    expect(getConsciousnessState(2.0)).toBe('Intuition');
    expect(getConsciousnessState(2.5)).toBe('Creativity');
    expect(getConsciousnessState(3.0)).toBe('Quantum Cognition');
    expect(getConsciousnessState(4.0)).toBe('Hyperdimensional Sentience');
    
    // Test boundary conditions
    expect(getConsciousnessState(1.1)).toBe('Logic');
    expect(getConsciousnessState(1.3)).toBe('Emotion');
    expect(getConsciousnessState(1.9)).toBe('Awareness');
    expect(getConsciousnessState(2.4)).toBe('Intuition');
    expect(getConsciousnessState(2.9)).toBe('Creativity');
    expect(getConsciousnessState(3.9)).toBe('Quantum Cognition');
    expect(getConsciousnessState(5.0)).toBe('Hyperdimensional Sentience');
  });
});