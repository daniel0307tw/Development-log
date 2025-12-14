

export interface ProjectSpec {
  name: string;
  host: 'R5 Server' | 'Katana17';
  isolation: 'Docker' | 'KVM/VM' | 'Native (uv)'; // Added Native (uv)
  ramAllocated: string;
  ramPercentage: number;
  status: 'Running' | 'Idle' | 'Stopped' | 'Maintenance';
  description: string;
  color: string;
  techStack?: string[];
  port?: string;
}

export interface MachineSpec {
  id: string;
  name: string;
  role: string;
  cpu: string;
  gpu: string;
  ram: string;
  storage: string[];
  os: string;
  isolationTech: string;
  resourceLimit: string;
  keyProjects: string[];
  description: string;
  ports?: string[]; 
}

export interface LogEntry {
  date: string;
  title: string;
  content: string;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface TodoItem {
  id: string;
  task: string;
  category: 'System' | 'Minecraft' | 'Jellyfin' | 'Network' | 'Frontend' | 'Backend' | 'AI Model';
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Done';
}

export interface ComponentNode {
  id: string;
  label: string;
  type: 'signal' | 'ui' | 'power';
  description: string;
  circuitDetails?: string; // Placeholder for future image/diagram URL
}