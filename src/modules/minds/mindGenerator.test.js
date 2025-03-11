import { describe, it, expect } from 'vitest';
import { generateMind } from './mindGenerator';

describe('Mind Generator', () => {
  it('should generate a mind with the correct structure', () => {
    const mind = generateMind({
      id: 'test-mind',
      name: 'Test Mind',
      depth: 1,
      parentId: null,
      cognitionMultiplier: 1.0,
    });
    
    // Check basic properties
    expect(mind.id).toBe('test-mind');
    expect(mind.name).toBe('Test Mind');
    expect(mind.depth).toBe(1);
    expect(mind.parentId).toBe(null);
    expect(mind.cognitionMultiplier).toBe(1.0);
    
    // Check existence of complex properties
    expect(mind.knowledgeDomains).toBeDefined();
    expect(mind.specializations).toBeDefined();
    expect(mind.specializations.length).toBeGreaterThanOrEqual(1);
    expect(mind.specializations.length).toBeLessThanOrEqual(3);
    expect(mind.cognitiveTraits).toBeDefined();
    expect(mind.thoughtVector).toBeDefined();
    expect(mind.knowledgeConnections).toBeDefined();
    expect(mind.coherenceScore).toBeGreaterThanOrEqual(0);
    expect(mind.coherenceScore).toBeLessThanOrEqual(1);
    expect(mind.vibrationFrequency).toBeGreaterThan(0);
    expect(mind.color).toMatch(/hsl\(\d+,\s*\d+%,\s*\d+%\)/);
  });
  
  it('should generate a higher consciousness mind correctly', () => {
    const highMind = generateMind({
      id: 'high-mind',
      name: 'High Consciousness Mind',
      depth: 5,
      parentId: 'parent-id',
      cognitionMultiplier: 4.0,
      cognitionType: 'Hyperdimensional Sentience'
    });
    
    // Higher consciousness minds should have particular properties
    expect(highMind.cognitionMultiplier).toBe(4.0);
    expect(highMind.cognitionType).toBe('Hyperdimensional Sentience');
    expect(highMind.coherenceScore).toBeGreaterThanOrEqual(0);
    expect(highMind.coherenceScore).toBeLessThanOrEqual(1);
    
    // Check that cognitive traits are affected by consciousness level
    Object.values(highMind.cognitiveTraits).forEach(value => {
      expect(value).toBeGreaterThan(0.5);
    });
    
    // Higher consciousness minds should have higher frequency
    expect(highMind.vibrationFrequency).toBeGreaterThan(10);
  });
  
  it('should respect parent-child relationships', () => {
    const parentMind = generateMind({
      id: 'parent-mind',
      name: 'Parent Mind',
      depth: 2,
      parentId: null,
      cognitionMultiplier: 1.5,
    });
    
    const childMind = generateMind({
      id: 'child-mind',
      name: 'Child Mind',
      depth: 3,
      parentId: 'parent-mind',
      cognitionMultiplier: 2.0,
    });
    
    expect(childMind.parentId).toBe('parent-mind');
    expect(childMind.depth).toBe(3);
    expect(parentMind.depth).toBe(2);
  });
});