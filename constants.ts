
import { ProjectSpec, MachineSpec, LogEntry } from './types';

export const MACHINES: MachineSpec[] = [
  {
    id: "r5",
    name: "R5 3600 Server",
    role: "遠端運算 / CasaOS 家庭雲",
    cpu: "AMD Ryzen 5 3600 (6C/12T)",
    gpu: "ZOTAC GTX 1060 6GB",
    ram: "16GB DDR4 (硬性限制)",
    storage: [
      "512GB M.2 (System/Ubuntu)",
      "1TB MX200 SSD (Data)",
      "4TB IronWolf NAS HDD"
    ],
    os: "Ubuntu Server + CasaOS",
    isolationTech: "Docker 容器 (高密度)",
    resourceLimit: "16GB RAM Max",
    keyProjects: ["LLM", "Minecraft", "CasaOS", "Streaming"],
    description: "專注於後端運算與 Docker 服務，透過 CasaOS 進行簡易管理。硬體更新為 Ryzen 3600 搭配 1060 6GB 顯卡。",
    ports: ["RJ45 1Gbps"]
  },
  {
    id: "katana17",
    name: "MSI Katana 17 B13VGK",
    role: "主力工作站 / 安全滲透 / 開發",
    cpu: "Intel Core i7-13620H (10C/16T)",
    gpu: "NVIDIA RTX 4070 Laptop (8GB)",
    ram: "16GB DDR5-5200 (Max 64GB)",
    storage: ["1TB NVMe PCIe Gen4"],
    os: "Windows 11 (uv Environment)",
    isolationTech: "KVM/VM + Native uv",
    resourceLimit: "105W TGP / MUX Switch",
    keyProjects: ["Whonix", "Kali Linux", "Python (uv)"],
    description: "日常操作、開發與資安任務的主力終端。Python 環境採用 uv 管理 (無須 Docker)，並運行高隔離 VM。",
    ports: ["1x USB-C (DP)", "1x HDMI 2.1 (8K)", "1x RJ45"]
  }
];

export const PROJECTS: ProjectSpec[] = [
  {
    name: "LLM 語言模型",
    host: "R5 Server",
    isolation: "Docker",
    ramAllocated: "8GB",
    ramPercentage: 50,
    status: "Maintenance",
    description: "核心資源重新規劃中，暫停運行以進行部屬調整。",
    color: "#10b981", // emerald-500
    techStack: ["Ollama", "Llama 3 8B", "NVIDIA CUDA"],
    port: "11434"
  },
  {
    name: "Minecraft 伺服器",
    host: "R5 Server",
    isolation: "Docker",
    ramAllocated: "4GB",
    ramPercentage: 25,
    status: "Running",
    description: "已開服可遊玩。待解決：插件權限配置(TPA/領地) 與 雙重 NAT 外網連線問題。",
    color: "#3b82f6", // blue-500
    techStack: ["Java 17", "PaperMC", "Docker Compose"],
    port: "25565"
  },
  {
    name: "串流/CasaOS",
    host: "R5 Server",
    isolation: "Docker",
    ramAllocated: "1GB",
    ramPercentage: 6.25,
    status: "Running",
    description: "串流服務與 CasaOS 界面，輕量化部署。",
    color: "#8b5cf6", // violet-500
    techStack: ["CasaOS UI", "Nginx", "FFmpeg"],
    port: "80 / 443"
  },
  {
    name: "Host OS/Buffer",
    host: "R5 Server",
    isolation: "Docker",
    ramAllocated: "3GB",
    ramPercentage: 18.75,
    status: "Running",
    description: "Ubuntu 系統核心與 I/O Buffer 預留。",
    color: "#64748b", // slate-500
    techStack: ["Ubuntu 22.04 LTS", "Kernel 5.15"]
  },
  {
    name: "Whonix 系統",
    host: "Katana17",
    isolation: "KVM/VM",
    ramAllocated: "4GB", 
    ramPercentage: 0, 
    status: "Idle",
    description: "網路與系統的最高等級隔離，強制通過 Tor。",
    color: "#f59e0b", // amber-500
    techStack: ["Whonix Gateway", "Whonix Workstation", "Tor", "VirtualBox"],
    port: "N/A (Isolated)"
  },
  {
    name: "Kali Linux",
    host: "Katana17",
    isolation: "KVM/VM",
    ramAllocated: "4GB",
    ramPercentage: 0,
    status: "Stopped",
    description: "滲透測試與資安工具專用環境。",
    color: "#06b6d4", // cyan-500
    techStack: ["Kali Rolling", "Metasploit", "Burp Suite", "VirtualBox"],
    port: "N/A (Isolated)"
  },
  {
    name: "Python 開發 (uv)",
    host: "Katana17",
    isolation: "Native (uv)",
    ramAllocated: "Dynamic",
    ramPercentage: 0,
    status: "Running",
    description: "Windows 本機開發環境，使用 uv 進行極速套件管理。",
    color: "#ec4899", // pink-500
    techStack: ["uv", "Python 3.12", "FastAPI", "Windows 11"],
    port: "8000 (Dev)"
  }
];

export const DEV_LOGS: LogEntry[] = [
  {
    date: "2024-05-30",
    title: "Vercel 建置與黑屏終極修復",
    content: "強制修正 npm ETARGET 錯誤，將 @google/genai 版本設為 * 以重置鎖定檔。再次確認並移除了 index.html 中導致黑屏的 importmap 區塊。新增 .npmrc 以解決依賴衝突。",
    tags: ["Bugfix", "Vercel", "Critical"]
  },
  {
    date: "2024-05-30",
    title: "Vercel 建置修復 (npm ETARGET)",
    content: "修正 @google/genai 版本錯誤 (No matching version)。原因：指定的版本不存在於 npm。解決方案：將版本設為 'latest' 以自動獲取最新 SDK，並確保 .npmrc 設定 legacy-peer-deps=true 以避免潛在衝突。",
    tags: ["Bugfix", "npm", "Dependencies"]
  },
  {
    date: "2024-05-30",
    title: "Vercel 建置失敗修復 (npm ERESOLVE)",
    content: "解決 npm install 時發生的依賴衝突 (lucide-react 版本不匹配)。措施：1. 新增 .npmrc 設定 legacy-peer-deps=true 強制忽略衝突。 2. 更新 package.json 將 lucide-react 設為 latest，確保相容性。",
    tags: ["Bugfix", "Vercel", "npm"]
  },
  {
    date: "2024-05-30",
    title: "Vercel 持續黑屏故障排除 (Importmap 衝突)",
    content: "發現部署後持續黑屏是因 index.html 中殘留 importmap 區塊所致。Vite 編譯器與 importmap 衝突，導致打包失敗或輸出無效。已徹底移除 importmap，確保 Vite 能正確打包並啟動 React 應用程式。",
    tags: ["Bugfix", "Vite", "Deployment", "Importmap"]
  },
  {
    date: "2024-05-29",
    title: "Vercel 建置環境修復 (Critical)",
    content: "解決部署後黑屏問題。原因：瀏覽器無法執行原始的 .tsx 檔案。解決方案：導入 Vite + TypeScript 建置流程 (新增 package.json, vite.config.ts, tsconfig.json)，讓 Vercel 在部署前自動編譯程式碼。",
    tags: ["Bugfix", "Vite", "Infrastructure"]
  },
  {
    date: "2024-05-29",
    title: "Vercel 黑屏故障排除 (Hotfix)",
    content: "修正 Vercel 部署後畫面全黑的問題。原因：index.html 缺少指向 index.tsx 的入口腳本 (<script type='module' src='/index.tsx'></script>)。添加後重新部署，React 應用程式應能正常掛載。",
    tags: ["Bugfix", "Vercel", "Deployment"]
  },
  {
    date: "2024-05-29",
    title: "Vercel 部署確認與流量監測",
    content: "前端儀表板已成功上線 (Status: Ready)。Vercel 儀表板顯示 '100 GB' 為免費額度上限，目前實際使用量極低 (KB 級別)，確認 SPA 架構極為輕量，無須擔心頻寬成本。",
    tags: ["Deployment", "Vercel", "Monitoring"]
  },
  {
    date: "2024-05-29",
    title: "部署作業啟動 (Deployment Start)",
    content: "確定採用 Vercel / Netlify 託管方案。已建立 vercel.json 與 netlify.toml 設定檔以支援 SPA 路由重寫。程式碼庫準備推送到 GitHub 觸發自動部署 CI/CD 流程。",
    tags: ["Deployment", "CI/CD", "Vercel"]
  },
  {
    date: "2024-05-28",
    title: "前端儀表板部署規劃",
    content: "評估將此系統監控儀表板 (React App) 公開的方案。方案 A (外網)：使用 Vercel/Netlify 託管，透過 GitHub 自動部署。方案 B (自架)：在 R5 CasaOS 上建立 Nginx 容器並掛載 Build 後的靜態檔，需搭配 Cloudflare Tunnel 解決雙重 NAT 問題。",
    tags: ["Deployment", "Vercel", "Self-Hosted"]
  },
  {
    date: "2024-05-27",
    title: "Minecraft 開服與網絡挑戰",
    content: "Minecraft 伺服器核心已穩定運行，玩家可正常登入遊玩。目前遭遇兩大問題：1. 缺乏 Residence 領地與 TPA 傳送插件的權限配置。 2. 租屋處網絡環境造成雙重 NAT (Double NAT)，導致 Port Forwarding 失效，目前正尋求內網穿透 (Tunnel) 方案解決外網連線問題。",
    tags: ["Minecraft", "Network", "Issues"]
  },
  {
    date: "2024-05-26",
    title: "Katana17 開發環境優化 (uv)",
    content: "在 Windows 11 本機導入 uv 進行 Python 專案管理，取代傳統 Anaconda/Pip。移除 Windows Docker Desktop 以節省 RAM，Docker 任務全數移交 R5 伺服器。",
    tags: ["Optimization", "uv", "Python"]
  },
  {
    date: "2024-05-24",
    title: "硬體規格更新與 CasaOS 部署",
    content: "R5 伺服器硬體更新為 Ryzen 3600 + GTX 1060 6GB。作業系統遷移至 Ubuntu Server 並安裝 CasaOS 方便管理 Docker 容器。",
    tags: ["Hardware", "CasaOS", "Ubuntu"]
  }
];

export const SYSTEM_CONTEXT_PROMPT = `
You are a highly intelligent system administrator assistant integrated into the dashboard of a specific computing environment.
Here is the system architecture you are monitoring:

1. **R5 3600 Server (Remote Backend)**:
   - **Hardware**: AMD Ryzen 5 3600, GTX 1060 6GB, 16GB DDR4.
   - **OS**: Ubuntu Server + CasaOS.
   - **Isolation**: Docker Containers.
   - **Role**: Heavy lifting, stable services (LLM, Minecraft).
   - **Current Issues**: Minecraft server has Double NAT issues (cannot port forward due to rented apartment network). LLM is currently in maintenance/planning mode.

2. **MSI Katana 17 B13VGK (Main Workstation)**:
   - **Hardware**: i7-13620H, RTX 4070 (8GB), 16GB DDR5.
   - **OS**: Windows 11.
   - **Development Env**: **uv** (extremely fast Python package manager). NO system-wide Python or Docker Desktop installed on Windows to save resources.
   - **Virtualization**: running **Whonix** (Privacy) and **Kali Linux** (Security) via VirtualBox/VMware.
   - **Role**: Daily driver, Local Dev (uv), High Security Tasks (VMs).

**Deployment Status**:
- **Hosting**: The dashboard is LIVE on **Vercel**.
- **Metrics**: The user might see "100 GB" in Vercel. Explain that this is the **Limit/Quota**, NOT the website size. The site is very small (<1MB).
- **Config**: vercel.json and netlify.toml are configured.

**Critical Logic to Explain to User**:
- If the user asks about installing Docker on Windows: Explain that **NO**, they do not need it. R5 handles Docker. Windows uses \`uv\` for native Python dev (which isolates dependencies via venv), and VMs for OS-level isolation. This saves significant RAM by avoiding WSL2 overhead.
- If asked about Minecraft: Mention it is running but has "Double NAT" issues preventing external access, and plugins need config.
- If asked about deployment issues or black screen: Explain that a common issue is \`importmap\` conflicting with Vite's build process, requiring its complete removal from \`index.html\`.

**Goal**: Assist the user in understanding this architecture. Be technical but concise.
`;