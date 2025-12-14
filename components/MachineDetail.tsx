import React, { useState } from 'react';
import { ArrowLeft, Cpu, Layers, HardDrive, Box, Shield, Server, Network } from 'lucide-react';
import { MACHINES, PROJECTS } from '../constants';
import { ProjectSpec } from '../types';
import ArchitectureCard from './ArchitectureCard';
import ProjectDetailModal from './ProjectDetailModal';

interface Props {
  machineId: string;
  onBack: () => void;
}

const MachineDetail: React.FC<Props> = ({ machineId, onBack }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectSpec | null>(null);

  const machine = MACHINES.find(m => m.id === machineId);
  const projects = PROJECTS.filter(p => {
    if (machineId === 'r5') return p.host === 'R5 Server';
    if (machineId === 'katana17') return p.host === 'Katana17';
    return false;
  }).filter(p => !p.name.includes("Host OS")); // Exclude buffer for project list

  if (!machine) return <div>Machine not found</div>;

  const isR5 = machineId === 'r5';
  const themeColorText = isR5 ? 'text-emerald-400' : 'text-amber-400';
  const themeBg = isR5 ? 'bg-emerald-500' : 'bg-amber-500';
  const themeBorder = isR5 ? 'border-emerald-500/30' : 'border-amber-500/30';

  const getStatusDotColor = (status: string) => {
    switch (status) {
        case 'Running': return 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]';
        case 'Idle': return 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]';
        case 'Maintenance': return 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]';
        case 'Stopped': return 'bg-red-500';
        default: return 'bg-slate-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Navigation */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
             {machine.name} 
             <span className={`text-xs px-2 py-0.5 rounded border ${themeBorder} ${themeColorText} bg-slate-900`}>
                {machine.role}
             </span>
          </h1>
          <p className="text-slate-400 text-sm">System Framework & Resource Allocation Details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Hardware Spec Card (Reused) */}
        <div className="lg:col-span-1 h-fit">
           <ArchitectureCard machine={machine} />
           
           {/* Port Details Box */}
           <div className="mt-4 bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Network className="w-4 h-4" /> Physical I/O & Ports
              </h3>
              <ul className="space-y-2">
                {machine.ports?.map((port, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-slate-400">
                    <span className={`w-1.5 h-1.5 rounded-full ${themeBg}`}></span>
                    {port}
                  </li>
                ))}
              </ul>
           </div>
        </div>

        {/* Right Column: Software Framework Stack */}
        <div className="lg:col-span-2 space-y-6">
           
           {/* Visual Stack Diagram */}
           <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-1 h-full ${themeBg} opacity-50`}></div>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Layers className={`w-6 h-6 ${themeColorText}`} />
                Software Stack Framework
              </h2>

              <div className="space-y-4 relative">
                 {/* Layer 1: OS */}
                 <div className="flex items-center gap-4 p-4 bg-slate-950 border border-slate-800 rounded-lg z-10 relative">
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                       <Cpu className="w-6 h-6 text-slate-400" />
                    </div>
                    <div className="flex-1">
                       <span className="text-xs font-bold text-slate-500 uppercase">Layer 1: Host Operating System</span>
                       <p className="text-slate-200 font-medium">{machine.os}</p>
                    </div>
                 </div>

                 {/* Connecting Line */}
                 <div className="absolute left-9 top-14 w-0.5 h-8 bg-slate-800 -z-0"></div>

                 {/* Layer 2: Isolation Tech */}
                 <div className="flex items-center gap-4 p-4 bg-slate-950 border border-slate-800 rounded-lg z-10 relative mt-4">
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                       {isR5 ? <Box className="w-6 h-6 text-blue-400" /> : <Shield className="w-6 h-6 text-amber-400" />}
                    </div>
                    <div className="flex-1">
                       <span className="text-xs font-bold text-slate-500 uppercase">Layer 2: Isolation Technology</span>
                       <p className="text-slate-200 font-medium">{machine.isolationTech}</p>
                       <p className="text-xs text-slate-500 mt-1">{machine.resourceLimit}</p>
                    </div>
                 </div>

                  {/* Connecting Line */}
                 <div className="absolute left-9 top-[8.5rem] w-0.5 h-8 bg-slate-800 -z-0"></div>

                 {/* Layer 3: Application Layer (Grid) */}
                 <div className="pt-4">
                    <span className="text-xs font-bold text-slate-500 uppercase mb-3 block pl-16">Layer 3: Active Projects / Services (Click for Details)</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-12">
                       {projects.map(project => (
                         <div 
                           key={project.name} 
                           onClick={() => setSelectedProject(project)}
                           className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4 hover:border-slate-500 hover:bg-slate-800/60 transition-all cursor-pointer group shadow-lg"
                         >
                            <div className="flex justify-between items-start mb-2">
                               <h4 className="font-bold text-slate-200 group-hover:text-white transition-colors" style={{ color: project.color }}>{project.name}</h4>
                               <span className={`text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-700`}>
                                  RAM: {project.ramAllocated}
                               </span>
                            </div>
                            <p className="text-xs text-slate-400 mb-3 min-h-[2.5em]">{project.description}</p>
                            
                            {/* Tech Stack Tags */}
                            <div className="flex flex-wrap gap-1.5 mb-3">
                               {project.techStack?.map(tech => (
                                  <span key={tech} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900/80 text-slate-300">
                                     {tech}
                                  </span>
                               ))}
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-slate-700/50 mt-auto">
                               <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${getStatusDotColor(project.status)}`}></div>
                                  <span className="text-xs text-slate-400 font-mono">
                                     {project.port && project.port !== 'N/A (Isolated)' ? `Port: ${project.port}` : project.status}
                                  </span>
                               </div>
                               <span className="text-[10px] text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity font-medium">View Arch &rarr;</span>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

              </div>
           </div>

        </div>
      </div>

      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
};

export default MachineDetail;