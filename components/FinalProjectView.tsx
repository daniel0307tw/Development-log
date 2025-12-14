import React, { useState } from 'react';
import { ArrowLeft, Cpu, Radio, Zap, Activity, Settings2, ShieldCheck, X, ArrowRight, ArrowDown } from 'lucide-react';
import { FINAL_PROJECT_LOGS, FINAL_PROJECT_TODOS, CHAOS_NODES } from '../constants';
import { ComponentNode } from '../types';
import DevLog from './DevLog';
import TodoList from './TodoList';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  onBack: () => void;
}

const FinalProjectView: React.FC<Props> = ({ onBack }) => {
  const [selectedNode, setSelectedNode] = useState<ComponentNode | null>(null);

  const handleNodeClick = (id: string) => {
    const node = CHAOS_NODES[id];
    if (node) setSelectedNode(node);
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
             CHAOS CAN
             <span className="text-xs px-2 py-0.5 rounded border border-fuchsia-500/30 text-fuchsia-400 bg-slate-900">
                System Architecture
             </span>
          </h1>
          <p className="text-slate-400 text-sm">Interactive Analog Fuzz & Light Theremin System</p>
        </div>
      </div>

      {/* Main Architecture Diagram Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 p-4 opacity-20">
            <Activity className="w-32 h-32 text-fuchsia-500" />
        </div>

        <div className="relative z-10 space-y-12">
            
            {/* 1. Signal Path System (Pink) */}
            <div className="relative">
                <h3 className="text-sm font-bold text-fuchsia-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Radio className="w-4 h-4" /> 訊號路徑系統 (Signal Path)
                </h3>
                <div className="bg-slate-950/50 border border-fuchsia-900/30 rounded-xl p-6 flex flex-wrap items-center justify-between gap-4 relative">
                    <NodeButton id="input-jack" onClick={handleNodeClick} icon="Input" />
                    <Arrow />
                    <NodeButton id="cin" onClick={handleNodeClick} label="Cin" small />
                    <Arrow />
                    <div className="relative p-4 border-2 border-dashed border-fuchsia-500/50 rounded-xl bg-fuchsia-950/20">
                        <span className="absolute -top-3 left-4 bg-slate-900 px-2 text-[10px] text-fuchsia-400 font-bold">CORE</span>
                        <NodeButton id="bjt-fuzz" onClick={handleNodeClick} highlight />
                    </div>
                    <Arrow />
                    <NodeButton id="volume" onClick={handleNodeClick} label="Vol" small />
                    <Arrow />
                    <NodeButton id="3pdt" onClick={handleNodeClick} shape="diamond" />
                    <Arrow />
                    <NodeButton id="output-jack" onClick={handleNodeClick} icon="Output" />
                </div>
                {/* Bypass Path Visual */}
                <div className="absolute top-[60%] left-[10%] w-[80%] h-24 border-b-2 border-dotted border-slate-700 rounded-b-3xl -z-10 pointer-events-none flex justify-center items-end pb-2 text-xs text-slate-600">
                    True Bypass Path
                </div>
            </div>

            {/* 2. UI & Control Interface (Yellow) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 relative">
                    <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Settings2 className="w-4 h-4" /> 參數控制與人機介面 (HMI)
                    </h3>
                    <div className="bg-slate-950/50 border border-yellow-900/30 rounded-xl p-6 flex items-center justify-around gap-8">
                        <div className="flex flex-col items-center gap-2">
                            <NodeButton id="ldr" onClick={handleNodeClick} shape="hex" color="yellow" />
                            <ArrowDown className="w-4 h-4 text-yellow-500/50" />
                            <NodeButton id="vr-bias" onClick={handleNodeClick} shape="circle" color="yellow" />
                        </div>
                        
                        <div className="flex flex-col items-center gap-2 mt-[-2rem]">
                             <div className="h-8 border-l-2 border-dotted border-slate-600"></div>
                             <NodeButton id="vr-gain" onClick={handleNodeClick} shape="circle" color="yellow" />
                             <ArrowDown className="w-4 h-4 text-fuchsia-500/50" />
                             <span className="text-[10px] text-slate-500">To BJT Core</span>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <NodeButton id="led" onClick={handleNodeClick} shape="circle" color="yellow" />
                            <ArrowDown className="w-4 h-4 text-yellow-500/50" />
                            <span className="text-[10px] text-slate-500">To 3PDT</span>
                        </div>
                    </div>
                </div>

                {/* 3. Power & EMC (Green) */}
                <div>
                    <h3 className="text-sm font-bold text-green-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Zap className="w-4 h-4" /> 電力與穩定性
                    </h3>
                    <div className="bg-slate-950/50 border border-green-900/30 rounded-xl p-6 flex flex-col gap-6 items-center">
                        <div className="flex items-center gap-4">
                            <NodeButton id="9v-dc" onClick={handleNodeClick} color="green" />
                            <ArrowRight className="w-4 h-4 text-green-500" />
                            <NodeButton id="rc-filter" onClick={handleNodeClick} label="RC Filter" small color="green" />
                        </div>
                        
                        <div className="w-full h-px bg-green-900/50"></div>
                        
                        <div className="flex items-center gap-2 w-full justify-center">
                             <NodeButton id="grounding" onClick={handleNodeClick} color="green" label="EMC / Ground" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <DevLog logs={FINAL_PROJECT_LOGS} title="CHAOS CAN 開發日誌" />
         <TodoList todos={FINAL_PROJECT_TODOS} title="專案待辦清單" />
      </div>

      {/* Component Detail Modal */}
      <AnimatePresence>
        {selectedNode && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedNode(null)}
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={`h-2 w-full ${selectedNode.type === 'signal' ? 'bg-fuchsia-500' : selectedNode.type === 'ui' ? 'bg-yellow-400' : 'bg-green-500'}`}></div>
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-2xl font-bold text-white">{selectedNode.label}</h2>
                            <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
                                <p className="text-slate-300 leading-relaxed">{selectedNode.description}</p>
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Cpu className="w-4 h-4" /> 電路細節 / 規格
                                </h4>
                                <div className="bg-slate-800/50 rounded-lg p-4 font-mono text-sm text-indigo-300 border border-slate-700/50">
                                    {selectedNode.circuitDetails || "No specific circuit details available."}
                                </div>
                            </div>
                            
                            {/* Placeholder for actual image */}
                            <div className="h-32 bg-slate-950 rounded-lg border border-dashed border-slate-800 flex items-center justify-center text-slate-600 text-xs">
                                [ Circuit Diagram / Photo Placeholder ]
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

// Helper Components

const Arrow = () => <ArrowRight className="w-5 h-5 text-slate-600 flex-shrink-0" />;

interface NodeBtnProps {
    id: string;
    onClick: (id: string) => void;
    label?: string;
    icon?: string;
    small?: boolean;
    highlight?: boolean;
    shape?: 'rect' | 'circle' | 'diamond' | 'hex';
    color?: 'pink' | 'yellow' | 'green';
}

const NodeButton: React.FC<NodeBtnProps> = ({ id, onClick, label, icon, small, highlight, shape = 'rect', color = 'pink' }) => {
    const node = CHAOS_NODES[id];
    const displayText = label || node?.label || id;
    
    // Color Styles
    const colorStyles = {
        pink:  highlight ? "bg-fuchsia-600 border-fuchsia-400 text-white shadow-[0_0_15px_rgba(192,38,211,0.5)]" : "bg-slate-800 border-fuchsia-900/50 text-fuchsia-200 hover:border-fuchsia-500",
        yellow: "bg-slate-800 border-yellow-900/50 text-yellow-200 hover:border-yellow-500",
        green: "bg-slate-800 border-green-900/50 text-green-200 hover:border-green-500",
    };

    // Shape Styles
    let shapeClass = "rounded-lg";
    if (shape === 'circle') shapeClass = "rounded-full w-20 h-20 flex items-center justify-center text-center";
    if (shape === 'diamond') shapeClass = "rotate-45 w-16 h-16 flex items-center justify-center";
    if (shape === 'hex') shapeClass = "rounded-xl border-2"; // Hex approximation

    return (
        <button 
            onClick={() => onClick(id)}
            className={`
                ${shapeClass}
                ${small ? 'px-3 py-1.5 text-xs' : 'px-4 py-3 text-sm'}
                border-2 transition-all duration-300 active:scale-95 font-bold shadow-lg
                ${colorStyles[color]}
                ${shape === 'diamond' ? 'overflow-hidden' : ''}
            `}
        >
            <span className={shape === 'diamond' ? '-rotate-45 block' : ''}>
                {icon ? icon : displayText}
            </span>
        </button>
    );
}

export default FinalProjectView;