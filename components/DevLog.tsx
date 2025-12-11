import React from 'react';
import { DEV_LOGS } from '../constants';
import { Terminal } from 'lucide-react';

const DevLog: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg h-full">
      <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
        <Terminal className="w-5 h-5 text-indigo-400" />
        開發日誌 (Dev Logs)
      </h3>
      <div className="relative border-l border-slate-700 ml-3 space-y-8">
        {DEV_LOGS.map((log, index) => (
          <div key={index} className="relative pl-8">
            <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-slate-900 border-2 border-indigo-500"></span>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
              <h4 className="text-base font-semibold text-slate-200">{log.title}</h4>
              <span className="text-xs font-mono text-slate-500">{log.date}</span>
            </div>
            <p className="text-slate-400 text-sm mb-3 leading-relaxed">
              {log.content}
            </p>
            <div className="flex flex-wrap gap-2">
              {log.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevLog;