import React, { useState } from 'react';
import { Activity, Database, Shield, LayoutDashboard, Youtube, Code } from 'lucide-react';
import { MACHINES } from './constants';
import ArchitectureCard from './components/ArchitectureCard';
import ServiceStatus from './components/ServiceStatus';
import RamChart from './components/RamChart';
import DevLog from './components/DevLog';
import TodoList from './components/TodoList';
import AiAssistant from './components/AiAssistant';
import MachineDetail from './components/MachineDetail';

type ViewState = 'dashboard' | 'r5' | 'katana17';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 pb-20">
      
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setCurrentView('dashboard')}
          >
            <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-colors">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold tracking-tight">System Architecture <span className="text-slate-500 font-normal">v2.1</span></h1>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
             <button 
                onClick={() => setCurrentView('dashboard')}
                className={`flex items-center gap-2 transition-colors ${currentView === 'dashboard' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
             >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
             </button>
             <button 
                onClick={() => setCurrentView('r5')}
                className={`flex items-center gap-2 transition-colors ${currentView === 'r5' ? 'text-emerald-400' : 'text-slate-400 hover:text-emerald-300'}`}
             >
                <Database className="w-4 h-4" /> R5 Server
             </button>
             <button 
                onClick={() => setCurrentView('katana17')}
                className={`flex items-center gap-2 transition-colors ${currentView === 'katana17' ? 'text-amber-400' : 'text-slate-400 hover:text-amber-300'}`}
             >
                <Shield className="w-4 h-4" /> Katana17
             </button>

             {/* Divider */}
             <div className="h-5 w-px bg-slate-800 mx-2"></div>

             {/* External Links */}
             <a 
               href="https://www.youtube.com/watch?v=iUC7ylzgCZA&list=PLOqSIhFy8lXOY6Ba0d4Hj1wvUy9IOItt8&index=2" 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:border-red-500/50 hover:text-red-400 text-slate-400 transition-all text-xs"
             >
               <Youtube className="w-3.5 h-3.5" /> 實驗室作品集
             </a>

             <a 
               href="https://www.youtube.com/watch?v=UAMKjohruZI&list=PLOqSIhFy8lXNe-xvM3Ch1T7N6dkxHeRN9" 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:border-indigo-500/50 hover:text-indigo-400 text-slate-400 transition-all text-xs"
             >
               <Code className="w-3.5 h-3.5" /> 開發dev
             </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {currentView === 'dashboard' ? (
          <>
            {/* Intro */}
            <section>
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-500">
                  核心架構總結
                </h2>
                <p className="text-slate-400 max-w-3xl leading-relaxed">
                  您的架構採用清晰的職責劃分：<span className="text-emerald-400 font-semibold">R5</span> 專注於後端運算和穩定性，採用資源高效的 Docker 隔離。
                  <span className="text-amber-400 font-semibold ml-1">Katana17</span> 則專注於日常使用與高隔離的安全性需求 (Whonix VM)。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MACHINES.map((machine) => (
                  <div key={machine.name} onClick={() => setCurrentView(machine.id as ViewState)} className="cursor-pointer">
                    <ArchitectureCard machine={machine} />
                  </div>
                ))}
              </div>
            </section>

            {/* Deep Dive Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Main Status Table - Spans 2 cols */}
              <div className="lg:col-span-2">
                <ServiceStatus />
              </div>

              {/* Ram Chart - Spans 1 col */}
              <div className="lg:col-span-1">
                <RamChart />
              </div>

            </section>

            {/* Dev Logs & Todo List */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DevLog />
              <div className="flex flex-col gap-6">
                 <TodoList />
                 <div className="bg-gradient-to-br from-indigo-900/20 to-slate-900 border border-indigo-500/20 rounded-xl p-8 flex flex-col justify-center items-start flex-1">
                    <h3 className="text-2xl font-bold text-white mb-4">隔離與安全性優勢</h3>
                    <ul className="space-y-4 text-slate-300">
                      <li className="flex gap-3">
                        <Shield className="w-6 h-6 text-amber-500 flex-shrink-0" />
                        <div>
                          <strong className="text-slate-100 block mb-1">Whonix 獨立核心</strong>
                          Whonix VM 擁有自己的作業系統核心，與 Host OS 完全隔離。即使 Whonix 內發生核心漏洞，也難以逃逸影響 Host。
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <Database className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                        <div>
                          <strong className="text-slate-100 block mb-1">Docker 資源效率</strong>
                          R5 選擇 Docker 而非 VM，大幅降低了 OS Overhead，讓 16GB RAM 能跑滿 LLM 與 Minecraft 等重度應用。
                        </div>
                      </li>
                    </ul>
                </div>
              </div>
            </section>
          </>
        ) : (
          <MachineDetail 
            machineId={currentView} 
            onBack={() => setCurrentView('dashboard')} 
          />
        )}

      </main>

      <AiAssistant />
    </div>
  );
}

export default App;
