import React from 'react';
import { TODO_ITEMS } from '../constants';
import { TodoItem } from '../types';
import { CheckSquare, ArrowUpCircle, MinusCircle, ArrowDownCircle } from 'lucide-react';

interface Props {
  todos?: TodoItem[];
  title?: string;
}

const TodoList: React.FC<Props> = ({ todos = TODO_ITEMS, title = "待辦事項 (Todo List)" }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-400 bg-red-950/30 border-red-900/50';
      case 'Medium': return 'text-amber-400 bg-amber-950/30 border-amber-900/50';
      case 'Low': return 'text-blue-400 bg-blue-950/30 border-blue-900/50';
      default: return 'text-slate-400';
    }
  };

  const getCategoryColor = (category: string) => {
     switch (category) {
       case 'Minecraft': return 'text-emerald-400';
       case 'Jellyfin': return 'text-purple-400';
       case 'System': return 'text-slate-400';
       case 'Frontend': return 'text-cyan-400';
       case 'Backend': return 'text-green-400';
       case 'AI Model': return 'text-pink-400';
       default: return 'text-indigo-400';
     }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg h-full flex flex-col">
       <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-indigo-400" />
          {title}
        </h3>
        <span className="text-xs font-mono text-slate-500 bg-slate-800/50 px-2 py-1 rounded">
          {todos.length} Tasks
        </span>
      </div>

      <div className="space-y-3 overflow-y-auto scrollbar-thin pr-2 max-h-[400px]">
        {todos.map((item) => (
          <div key={item.id} className="p-3 rounded-lg bg-slate-950/50 border border-slate-800 hover:border-slate-700 transition-colors group">
             <div className="flex items-start gap-3">
                <div className="mt-1 flex-shrink-0">
                   {item.priority === 'High' && <ArrowUpCircle className="w-4 h-4 text-red-500" />}
                   {item.priority === 'Medium' && <MinusCircle className="w-4 h-4 text-amber-500" />}
                   {item.priority === 'Low' && <ArrowDownCircle className="w-4 h-4 text-blue-500" />}
                </div>
                <div className="flex-1">
                   <p className="text-slate-200 text-sm font-medium leading-relaxed group-hover:text-white transition-colors">
                     {item.task}
                   </p>
                   <div className="flex items-center gap-2 mt-2">
                     <span className={`text-[10px] uppercase font-bold tracking-wider ${getCategoryColor(item.category)}`}>
                        {item.category}
                     </span>
                     <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                     </span>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;