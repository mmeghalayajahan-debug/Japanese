import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Bell, 
  CreditCard, 
  LayoutDashboard, 
  LogOut, 
  Mail, 
  MapPin, 
  Monitor, 
  Search, 
  Settings, 
  Shield, 
  User, 
  Wallet,
  Clock,
  ChevronRight,
  TrendingUp,
  Cpu,
  Globe,
  Camera,
  Layers,
  Zap
} from "lucide-react";

// Storage Keys
const KEY_BALANCE = "cyberark_wallet_balance";
const KEY_LAST_UPDATE = "cyberark_last_daily_sync";
const KEY_PROFILE_IMG = "cyberark_profile_image";
const KEY_TRANSACTIONS = "cyberark_ledgers_v2";

interface Transaction {
  id: string;
  type: 'salary' | 'bonus' | 'expense' | 'dividend';
  amount: number;
  description: string;
  date: string;
  ref: string;
}

const USER_DATA = {
  name: "Md Mumin Mia",
  role: "Senior Cyberneticist & Web Developer",
  employeeId: "CAJ-7729-BD",
  baseBalance: 24750.50,
  office: "Shibuya Sky Tower, Tokyo",
  branch: "CyberArk Japan (サイバーアーク・ジャパン)",
  status: "Senior Elite / Active",
  joined: "2020-02-03",
  email: "mumin.mia@cyberark.co.jp"
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("cyberark_auth_session") === "true";
  });
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [balance, setBalance] = useState<number>(0);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "kuyasa.com") {
      setIsAuthenticated(true);
      localStorage.setItem("cyberark_auth_session", "true");
      setLoginError(false);
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 2000);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("cyberark_auth_session");
  };

  // Initialize and check for daily earnings
  useEffect(() => {
    if (!isAuthenticated) return;
    // 1. Load Profile Image
    const savedImg = localStorage.getItem(KEY_PROFILE_IMG);
    if (savedImg) setProfileImage(savedImg);

    // 2. Load Data & Handle History Generation
    const storedBalance = localStorage.getItem(KEY_BALANCE);
    const lastSync = localStorage.getItem(KEY_LAST_UPDATE);
    const savedTx = localStorage.getItem(KEY_TRANSACTIONS);

    let currentBalance = storedBalance ? parseFloat(storedBalance) : USER_DATA.baseBalance;
    let currentTransactions: Transaction[] = savedTx ? JSON.parse(savedTx) : [];
    const now = new Date();
    const nowTs = now.getTime();
    const oneDayMs = 24 * 60 * 60 * 1000;

    // Generate 6 years of history if none exists
    if (currentTransactions.length === 0) {
      const history: Transaction[] = [];
      const startDate = new Date(USER_DATA.joined);
      let tempBalance = 0;
      let iterDate = new Date(startDate);
      
      while (iterDate < now) {
        const monthYear = iterDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
        
        // 1. Salary
        const salary = 1250.00 + (Math.random() * 450);
        history.unshift({
          id: `sal-${iterDate.getTime()}`,
          type: 'salary',
          amount: salary,
          description: `Internal Salary Credit - ${monthYear}`,
          date: iterDate.toISOString().split('T')[0],
          ref: `CAJ-TX-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
        });
        tempBalance += salary;

        // 2. Monthly Expenses (Maintenance, etc)
        const expense = 150.00 + (Math.random() * 300);
        history.unshift({
          id: `exp-${iterDate.getTime()}`,
          type: 'expense',
          amount: expense,
          description: `Node Maintenance Fee - ${monthYear}`,
          date: iterDate.toISOString().split('T')[0],
          ref: `SYS-RF-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
        });
        tempBalance -= expense;

        // 3. Periodic Bonuses
        if (iterDate.getMonth() === 5 || iterDate.getMonth() === 11) {
          const bonus = 800.00 + (Math.random() * 1200);
          history.unshift({
            id: `bon-${iterDate.getTime()}`,
            type: 'bonus',
            amount: bonus,
            description: `Performance Index Multiplier - Q${iterDate.getMonth() === 5 ? '2' : '4'} Reward`,
            date: iterDate.toISOString().split('T')[0],
            ref: `DIV-EX-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
          });
          tempBalance += bonus;
        }

        // 4. Quarterly Dividends
        if (iterDate.getMonth() % 3 === 0) {
          const dividend = 200.00 + (Math.random() * 150);
          history.unshift({
            id: `div-${iterDate.getTime()}`,
            type: 'dividend',
            amount: dividend,
            description: `Asset Liquidity Dividend`,
            date: iterDate.toISOString().split('T')[0],
            ref: `STK-PY-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
          });
          tempBalance += dividend;
        }

        iterDate.setMonth(iterDate.getMonth() + 1);
      }
      currentTransactions = history;
      currentBalance = tempBalance; 
    }

    if (lastSync) {
      const lastSyncTime = parseInt(lastSync);
      const diffMs = nowTs - lastSyncTime;
      
      if (diffMs >= oneDayMs) {
        setIsSyncing(true);
        const daysPassed = Math.floor(diffMs / oneDayMs);
        let totalEarnings = 0;
        const newDailyTxs: Transaction[] = [];
        
        for (let i = 1; i <= daysPassed; i++) {
          const earningDate = new Date(lastSyncTime + (i * oneDayMs));
          const dailyAmount = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
          totalEarnings += dailyAmount;
          
          newDailyTxs.unshift({
            id: `daily-${earningDate.getTime()}`,
            type: 'salary',
            amount: dailyAmount,
            description: "Daily Production Node Credit",
            date: earningDate.toISOString().split('T')[0],
            ref: `NODE-${Math.random().toString(36).substring(7).toUpperCase()}`
          });
        }

        currentBalance += totalEarnings;
        currentTransactions = [...newDailyTxs, ...currentTransactions];
        
        localStorage.setItem(KEY_BALANCE, currentBalance.toString());
        localStorage.setItem(KEY_LAST_UPDATE, nowTs.toString());
        localStorage.setItem(KEY_TRANSACTIONS, JSON.stringify(currentTransactions));
        
        setTimeout(() => setIsSyncing(false), 2000);
      }
    } else {
      localStorage.setItem(KEY_LAST_UPDATE, nowTs.toString());
      localStorage.setItem(KEY_BALANCE, currentBalance.toString());
      localStorage.setItem(KEY_TRANSACTIONS, JSON.stringify(currentTransactions));
    }

    setBalance(currentBalance);
    setTransactions(currentTransactions);
  }, []);

  const lifetimeEarnings = transactions
    .filter(t => t.type !== 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSpent = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        localStorage.setItem(KEY_PROFILE_IMG, base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center tech-grid bg-[#0A1128] font-sans p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-panel p-10 w-full max-w-md border-cyber-accent/30 shadow-[0_0_50px_rgba(0,168,232,0.15)]"
        >
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-cyber-accent rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(0,168,232,0.4)]">
              <Shield className="text-[#0A1128]" size={36} />
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">CyberArk Japan</h1>
            <p className="text-[10px] text-cyber-accent font-mono uppercase tracking-[0.4em] mt-1 font-bold">Terminal Access Control</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block ml-1">Secure Passkey</label>
              <div className="relative">
                <Shield size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter access code..."
                  className={`w-full bg-white/5 border ${loginError ? 'border-red-500 ring-1 ring-red-500' : 'border-cyber-border focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent'} rounded-2xl pl-12 pr-6 py-4 text-sm transition-all focus:outline-none placeholder:text-white/10 font-mono`}
                />
              </div>
              {loginError && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest text-center mt-2 animate-bounce">Access Denied: Invalid Credentials</p>}
            </div>

            <button 
              type="submit"
              className="w-full bg-cyber-accent hover:bg-[#00D4FF] text-[#0A1128] font-black py-4 rounded-2xl text-xs uppercase tracking-[0.2em] transition-all shadow-[0_0_30px_rgba(0,168,232,0.2)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Verify Identity
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-white/5 text-center">
            <p className="text-[9px] text-white/20 uppercase tracking-widest leading-relaxed">
              Protected by CyberArk Advanced Systems<br/>
              Authorized Personnel Only
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex tech-grid font-sans selection:bg-cyber-accent/30 bg-[#0A1128] text-white">
      {/* Hidden File Input */}
      <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />

      {/* Sidebar */}
      <aside className="w-72 border-r border-cyber-border bg-[#0A1128]/80 backdrop-blur-2xl hidden lg:flex flex-col p-8 sticky top-0 h-screen z-50">
        <div className="flex items-center gap-4 mb-12 px-2">
          <div className="w-12 h-12 bg-cyber-accent rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(0,168,232,0.4)]">
            <Shield className="text-[#0A1128]" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter text-white">CYBERARK</h1>
            <p className="text-[11px] text-cyber-accent font-mono uppercase tracking-[0.3em]">Japan Branch</p>
          </div>
        </div>

        <nav className="flex-1 space-y-3">
          <NavItem icon={LayoutDashboard} label="Dashboard" active />
          <NavItem icon={User} label="Profile & Bio" onClick={triggerFileInput} />
          <NavItem icon={Wallet} label="Payroll / Finance" />
          <NavItem icon={Monitor} label="Global Assets" />
          <NavItem icon={Shield} label="Security Clearances" />
          <NavItem icon={Layers} label="Project Nodes" />
          <NavItem icon={Mail} label="Deep-Web Mail" badge={5} />
          <NavItem icon={Settings} label="System Config" />
        </nav>

        <div className="mt-auto pt-8 border-t border-cyber-border">
          <div 
            onClick={triggerFileInput}
            className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 cursor-pointer transition-all group relative overflow-hidden"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyber-accent to-blue-600 flex items-center justify-center text-sm font-bold border border-white/20 overflow-hidden relative ring-2 ring-transparent group-hover:ring-cyber-accent/50 transition-all">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover shrink-0" />
              ) : (
                "MM"
              )}
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={14} className="text-white" />
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate group-hover:text-cyber-accent transition-colors">{USER_DATA.name}</p>
              <p className="text-[11px] text-white/40 truncate font-mono">ID: {USER_DATA.employeeId}</p>
            </div>
            <LogOut 
              size={18} 
              onClick={(e) => {
                e.stopPropagation();
                handleLogout();
              }}
              className="text-white/30 hover:text-red-400 transition-colors shrink-0" 
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto relative">
        {/* Daily Profit Notification */}
        {isSyncing && (
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute top-8 left-1/2 -translate-x-1/2 z-[100] bg-green-500 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-[0_0_40px_rgba(34,197,94,0.4)] border border-green-400/50"
          >
            <Zap size={20} className="animate-pulse" />
            <span className="font-bold text-sm">Daily earnings synced: +$20-30 Range detected</span>
          </motion.div>
        )}

        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <span className="bg-cyber-accent/10 text-cyber-accent text-[10px] font-mono px-2 py-0.5 rounded border border-cyber-accent/20">ACCESS_LEVEL: 04</span>
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               <span className="text-[10px] font-mono text-green-500 uppercase">System Online</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight mb-2">Kon'nichiwa, Mumin-san</h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/40 bg-white/5 border border-white/5 px-4 py-1.5 rounded-full w-fit backdrop-blur-md">
              <span className="flex items-center gap-2"><Clock size={15} className="text-cyber-accent" /> {new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</span>
              <span className="w-1.5 h-1.5 bg-white/10 rounded-full"></span>
              <span className="flex items-center gap-2"><MapPin size={15} className="text-cyber-accent" /> {USER_DATA.office}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden xl:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
              <input 
                type="text" 
                placeholder="Search Corporate Database..." 
                className="bg-white/5 border border-cyber-border rounded-2xl pl-12 pr-6 py-3.5 text-sm focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent w-80 transition-all placeholder:text-white/20"
              />
            </div>
            <button className="p-3.5 rounded-2xl bg-white/5 border border-cyber-border hover:bg-white/10 transition-all relative group">
              <Bell size={24} className="text-white/60 group-hover:text-cyber-accent transition-colors" />
              <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-cyber-accent rounded-full border-2 border-[#0A1128]"></span>
            </button>
          </div>
        </header>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Dashboard Panel */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Wallet Glass Card */}
              <motion.div variants={itemVariants} className="glass-panel p-8 relative overflow-hidden group">
                <div className="absolute -right-8 -top-8 text-cyber-accent/5 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Wallet size={160} strokeWidth={0.5} />
                </div>
                <div className="flex items-center justify-between mb-8">
                  <div className="p-3 bg-cyber-accent/10 border border-cyber-accent/20 rounded-2xl">
                    <Wallet size={24} className="text-cyber-accent" />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-mono text-cyber-accent bg-cyber-accent/10 px-2 py-0.5 rounded uppercase tracking-widest border border-cyber-accent/30">Secure Vault</span>
                    <span className="text-[9px] text-white/30 font-mono mt-1 italic">Daily Sync Active</span>
                  </div>
                </div>
                <p className="text-sm text-white/40 mb-2 font-medium tracking-wide uppercase">Current Balance</p>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-3xl text-cyber-accent font-mono font-bold">$</span>
                  <h3 className="text-5xl font-mono font-bold text-white tracking-tighter">
                    {balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 text-white/5 pointer-events-none">
                      <TrendingUp size={40} strokeWidth={3} />
                    </div>
                    <p className="text-[10px] text-white/30 uppercase font-black mb-1 tracking-widest">Lifetime Portfolio</p>
                    <p className="text-xl font-mono text-cyan-400 font-black tracking-tight">${lifetimeEarnings.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                  </div>
                  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 text-white/5 pointer-events-none">
                      <Zap size={40} strokeWidth={3} />
                    </div>
                    <p className="text-[10px] text-white/30 uppercase font-black mb-1 tracking-widest">Service Duration</p>
                    <p className="text-xl font-mono text-white/80 font-black tracking-tight">6y 3m</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button className="flex-1 bg-cyber-accent hover:bg-[#00D4FF] text-[#0A1128] font-black py-4 rounded-2xl text-xs uppercase tracking-widest transition-all shadow-[0_0_40px_rgba(0,168,232,0.3)] hover:scale-[1.02] active:scale-[0.98]">
                    Initiate Withdrawal
                  </button>
                  <button className="p-4 border border-cyber-border rounded-2xl hover:bg-white/5 transition-all text-white/60 hover:text-cyber-accent">
                    <CreditCard size={22} />
                  </button>
                </div>
              </motion.div>

              {/* Status Info Card */}
              <motion.div variants={itemVariants} className="glass-panel p-8 border-l-4 border-l-cyber-accent">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-white/10 transition-colors">
                    <Globe size={22} className="text-cyber-accent" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg tracking-tight">CyberArk Node Tokyo</h4>
                    <p className="text-[11px] text-white/30 font-mono italic">LAST_SYNC: {new Date().toLocaleTimeString()}</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 block mb-2 font-bold">Assigned Division</label>
                    <p className="text-sm font-bold text-white/90 leading-relaxed uppercase tracking-wide">{USER_DATA.branch}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 block mb-2 font-bold">Duty Status</label>
                      <span className="flex items-center gap-2 text-xs text-green-400 font-black italic">
                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                        {USER_DATA.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 block mb-2 font-bold">Security</label>
                      <span className="text-xs bg-cyber-accent/10 text-cyber-accent px-3 py-1 rounded-full font-mono border border-cyber-accent/20 font-bold">RSA-8192</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Detailed Transaction Ledger */}
            <motion.div variants={itemVariants} className="glass-panel overflow-hidden">
              <div className="p-8 border-b border-cyber-border flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-black flex items-center gap-3 italic uppercase tracking-tighter">
                    <div className="w-3 h-3 bg-cyber-accent rounded-full animate-pulse shadow-[0_0_15px_rgba(0,168,232,1)]"></div>
                    Financial Ledger Statement
                  </h4>
                  <p className="text-[11px] text-white/30 mt-2 uppercase tracking-[0.3em] font-bold">Official Salary & Asset Appreciation Records</p>
                </div>
                <div className="flex gap-4">
                  <button className="text-[10px] uppercase tracking-widest text-white/40 font-bold hover:text-white transition-colors border border-white/5 px-4 py-2 rounded-xl">Batch Print</button>
                  <button className="text-[10px] uppercase tracking-widest text-cyber-accent font-black hover:text-white transition-colors flex items-center gap-2 bg-cyber-accent/10 px-4 py-2 rounded-xl border border-cyber-accent/20">
                    Export Audit <TrendingUp size={14} />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-white/5 text-[10px] uppercase tracking-[0.2em] text-white/30 border-b border-cyber-border font-black">
                      <th className="p-6">Transaction ID / Reference</th>
                      <th className="p-6">Date</th>
                      <th className="p-6">Description</th>
                      <th className="p-6 text-right">Amount (USD)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cyber-border">
                    {transactions.slice(0, 15).map((tx) => (
                      <tr key={tx.id} className="hover:bg-white/[0.04] transition-all group cursor-default">
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${tx.type === 'salary' || tx.type === 'bonus' || tx.type === 'dividend' ? 'text-green-400' : 'text-red-400'} group-hover:scale-110 transition-all shadow-sm`}>
                              {tx.type === 'salary' ? <TrendingUp size={18} /> : tx.type === 'bonus' ? <Zap size={18} /> : tx.type === 'dividend' ? <Layers size={18} /> : <CreditCard size={18} />}
                            </div>
                            <div>
                               <p className="text-xs font-mono font-bold text-white/90">{tx.ref}</p>
                               <span className="text-[9px] uppercase font-black px-1.5 py-0.5 rounded bg-white/5 text-white/40 tracking-tighter">{tx.type}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-6 text-[11px] text-white/40 font-mono font-bold tracking-tight">{tx.date}</td>
                        <td className="p-6">
                           <span className="text-sm font-bold text-white/80 group-hover:text-cyber-accent transition-colors">{tx.description}</span>
                        </td>
                        <td className={`p-6 text-right text-base font-mono font-black ${tx.type !== 'expense' ? 'text-green-400' : 'text-red-400'}`}>
                          {tx.type !== 'expense' ? '+' : '-'}{tx.amount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    {transactions.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-20 text-center text-white/20 italic text-sm font-mono tracking-widest">
                           <div className="flex flex-col items-center gap-4">
                              <Cpu size={40} className="animate-pulse opacity-20" />
                              INITIATING SECURE DATA LOAD...
                           </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar Widgets */}
          <div className="lg:col-span-4 space-y-8">
            {/* Holographic ID Widget */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#0c1b44] via-[#0A1128] to-[#0c1b44] border border-cyber-accent/20 rounded-[2.5rem] p-10 relative overflow-hidden group shadow-[0_40px_80px_rgba(0,0,0,0.4)]">
              {/* Scan effect lines */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-cyber-accent/20 animate-scan z-10"></div>
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyber-accent/10 blur-[80px] group-hover:bg-cyber-accent/20 transition-all"></div>
              
              <div className="flex justify-between items-start mb-12">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-cyber-accent shadow-inner">
                   <Shield size={28} />
                </div>
                <div className="text-right">
                  <div className="text-[9px] uppercase tracking-[0.4em] text-cyber-accent font-black mb-1 italic opacity-80">AUTHENTICATED PORTAL</div>
                  <div className="flex gap-1 justify-end opacity-40">
                     <div className="w-1.5 h-1.5 bg-cyber-accent rounded-full"></div>
                     <div className="w-1.5 h-1.5 bg-cyber-accent rounded-full scale-75"></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center mb-10">
                <div 
                  onClick={triggerFileInput}
                  className="w-32 h-32 rounded-3xl bg-[#0A1128] p-1.5 border-2 border-cyber-accent/20 mb-6 shadow-[0_0_40px_rgba(0,168,232,0.15)] cursor-pointer hover:border-cyber-accent/60 transition-all group/avatar relative overflow-hidden ring-4 ring-white/5"
                >
                  <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-gray-100 to-white flex items-center justify-center overflow-hidden">
                     {profileImage ? (
                       <img src={profileImage} alt="ID Profile" className="w-full h-full object-cover shrink-0" />
                     ) : (
                       <User size={60} className="text-[#0A1128]/30" />
                     )}
                  </div>
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity backdrop-blur-sm">
                    <Camera size={26} className="text-white mb-2" />
                    <span className="text-[10px] text-white font-black uppercase tracking-[0.2em]">Update ID</span>
                  </div>
                </div>
                <h5 className="text-2xl font-black text-white mb-1 uppercase tracking-tighter italic">{USER_DATA.name}</h5>
                <p className="text-xs text-cyber-accent font-mono tracking-[0.3em] font-bold">{USER_DATA.role}</p>
              </div>

              <div className="space-y-4 pt-10 border-t border-white/5 mb-8">
                <IDRow label="Employee ID" value={USER_DATA.employeeId} />
                <IDRow label="Access Clearance" value="Alpha-04-Secure" />
                <IDRow label="Neural Mesh ID" value="CYB-99-MIA-08" />
                <IDRow label="Station ID" value="TK-SKY-77" />
              </div>

              <div className="bg-black/60 p-4 rounded-2xl border border-white/10 flex flex-col items-center shadow-inner">
                <div className="w-full flex gap-1.5 justify-center mb-2 overflow-hidden px-4">
                   {[...Array(30)].map((_, i) => (
                     <div key={i} className={`w-[2px] h-6 bg-white/${i % 4 === 0 ? '40' : '10'} shrink-0`}></div>
                   ))}
                </div>
                <span className="text-[9px] font-mono text-white/20 tracking-[0.6em] font-bold">7729-BD-MIA-JP-001</span>
              </div>
            </motion.div>

            {/* Quick Utility Box */}
            <motion.div variants={itemVariants} className="glass-panel p-8">
              <h4 className="font-black text-xs mb-8 flex items-center gap-3 uppercase tracking-[0.2em] text-white/50 border-b border-white/5 pb-4">
                <Cpu size={18} className="text-cyber-accent" /> Operations Terminal
              </h4>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <ActionButton label="Request PTO" />
                <ActionButton label="Tax Statement" />
                <ActionButton label="Tech Assist" />
                <ActionButton label="HQ Relay" />
              </div>
              <div className="bg-black/40 p-5 rounded-2xl border border-white/5 shadow-inner">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-[10px] font-mono text-cyber-accent font-bold uppercase tracking-widest">{">"} System Health</p>
                  <span className="text-[9px] text-green-400 font-mono">NOMINAL</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "88%" }}
                      transition={{ duration: 2 }}
                      className="h-full bg-cyber-accent shadow-[0_0_10px_rgba(0,168,232,0.8)]"
                    ></motion.div>
                  </div>
                  <span className="text-[10px] font-mono text-white/40 font-bold">88%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function IDRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center group/row">
      <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold group-hover/row:text-white/50 transition-colors">{label}</span>
      <span className="font-mono text-[11px] text-white/90 font-bold group-hover/row:text-cyber-accent transition-colors">{value}</span>
    </div>
  );
}

function NavItem({ icon: Icon, label, active = false, badge = 0, onClick }: { icon: any, label: string, active?: boolean, badge?: number, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all duration-300 group shadow-sm ${active ? 'bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-accent shadow-[0_0_20px_rgba(0,168,232,0.1)]' : 'text-white/40 border border-transparent hover:bg-white/5 hover:text-white'}`}
    >
      <div className="flex items-center gap-4">
        <Icon size={20} className={`${active ? 'text-cyber-accent' : 'text-white/20 group-hover:text-cyber-accent'} transition-colors duration-300`} />
        <span className="text-sm font-bold tracking-wide">{label}</span>
      </div>
      {badge > 0 && (
        <span className="bg-cyber-accent text-[#0A1128] text-[10px] font-black px-2 py-0.5 rounded-full min-w-[20px] text-center shadow-[0_0_10px_rgba(0,168,232,0.4)]">
          {badge}
        </span>
      )}
      {active && <ChevronRight size={16} className="opacity-50" />}
    </div>
  );
}

function ActionButton({ label }: { label: string }) {
  return (
    <button className="text-[10px] font-black uppercase tracking-wider text-white/60 bg-white/5 border border-white/10 hover:border-cyber-accent/50 hover:bg-cyber-accent/10 hover:text-cyber-accent p-4 rounded-2xl text-center transition-all duration-300 shadow-sm active:scale-95">
      {label}
    </button>
  );
}
