import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useSimulationStore } from '@/store/simulationStore';

const MainVisualization = () => {
  const svgRef = useRef(null);
  const { evolvedMinds, nodeConnections, selectNode } = useSimulationStore();
  
  useEffect(() => {
    if (!svgRef.current || evolvedMinds.length === 0) return;
    
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    
    // Clear previous visualization
    d3.select(svgRef.current).selectAll('*').remove();
    
    // Create SVG element
    const svg = d3.select(svgRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);
    
    // Create a radial force layout
    const simulation = d3.forceSimulation(evolvedMinds)
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(0, 0))
      .force('collide', d3.forceCollide().radius(d => d.size * 3))
      .force('link', d3.forceLink(nodeConnections)
        .id(d => d.id)
        .distance(d => 100 / (d.strength || 0.5))
        .strength(d => d.strength));
    
    // Create links between nodes
    const links = svg.selectAll('.link')
      .data(nodeConnections)
      .enter()
      .append('line')
      .attr('class', 'neuron-connection')
      .attr('stroke', d => {
        const sourceNode = evolvedMinds.find(node => node.id === d.source);
        return sourceNode ? sourceNode.color : '#666';
      })
      .attr('stroke-opacity', d => Math.min(1, d.strength + 0.2))
      .attr('stroke-width', d => d.strength * 2);
    
    // Create node groups
    const nodes = svg.selectAll('.node')
      .data(evolvedMinds)
      .enter()
      .append('g')
      .attr('class', 'consciousness-node')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))
      .on('click', (event, d) => {
        selectNode(d.id);
        event.stopPropagation();
      });
    
    // Add circles to nodes
    nodes.append('circle')
      .attr('r', d => d.size * 3)
      .attr('fill', d => d.color)
      .attr('opacity', 0.8)
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5)
      .attr('stroke-opacity', 0.5);
    
    // Add glowing effect
    nodes.append('circle')
      .attr('r', d => d.size * 4)
      .attr('fill', d => d.color)
      .attr('opacity', 0.3)
      .attr('filter', 'url(#glow)');
    
    // Add filter for glow effect
    const defs = svg.append('defs');
    const filter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');
    
    filter.append('feGaussianBlur')
      .attr('stdDeviation', '5')
      .attr('result', 'coloredBlur');
    
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');
    
    // Add labels
    nodes.append('text')
      .attr('dy', d => -d.size * 3 - 5)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('fill', '#fff')
      .text(d => d.name);
    
    // Add depth label
    nodes.append('text')
      .attr('dy', d => -d.size * 3 - 18)
      .attr('text-anchor', 'middle')
      .attr('font-size', '8px')
      .attr('fill', '#aaa')
      .text(d => `Level ${d.depth}`);
    
    // Update positions on each tick
    simulation.on('tick', () => {
      links
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
      
      nodes.attr('transform', d => `translate(${d.x}, ${d.y})`);
    });
    
    // Add zoom capabilities
    const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        svg.attr('transform', event.transform);
      });
    
    d3.select(svgRef.current).select('svg')
      .call(zoom);
    
    // Drag functions
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }
    
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }
    
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
    
    // Clean up simulation on unmount
    return () => {
      simulation.stop();
    };
  }, [evolvedMinds, nodeConnections, selectNode]);
  
  return (
    <div className="h-[500px] w-full bg-slate-800/50 rounded-lg control-panel">
      <div className="panel-title">Consciousness Network Visualization</div>
      <div ref={svgRef} className="w-full h-[90%]"></div>
    </div>
  );
};

export default MainVisualization;