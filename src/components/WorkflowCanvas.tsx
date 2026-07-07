import React, { useMemo } from 'react';
import { ReactFlow, Background, type Node, type Edge, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Type definitions matching your project code design tokens
type Accent = 'emerald' | 'cyan';

interface InputNodeData {
  label: string;
  sub: string;
  accent?: Accent;
  isFirst: boolean;
  isLast: boolean;
}

interface WorkflowCanvasProps {
  nodes: Array<{
    label: string;
    sub: string;
    accent?: Accent;
  }>;
  accent: Accent; // Default fallback accent passed from ProjectPage
  className?: string;
}

// 1. Custom Node Component matching your portfolio's terminal/ink theme
const CustomWorkflowNode = ({ data }: { data: InputNodeData }) => {
  const isEmerald = data.accent === 'emerald';
  const isCyan = data.accent === 'cyan';

  // Apply conditional borders based on accents
  const borderClass = isEmerald 
    ? 'border-emerald-500/40 bg-emerald-500/5 text-emerald-300' 
    : isCyan 
    ? 'border-cyan-500/40 bg-cyan-500/5 text-cyan-300' 
    : 'border-ink-700 bg-ink-900/60 text-ink-200';

  return (
    <div className={`relative px-4 py-3 rounded-xl border font-mono text-left shadow-lg backdrop-blur-sm min-w-[150px] ${borderClass}`}>
      {/* Target handle on the left (if not the starting node) */}
      {!data.isFirst && (
        <div className="absolute top-1/2 -left-[6px] h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-ink-600 bg-ink-950" style={{ right: 'auto' }} />
      )}
      
      <div className="text-xs font-bold tracking-wide">{data.label}</div>
      <div className="text-[10px] text-ink-500 mt-0.5 uppercase tracking-wider">{data.sub}</div>

      {/* Source handle on the right (if not the ending node) */}
      {!data.isLast && (
        <div className="absolute top-1/2 -right-[6px] h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-ink-600 bg-ink-950" style={{ left: 'auto' }} />
      )}
    </div>
  );
};

// Register custom nodes with xyflow
const nodeTypes = {
  pipelineNode: CustomWorkflowNode,
};

export function WorkflowCanvas({ nodes: inputNodes, accent, className = '' }: WorkflowCanvasProps) {
  // 2. Map your raw data array into a grid of x/y nodes dynamically
  const { nodes, edges } = useMemo(() => {
    const calculatedNodes: Node[] = inputNodes.map((node, index) => {
      const isFirst = index === 0;
      const isLast = index === inputNodes.length - 1;

      return {
        id: `node-${index}`,
        type: 'pipelineNode',
        // Space nodes 220px apart horizontally
        position: { x: index * 220, y: 40 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        data: {
          label: node.label,
          sub: node.sub,
          accent: node.accent || accent, // fallback to project accent if node configuration is blank
          isFirst,
          isLast,
        },
      };
    });

    // 3. Chain sequential nodes together automatically with step-edges
    const calculatedEdges: Edge[] = [];
    for (let i = 0; i < inputNodes.length - 1; i++) {
      calculatedEdges.push({
        id: `edge-${i}-${i + 1}`,
        source: `node-${i}`,
        target: `node-${i + 1}`,
        type: 'smoothstep',
        animated: true,
        style: {
          stroke: accent === 'emerald' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(6, 182, 212, 0.3)',
          strokeWidth: 2,
        },
      });
    }

    return { nodes: calculatedNodes, edges: calculatedEdges };
  }, [inputNodes, accent]);

  return (
    <div className={`w-full rounded-2xl border border-ink-800 bg-ink-950/60 p-1 overflow-hidden relative ${className}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        nodesConnectable={false}
        nodesDraggable={true}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnScroll={false}
        preventScrolling={true}
      >
        <Background variant="dots" gap={16} size={1} color="rgba(255,255,255,0.07)" />
      </ReactFlow>
    </div>
  );
}