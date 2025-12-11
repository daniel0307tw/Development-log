
import React from 'react';
import { PROJECTS } from '../constants';

const ServiceStatus: React.FC = () => {
  const getStatusColors = (status: string) => {
    switch (status) {
      case 'Running':
        return { ping: 'bg-green-400', dot: 'bg-green-500', text: 'text-green-400', label: '運行中' };
      case 'Idle':
        return { ping: 'bg-yellow-400', dot: 'bg-yellow-500', text: 'text-yellow-400', label: '待機 (Idle)' };
      case 'Maintenance':
        return { ping: 'bg-orange-400', dot: 'bg-orange-500', text: 'text-orange-400', label: '維護中 (調整)' };
      case 'Stopped':
        return { ping: 'hidden', dot: 'bg-red-500', text: 'text-red-400', label: '已停止' };
      default:
        return { ping: 'hidden', dot: 'bg-slate-500', text: 'text-slate-400', label: status };
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h3 className="text-xl font-bold text-white">核心服務與狀態</h3>
        <p className="text-slate-400 text-sm mt-1">模擬核心服務的即時狀態與資源隔離關係</p>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/50 text-slate-400 text-sm uppercase tracking-wider border-b border-slate-800">
              <th className="p-4 font-semibold">服務名稱</th>
              <th className="p-4 font-semibold">所在主機</th>
              <th className="p-4 font-semibold">隔離技術</th>
              <th className="p-4 font-semibold">狀態</th>
              <th className="p-4 font-semibold text-right">記憶體 (分配)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {PROJECTS.filter(p => !p.name.includes("Host OS")).map((project) => {
              const statusColors = getStatusColors(project.status);
              return (
                <tr key={project.name} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4">
                    <span className="text-slate-200 font-medium block">{project.name}</span>
                  </td>
                  <td className="p-4 text-slate-400">{project.host}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium border ${project.isolation === 'Docker' ? 'bg-blue-950/30 border-blue-900 text-blue-400' : project.isolation === 'Native (uv)' ? 'bg-pink-950/30 border-pink-900 text-pink-400' : 'bg-purple-950/30 border-purple-900 text-purple-400'}`}>
                      {project.isolation}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`relative flex h-2.5 w-2.5`}>
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusColors.ping}`}></span>
                        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${statusColors.dot}`}></span>
                      </span>
                      <span className={`text-sm ${statusColors.text}`}>
                        {statusColors.label}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-right font-mono text-slate-300">
                    {project.ramAllocated}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceStatus;