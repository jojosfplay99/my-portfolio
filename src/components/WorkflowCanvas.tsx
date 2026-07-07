import React, { useMemo } from 'react';
import { ReactFlow, Background, type Node, type Edge, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

type Accent = 'emerald' | 'cyan';

interface InputNode {
  id?: string;
  label: string;
  sub: string;
  accent?: Accent;
  gridX?: number; // X column offset
  gridY?: number; // Y row offset
  connections?: Array<string | { targetId: string; label?: string; isMuted?: boolean }>;
}

interface WorkflowCanvasProps {
  nodes: InputNode[];
  accent: Accent;
  className?: string;
}

const CustomWorkflowNode = ({ data }: { data: { label: string; sub: string; accent?: Accent; isFirst: boolean; isLast: boolean } }) => {
  const isEmerald = data.accent === 'emerald';
  const isCyan = data.accent === 'cyan';

  const borderClass = isEmerald 
    ? 'border-emerald-500/40 bg-emerald-500/5 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.03)]' 
    : isCyan 
    ? 'border-cyan-500/40 bg-cyan-500/5 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.03)]' 
    : 'border-ink-700 bg-ink-900/60 text-ink-200';

  return (
    <div className={`relative px-4 py-3 rounded-xl border font-mono text-left backdrop-blur-sm min-w-[180px] ${borderClass}`}>
      {!data.isFirst && (
        <div className="absolute top-1/2 -left-[6px] h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-ink-600 bg-ink-950" />
      )}
      
      <div className="text-xs font-bold tracking-wide whitespace-nowrap">{data.label}</div>
      <div className="text-[10px] text-ink-500 mt-0.5 uppercase tracking-wider">{data.sub}</div>

      {!data.isLast && (
        <div className="absolute top-1/2 -right-[6px] h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-ink-600 bg-ink-950" />
      )}
    </div>
  );
};

const nodeTypes = {
  pipelineNode: CustomWorkflowNode,
};

export function WorkflowCanvas({ nodes: inputNodes, accent, className = '' }: WorkflowCanvasProps) {
  const { nodes, edges } = useMemo(() => {
    // 1. Build individual nodes using layout coordinates
    const calculatedNodes: Node[] = inputNodes.map((node, index) => {
      const nodeId = node.id || `node-${index}`;
      
      const posX = node.gridX !== undefined ? node.gridX * 240 : index * 240;
      const posY = node.gridY !== undefined ? node.gridY * 95 : 50;

      return {
        id: nodeId,
        type: 'pipelineNode',
        position: { x: posX, y: posY },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        data: {
          label: node.label,
          sub: node.sub,
          accent: node.accent || accent,
          isFirst: index === 0,
          isLast: !node.connections || node.connections.length === 0,
        },
      };
    });

    // 2. Map explicit edges with branch text overlays
    const calculatedEdges: Edge[] = [];
    inputNodes.forEach((node, index) => {
      const sourceId = node.id || `node-${index}`;

      if (node.connections) {
        node.connections.forEach((conn) => {
          const targetId = typeof conn === 'string' ? conn : conn.targetId;
          const edgeLabel = typeof conn === 'string' ? undefined : conn.label;
          const isMuted = typeof conn === 'string' ? false : conn.isMuted;

          calculatedEdges.push({
            id: `edge-${sourceId}-${targetId}`,
            source: sourceId,
            target: targetId,
            type: 'smoothstep',
            animated: !isMuted,
            label: edgeLabel,
            labelStyle: { fill: '#64748b', fontSize: 10, fontFamily: 'monospace', fontWeight: 'bold' },
            labelBgPadding: [4, 2],
            labelBgBorderRadius: 4,
            labelBgStyle: { fill: '#09090b', fillOpacity: 0.85 },
            style: {
              stroke: isMuted 
                ? 'rgba(71, 85, 105, 0.2)' 
                : accent === 'emerald' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(6, 182, 212, 0.4)',
              strokeWidth: 2,
            },
          });
        });
      } else if (index < inputNodes.length - 1) {
        const nextId = inputNodes[index + 1].id || `node-${index + 1}`;
        calculatedEdges.push({
          id: `edge-${sourceId}-${nextId}`,
          source: sourceId,
          target: nextId,
          type: 'smoothstep',
          animated: true,
          style: {
            stroke: accent === 'emerald' ? 'rgba(16, 185, 129, 0.35)' : 'rgba(6, 182, 212, 0.35)',
            strokeWidth: 2,
          },
        });
      }
    });

    return { nodes: calculatedNodes, edges: calculatedEdges };
  }, [inputNodes, accent]);

  return (
    <div className={`w-full h-[320px] rounded-2xl border border-ink-800 bg-ink-950/60 p-1 overflow-hidden relative ${className}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        nodesConnectable={false}
        nodesDraggable={true}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnScroll={false}
        preventScrolling={true}
      >
        <Background variant="dots" gap={16} size={1} color="rgba(255,255,255,0.06)" />
      </ReactFlow>
    </div>
  );
}