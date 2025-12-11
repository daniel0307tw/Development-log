import React from 'react';
import { MachineSpec } from '../types';
import { Server, Monitor, Shield, Box, Cpu, Zap, HardDrive, Terminal, Cable } from 'lucide-react';

interface Props {
  machine: MachineSpec;
}

const ArchitectureCard: React.FC<Props> = ({ machine }) => {
  const isR5 = machine.name.includes('R5');

  return (
    <div className={`relative overflow-hidden rounded-xl border p-6 shadow-xl transition-all duration-300 hover:shadow-2xl group flex flex-col h-full ${isR5 ? 'bg-slate-900/80 border-slate-700' : 'bg-slate-900/80 border-slate-700'}`}>
      
      {/* Background Accent */}
      <div className={`absolute top-0 left-0 w-full h-1 ${isR5 ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'}`}></div>

      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
            {isR5 ? <Server className="w-6 h-6 text-emerald-400" /> : <Monitor className="w-6 h-6 text-amber-400" />}
            {machine.name}
          </h2>
          <p className="text-slate-400 text-sm font-medium">{machine.role}</p>
        </div>
      </div>

      <div className="space-y-4 flex-grow">
        <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800">
          <p className="text-slate-300 text-sm leading-relaxed">{machine.description}</p>
        </div>

        {/* Hardware Specs Grid */}
        <div className="grid grid-cols-1 gap-2">
          
          <div className="flex items-center gap-3 p-2 rounded bg-slate-800/40 border border-slate-700/50">
            <div className={`p-1.5 rounded ${isR5 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-500 font-bold block">CPU</span>
              <span className="text-xs text-slate-200">{machine.cpu}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded bg-slate-800/40 border border-slate-700/50">
             <div className={`p-1.5 rounded ${isR5 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-500 font-bold block">GPU</span>
              <span className="text-xs text-slate-200">{machine.gpu}</span>
            </div>
          </div>

           <div className="flex items-center gap-3 p-2 rounded bg-slate-800/40 border border-slate-700/50">
             <div className={`p-1.5 rounded ${isR5 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-500 font-bold block">OS / RAM</span>
              <span className="text-xs text-slate-200">{machine.os} <span className="text-slate-500">|</span> {machine.ram}</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2 rounded bg-slate-800/40 border border-slate-700/50">
             <div className={`p-1.5 rounded ${isR5 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
              <HardDrive className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <span className="text-[10px] uppercase text-slate-500 font-bold block">Storage</span>
              <div className="flex flex-col gap-1 mt-1">
                {machine.storage.map((drive, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                     <div className="w-1 h-1 rounded-full bg-slate-500"></div>
                     <span className="text-xs text-slate-200 block truncate" title={drive}>{drive}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-950/50 rounded-lg p-2 border border-slate-800">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1">隔離技術</span>
            <div className="flex items-center gap-2">
              {isR5 ? <Box className="w-3 h-3 text-emerald-500" /> : <Shield className="w-3 h-3 text-amber-500" />}
              <p className="text-slate-200 text-xs font-medium">{machine.isolationTech}</p>
            </div>
          </div>
          <div className="bg-slate-950/50 rounded-lg p-2 border border-slate-800">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Ports / I/O</span>
            {machine.ports?.slice(0, 1).map((p, i) => (
               <p key={i} className="text-slate-200 text-xs font-medium truncate" title={p}>{p}</p>
            ))}
            {machine.ports && machine.ports.length > 1 && (
               <p className="text-slate-500 text-[10px]">+ {machine.ports.length - 1} more</p>
            )}
          </div>
        </div>

        <div className="mt-auto pt-2">
          <div className="flex flex-wrap gap-2">
            {machine.keyProjects.map((kp) => (
              <span key={kp} className={`px-2 py-1 rounded text-[10px] font-bold border uppercase tracking-wide ${isR5 ? 'bg-emerald-950/30 text-emerald-400 border-emerald-900/50' : 'bg-amber-950/30 text-amber-400 border-amber-900/50'}`}>
                {kp}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureCard;