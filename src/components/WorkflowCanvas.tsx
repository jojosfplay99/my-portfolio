import React, { useMemo } from 'react';
import { ReactFlow, Background, type Node, type Edge, Position, Handle } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

type Accent = 'emerald' | 'cyan';

interface ConnectionRoute {
  targetId: string;
  label?: string;
  isMuted?: boolean;
  sourceHandle?: string;
}

interface InputNode {
  id?: string;
  label: string;
  sub: string;
  accent?: Accent;
  gridX?: number;
  gridY?: number;
  isConditional?: boolean;
  connections?: Array<string | ConnectionRoute>;
}

interface WorkflowCanvasProps {
  nodes: InputNode[];
  accent: Accent;
  className?: string;
}

// Custom Node Component supporting dual multi-port routing handles for IF splits
const CustomWorkflowNode = ({ id, data }: { id: string; data: { label: string; sub: string; accent?: Accent; isFirst: boolean; isLast: boolean; isConditional?: boolean } }) => {
  const isEmerald = data.accent === 'emerald';
  const isCyan = data.accent === 'cyan';

  const borderClass = isEmerald 
    ? 'border-emerald-500/40 bg-emerald-500/5 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.03)]' 
    : isCyan 
    ? 'border-cyan-500/40 bg-cyan-500/5 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.03)]' 
    : 'border-ink-700 bg-ink-900/60 text-ink-200';

  return (
    <div className={`relative px-4 py-3 rounded-xl border font-mono text-left backdrop-blur-sm min-w-[190px] ${borderClass}`}>
      {/* Universal input handle on the left */}
      {!data.isFirst && (
        <Handle
          type="target"
          position={Position.Left}
          className="!h-2.5 !w-2.5 !bg-ink-950 !border-ink-600 !-left-[6px] !top-1/2 !-translate-y-1/2"
        />
      )}
      
      <div className="text-xs font-bold tracking-wide whitespace-nowrap">{data.label}</div>
      <div className="text-[10px] text-ink-500 mt-0.5 uppercase tracking-wider">{data.sub}</div>

      {/* Conditional Output Routing Engine (True/False splits) */}
      {data.isConditional ? (
        <>
          {/* Top output port */}
          <Handle
            type="source"
            id="true-out"
            position={Position.Right}
            className="!h-2.5 !w-2.5 !bg-emerald-500 !border-emerald-600/40 !-right-[6px] !top-[30%]"
          />
          {/* Bottom output port */}
          <Handle
            type="source"
            id="false-out"
            position={Position.Right}
            className="!h-2.5 !w-2.5 !bg-ink-500 !border-ink-600 !-right-[6px] !top-[70%]"
          />
        </>
      ) : (
        /* Standard structural output handle */
        !data.isLast && (
          <Handle
            type="source"
            position={Position.Right}
            className="!h-2.5 !w-2.5 !bg-ink-950 !border-ink-600 !-right-[6px] !top-1/2 !-translate-y-1/2"
          />
        )
      )}
    </div>
  );
};

const nodeTypes = {
  pipelineNode: CustomWorkflowNode,
};

export function WorkflowCanvas({ nodes: inputNodes, accent, className = '' }: WorkflowCanvasProps) {
  const { nodes, edges } = useMemo(() => {
    // 1. Build spatial grid coordinates
    const calculatedNodes: Node[] = inputNodes.map((node, index) => {
      const nodeId = node.id || `node-${index}`;
      const posX = node.gridX !== undefined ? node.gridX * 240 : index * 240;
      const posY = node.gridY !== undefined ? node.gridY * 110 : 70; // Expanded spacing buffer to accommodate vertical branch layouts

      return {
        id: nodeId,
        type: 'pipelineNode',
        position: { x: posX, y: posY },
        data: {
          label: node.label,
          sub: node.sub,
          accent: node.accent || accent,
          isFirst: index === 0,
          isLast: !node.connections || node.connections.length === 0,
          isConditional: node.isConditional,
        },
      };
    });

    // 2. Weave connection vectors across mapped handles
    const calculatedEdges: Edge[] = [];
    inputNodes.forEach((node, index) => {
      const sourceId = node.id || `node-${index}`;

      if (node.connections && node.connections.length > 0) {
        node.connections.forEach((conn) => {
          const targetId = typeof conn === 'string' ? conn : conn.targetId;
          const edgeLabel = typeof conn === 'string' ? undefined : conn.label;
          const isMuted = typeof conn === 'string' ? false : conn.isMuted;
          const sourceHandle = typeof conn === 'string' ? undefined : conn.sourceHandle;

          calculatedEdges.push({
            id: `edge-${sourceId}-${targetId}-${edgeLabel || 'main'}`,
            source: sourceId,
            target: targetId,
            sourceHandle: sourceHandle, // Correctly targets the true-out or false-out handle
            type: 'smoothstep',
            animated: !isMuted,
            label: edgeLabel,
            labelStyle: { fill: isMuted ? '#4b5563' : '#94a3b8', fontSize: 10, fontFamily: 'monospace', fontWeight: 'bold' },
            labelBgPadding: [5, 3],
            labelBgBorderRadius: 4,
            labelBgStyle: { fill: '#09090b', fillOpacity: 0.95 },
            style: {
              stroke: isMuted 
                ? 'rgba(71, 85, 105, 0.25)' 
                : accent === 'emerald' ? 'rgba(16, 185, 129, 0.5)' : 'rgba(6, 182, 212, 0.5)',
              strokeWidth: 2,
            },
          });
        });
      }
    });

    return { nodes: calculatedNodes, edges: calculatedEdges };
  }, [inputNodes, accent]);

  return (
    <div className={`w-full h-[360px] rounded-2xl border border-ink-800 bg-ink-950/60 p-1 overflow-hidden relative ${className}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.12 }}
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