import { useState, useCallback } from 'react';
import { ReactFlow, Controls, Background, addEdge, applyNodeChanges, applyEdgeChanges, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { PageHeader } from '../App';

const initialNodes: Node[] = [
  { 
    id: '1', 
    position: { x: 400, y: 100 }, 
    data: { label: 'Thesis: Dampak Literasi Digital terhadap Prestasi Belajar' },
    style: { border: '2px solid #D4AF37', background: '#fff', borderRadius: '4px', padding: '10px 20px', fontWeight: 'bold' } 
  },
  { 
    id: '2', 
    position: { x: 200, y: 250 }, 
    data: { label: 'Theory: Uses and Gratifications' },
    style: { border: '2px solid #1E2A38', background: '#fff', borderRadius: '4px', padding: '10px 20px' } 
  },
  { 
    id: '3', 
    position: { x: 200, y: 400 }, 
    data: { label: 'Evidence: Survei Siswa SMA 2023' },
    style: { border: '2px solid #556B2F', background: '#fff', borderRadius: '4px', padding: '10px 20px' } 
  },
  { 
    id: '4', 
    position: { x: 600, y: 250 }, 
    data: { label: 'Research Gap: Kurangnya studi pada SMA swasta' },
    style: { border: '2px dashed #888', background: '#f5f5f5', borderRadius: '4px', padding: '10px 20px' } 
  },
  { 
    id: '5', 
    position: { x: 600, y: 400 }, 
    data: { label: 'Counter Argument: Teknologi tidak selalu berdampak positif' },
    style: { border: '2px solid #D87093', background: '#fff', borderRadius: '4px', padding: '10px 20px' } 
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e1-4', source: '1', target: '4' },
  { id: 'e1-5', source: '1', target: '5' },
];

export default function ArgumentMap() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [detected, setDetected] = useState(false);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const handleDetectContradiction = () => {
    setDetected(true);
    setNodes(nds => nds.map(n => {
      if (n.id === '3' || n.id === '5') {
        return { ...n, style: { ...n.style, border: '2px solid red', background: '#ffebeb' } };
      }
      return n;
    }));
    setEdges(eds => [
      ...eds,
      { id: 'e3-5-contradict', source: '3', target: '5', style: { stroke: 'red', strokeWidth: 2, strokeDasharray: '5,5' }, animated: true, label: 'Contradicts' }
    ]);
  };

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-8rem)]">
      <PageHeader 
        title="Argument Map" 
        description="Visual protocols representing the logical structure and evidence relationships."
      />
      
      {/* Toolbar */}
      <div className="flex gap-4 items-center bg-white border border-editorial-text/10 p-4 shadow-sm shrink-0">
        <button className="px-4 py-2 border border-editorial-text text-[10px] uppercase tracking-widest font-bold hover:bg-neutral-100 transition-colors">
          + Add Premise
        </button>
        <button className="px-4 py-2 border border-editorial-text text-[10px] uppercase tracking-widest font-bold hover:bg-neutral-100 transition-colors">
          + Add Evidence
        </button>
        <div className="w-[1px] h-6 bg-editorial-text/20 mx-2"></div>
        <button 
          onClick={handleDetectContradiction}
          disabled={detected}
          className="px-4 py-2 bg-editorial-text text-white text-[10px] uppercase tracking-widest font-bold hover:bg-neutral-800 transition-colors disabled:opacity-50"
        >
          Detect Contradictions
        </button>
        <div className="ml-auto flex gap-2">
          <button onClick={() => alert('Exporting to PNG (Simulation)')} className="px-3 py-1 text-[10px] uppercase tracking-widest border border-editorial-text/20 hover:border-editorial-text text-editorial-muted hover:text-editorial-text">PNG</button>
          <button onClick={() => alert('Exporting to SVG (Simulation)')} className="px-3 py-1 text-[10px] uppercase tracking-widest border border-editorial-text/20 hover:border-editorial-text text-editorial-muted hover:text-editorial-text">SVG</button>
          <button onClick={() => alert('Exporting to PDF (Simulation)')} className="px-3 py-1 text-[10px] uppercase tracking-widest border border-editorial-text/20 hover:border-editorial-text text-editorial-muted hover:text-editorial-text">PDF</button>
        </div>
      </div>

      <div className="flex-grow border border-editorial-text/10 bg-editorial-bg shadow-sm">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background color="#ccc" gap={20} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
