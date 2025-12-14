import React from 'react';
import { X, Server, Box, Globe, Cpu, HardDrive, ArrowRight, Shield, Terminal, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { ProjectSpec, LogEntry, TodoItem } from '../types';
import { DEV_LOGS, TODO_ITEMS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  project: ProjectSpec;
  onClose: () => void;
}

const ProjectDetailModal: React.FC<Props> = ({ project, onClose }) => {
  // Helper to filter logs based on project keywords
  const relevantLogs = DEV_LOGS.filter(log => {
    const keywords = [project.name, ...project.techStack || []].map(k => k.toLowerCase());
    // Special mapping for common terms
    if (project.name.includes("Minecraft")) keywords.push("minecraft");
    if (project.name.includes("Auto-Sub")) keywords.push("whisper", "auto-sub");
    if (project.name.includes("Jellyfin")) keywords.push("jellyfin", "streaming", "casaos");
    if (project.name.includes("LLM")) keywords.push("ai", "llm");
    
    return log.tags.some(tag => keywords.some(k => tag.toLowerCase().includes(k))) ||
           keywords.some(k => log.title.toLowerCase().includes(k));
  });

  const relevantTodos = TODO_ITEMS.filter(item => {
     const keywords = [project.name, ...project.techStack || []].map(k => k.toLowerCase());
     if (project.name.includes("Minecraft")) keywords.push("minecraft");
     if (project.name.includes("Auto-Sub")) keywords.push("whisper");
     if (project.name.includes("Jellyfin")) keywords.push("jellyfin");
     return keywords.some(k => item.category.toLowerCase().includes(k) || item.task.toLowerCase().includes(k));
  });

  const isDocker = project.isolation === 'Docker';
  const isVM = project.isolation.includes('VM');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-start justify-between bg-slate-950">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-white" style={{ color: project.color }}>{project.name}</h2>
                <span className={`px-2 py-0.5 text-xs rounded border border-slate-700 bg-slate-900 text-slate-400`}>
                  {project.host}
                </span>
                <span className={`px-2 py-0.5 text-xs rounded ${
                  project.status === 'Running' ? 'bg-green-900/30 text-green-400 border-green-900' :
                  project.status === 'Stopped' ? 'bg-red-900/30 text-red-400 border-red-900' :
                  'bg-amber-900/30 text-amber-400 border-amber-900'
                } border`}>
                  {project.status}
                </span>
              </div>
              <p className="text-slate-400 text-sm">{project.description}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="overflow-y-auto p-6 space-y-8 scrollbar-thin">
            
            {/* Architecture Diagram Section */}
            <section>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Box className="w-5 h-5 text-indigo-400" />
                系統架構圖 (System Architecture)
              </h3>
              
              <div className="bg-slate-950/50 rounded-xl p-8 border border-slate-800 overflow-x-auto">
                <div className="flex items-center justify-between min-w-[600px] gap-4">
                  
                  {/* Node 1: User/Network */}
                  <div className="flex flex-col items-center gap-3 relative group">
                    <div className="w-16 h-16 rounded-xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center group-hover:border-indigo-500 transition-colors shadow-lg">
                      <Globe className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="text-center">
                      <span className="text-xs font-bold text-slate-300 block">External / LAN</span>
                      <span className="text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 mt-1 block">
                         {project.port?.includes('N/A') ? 'No Access' : project.port}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex-1 h-0.5 bg-slate-700 relative">
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 px-2 text-[10px] text-slate-500">
                        {project.port?.split(' ')[0] || 'Internal'}
                     </div>
                     <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700" />
                  </div>

                  {/* Node 2: Host */}
                  <div className="flex flex-col items-center gap-3 relative group">
                    <div className="w-16 h-16 rounded-xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center group-hover:border-emerald-500 transition-colors shadow-lg">
                      <Server className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div className="text-center">
                      <span className="text-xs font-bold text-slate-300 block">Host: {project.host.split(' ')[0]}</span>
                      <span className="text-[10px] text-slate-500 block">OS Layer</span>
                    </div>
                  </div>

                   {/* Arrow */}
                   <div className="flex-1 h-0.5 bg-slate-700 relative">
                     <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700" />
                  </div>

                  {/* Node 3: Isolation */}
                  <div className="flex flex-col items-center gap-3 relative group">
                    <div className={`w-16 h-16 rounded-xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center ${isDocker ? 'group-hover:border-blue-500' : 'group-hover:border-amber-500'} transition-colors shadow-lg`}>
                      {isDocker ? <Box className="w-8 h-8 text-blue-400" /> : <Shield className="w-8 h-8 text-amber-400" />}
                    </div>
                    <div className="text-center">
                      <span className="text-xs font-bold text-slate-300 block">{project.isolation}</span>
                      <span className="text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 mt-1 block">
                        Limit: {project.ramAllocated}
                      </span>
                    </div>
                  </div>

                   {/* Arrow */}
                   <div className="flex-1 h-0.5 bg-slate-700 relative">
                     <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700" />
                  </div>

                  {/* Node 4: Application Code */}
                  <div className="flex flex-col items-center gap-3 relative group">
                    <div className="w-16 h-16 rounded-xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center group-hover:border-pink-500 transition-colors shadow-lg" style={{ borderColor: project.color }}>
                      <Terminal className="w-8 h-8" style={{ color: project.color }} />
                    </div>
                    <div className="text-center">
                      <span className="text-xs font-bold text-slate-300 block">App Runtime</span>
                      <div className="flex flex-wrap justify-center gap-1 mt-1 max-w-[100px]">
                         {project.techStack?.slice(0,2).map(t => (
                            <span key={t} className="text-[9px] text-slate-400 bg-slate-900 px-1 rounded">{t}</span>
                         ))}
                      </div>
                    </div>
                  </div>

                   {/* Arrow */}
                   <div className="flex-1 h-0.5 bg-slate-700 relative">
                     <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700" />
                  </div>

                   {/* Node 5: Hardware */}
                   <div className="flex flex-col items-center gap-3 relative group">
                    <div className="w-16 h-16 rounded-xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center group-hover:border-indigo-500 transition-colors shadow-lg">
                       {project.techStack?.some(t => t.includes('CUDA') || t.includes('NVENC')) ? (
                           <Cpu className="w-8 h-8 text-indigo-400" />
                       ) : (
                           <HardDrive className="w-8 h-8 text-slate-400" />
                       )}
                    </div>
                    <div className="text-center">
                      <span className="text-xs font-bold text-slate-300 block">Resources</span>
                      <span className="text-[10px] text-slate-500 block">
                          {project.techStack?.some(t => t.includes('CUDA') || t.includes('NVENC')) ? 'GPU Accel' : 'CPU/Disk'}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Development Logs */}
              <section>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                   <Clock className="w-5 h-5 text-indigo-400" />
                   專案日誌 (Recent Updates)
                </h3>
                {relevantLogs.length > 0 ? (
                  <div className="space-y-4">
                    {relevantLogs.slice(0, 5).map((log, idx) => (
                      <div key={idx} className="relative pl-4 border-l-2 border-slate-700 hover:border-indigo-500 transition-colors pb-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-sm font-semibold text-slate-200">{log.title}</h4>
                          <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap ml-2">{log.date}</span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2 hover:line-clamp-none transition-all cursor-default">
                          {log.content}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-slate-500 italic p-4 bg-slate-950/50 rounded border border-slate-800">
                    No specific logs found for this project.
                  </div>
                )}
              </section>

              {/* Todo Items */}
              <section>
                 <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                   <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                   待辦事項 (Tasks)
                </h3>
                {relevantTodos.length > 0 ? (
                   <div className="space-y-3">
                      {relevantTodos.map(todo => (
                        <div key={todo.id} className="bg-slate-950/50 border border-slate-800 p-3 rounded-lg flex items-start gap-3">
                           {todo.status === 'Done' ? (
                             <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                           ) : todo.status === 'In Progress' ? (
                             <Clock className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                           ) : (
                             <AlertCircle className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                           )}
                           <div>
                              <p className={`text-sm ${todo.status === 'Done' ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                                {todo.task}
                              </p>
                              <div className="flex gap-2 mt-1">
                                <span className={`text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 ${
                                  todo.priority === 'High' ? 'text-red-400 border-red-900/30' : 
                                  todo.priority === 'Medium' ? 'text-amber-400 border-amber-900/30' : 
                                  'text-blue-400 border-blue-900/30'
                                }`}>
                                  {todo.priority}
                                </span>
                                <span className="text-[10px] text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                                  {todo.status}
                                </span>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                ) : (
                   <div className="text-sm text-slate-500 italic p-4 bg-slate-950/50 rounded border border-slate-800">
                    All clear! No active tasks for this project.
                  </div>
                )}
              </section>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetailModal;