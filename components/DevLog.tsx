import React from 'react';
import { DEV_LOGS } from '../constants';
import { Terminal, ScrollText } from 'lucide-react';

const DevLog: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-indigo-400" />
          開發日誌 (Dev Logs)
        </h3>
        <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-800/50 px-2 py-1 rounded border border-slate-700/50">
           <ScrollText className="w-3 h-3" />
           <span>Scrollable Area</span>
        </div>
      </div>
      
      {/* Scrollable Container with max-height */}
      <div className="relative overflow-y-auto scrollbar-thin pr-4 max-h-[500px]">
        <div className="border-l border-slate-700 ml-3 space-y-8 pt-1 pb-2">
          {DEV_LOGS.map((log, index) => (
            <div key={index} className="relative pl-8 group">
              {/* Timeline Dot */}
              <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-slate-900 border-2 border-slate-600 group-hover:border-indigo-500 transition-colors"></span>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                <h4 className="text-base font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">{log.title}</h4>
                <span className="text-xs font-mono text-slate-500">{log.date}</span>
              </div>
              
              <p className="text-slate-400 text-sm mb-3 leading-relaxed">
                {log.content}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {log.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700 group-hover:border-slate-600 transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DevLog;