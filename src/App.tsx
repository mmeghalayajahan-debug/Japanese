import { useState, useRef } from "react";
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
  Camera
} from "lucide-react";

const USER_DATA = {
  name: "Md Mumin Mia",
  role: "Senior Cyberneticist & Web Developer",
  employeeId: "CAJ-7729-BD",
  balance: 200.00,
  office: "Shibuya Sky Tower, Tokyo",
  branch: "CyberArk Japan (サイバーアーク・ジャパン)",
  status: "Active / On-duty",
  joined: "Feb 2020",
  email: "mumin.mia@cyberark.co.jp"
};

const ACTIVITY_LOG = [
  { id: 1, action: "Security Patch Deployed", target: "Core-API v2.4", time: "2h ago", status: "Success" },
  { id: 2, action: "Salary Credit", target: "Monthly Bonus", time: "18h ago", amount: "+$50.00" },
  { id: 3, action: "Login Detected", target: "Chrome / Windows 11", time: "1d ago", location: "Dhaka, BD" },
  { id: 4, action: "Code Review", target: "Prism-UI Dashboard", time: "2d ago", status: "Completed" },
];

export default function App() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen flex tech-grid font-sans selection:bg-cyber-accent/30">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageChange} 
        className="hidden" 
        accept="image/*"
      />

      {/* Sidebar */}
      <aside className="w-64 border-r border-cyber-border bg-cyber-blue/50 backdrop-blur-xl hidden lg:flex flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-cyber-accent rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(0,168,232,0.4)]">
            <Shield className="text-cyber-blue" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">CYBERARK</h1>
            <p className="text-[10px] text-cyber-accent font-mono uppercase tracking-[0.2em]">Japan Division</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem icon={LayoutDashboard} label="Dashboard" active />
          <NavItem icon={User} label="My Profile" onClick={triggerFileInput} />
          <NavItem icon={Wallet} label="Finances" />
          <NavItem icon={Monitor} label="Assets" />
          <NavItem icon={Shield} label="Security" />
          <NavItem icon={Mail} label="Messages" badge={3} />
          <NavItem icon={Settings} label="Staff Settings" />
        </nav>

        <div className="mt-auto pt-6 border-t border-cyber-border">
          <div 
            onClick={triggerFileInput}
            className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 cursor-pointer transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyber-accent to-blue-600 flex items-center justify-center text-sm font-bold border border-white/10 overflow-hidden relative">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                "MM"
              )}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={12} className="text-white" />
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold truncate group-hover:text-cyber-accent transition-colors">{USER_DATA.name}</p>
              <p className="text-[10px] text-white/40 truncate italic">{USER_DATA.role}</p>
            </div>
            <LogOut size={16} className="text-white/40 hover:text-red-400 transition-colors" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-1">Welcome back, Mumin-san</h2>
            <div className="flex items-center gap-4 text-sm text-white/50 bg-white/5 px-3 py-1 rounded-full w-fit">
              <span className="flex items-center gap-1.5"><Clock size={14} className="text-cyber-accent" /> {new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="w-1 h-1 bg-white/20 rounded-full"></span>
              <span className="flex items-center gap-1.5"><MapPin size={14} className="text-cyber-accent" /> {USER_DATA.office}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="bg-white/5 border border-cyber-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-cyber-accent/50 focus:ring-1 focus:ring-cyber-accent/50 w-64 transition-all"
              />
            </div>
            <button className="p-2.5 rounded-xl bg-white/5 border border-cyber-border hover:bg-white/10 transition-all relative">
              <Bell size={20} className="text-white/70" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-cyber-accent rounded-full border-2 border-cyber-blue"></span>
            </button>
          </div>
        </header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Main Stats */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Wallet Card */}
              <motion.div variants={itemVariants} className="glass-panel p-6 relative overflow-hidden group">
                <div className="absolute -right-6 -top-6 text-cyber-accent/5 opacity-20 group-hover:opacity-30 transition-opacity">
                  <Wallet size={120} strokeWidth={1} />
                </div>
                <div className="flex items-center justify-between mb-8">
                  <div className="p-2.5 bg-cyber-accent/10 border border-cyber-accent/20 rounded-xl">
                    <Wallet size={20} className="text-cyber-accent" />
                  </div>
                  <span className="text-[10px] font-mono text-cyber-accent bg-cyber-accent/10 px-2 py-0.5 rounded uppercase tracking-wider">Salary Wallet</span>
                </div>
                <p className="text-sm text-white/50 mb-1">Available Corporate Credit</p>
                <h3 className="text-4xl font-mono font-bold text-white mb-6">
                  <span className="text-cyber-accent text-2xl mr-1">$</span>
                  {USER_DATA.balance.toFixed(2)}
                </h3>
                <div className="flex items-center gap-4">
                  <button className="flex-1 bg-cyber-accent hover:bg-cyber-accent/90 text-cyber-blue font-bold py-2.5 rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(0,168,232,0.2)]">
                    Transfer Funds
                  </button>
                  <button className="p-2.5 border border-cyber-border rounded-xl hover:bg-white/5 transition-all">
                    <CreditCard size={18} className="text-white/60" />
                  </button>
                </div>
              </motion.div>

              {/* Status/Branch Card */}
              <motion.div variants={itemVariants} className="glass-panel p-6 border-l-4 border-l-cyber-accent">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                    <Globe size={18} className="text-cyber-accent" />
                  </div>
                  <h4 className="font-semibold text-sm">Deployment Status</h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Current Branch</label>
                    <p className="text-sm font-medium">{USER_DATA.branch}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Employee Status</label>
                      <span className="flex items-center gap-1.5 text-xs text-green-400 font-medium">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        {USER_DATA.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Clearance</label>
                      <span className="text-xs bg-white/10 px-2 py-0.5 rounded font-mono">Level 4-S</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Activity Log */}
            <motion.div variants={itemVariants} className="glass-panel overflow-hidden">
              <div className="p-6 border-bottom border-cyber-border flex items-center justify-between">
                <h4 className="font-bold flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-cyber-accent rounded-full animate-pulse"></div>
                   Recent Activity log
                </h4>
                <button className="text-[10px] uppercase tracking-widest text-cyber-accent hover:underline">View History</button>
              </div>
              <div className="divide-y divide-cyber-border">
                {ACTIVITY_LOG.map((log) => (
                  <div key={log.id} className="p-4 hover:bg-white/[0.02] transition-all flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                        {log.amount ? <TrendingUp size={18} /> : <Cpu size={18} />}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{log.action}</p>
                        <p className="text-[10px] text-white/40">{log.target}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {log.amount ? (
                        <p className="text-sm font-mono font-bold text-green-400">{log.amount}</p>
                      ) : (
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${log.status === 'Success' || log.status === 'Completed' ? 'bg-green-500/10 text-green-400' : 'bg-white/10 text-white/60'}`}>
                          {log.status || 'Verified'}
                        </span>
                      )}
                      <p className="text-[10px] text-white/30 mt-1">{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar Widgets */}
          <div className="space-y-6">
            {/* ID Card Widget */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-cyber-blue via-[#0c1b44] to-cyber-blue border border-cyber-accent/30 rounded-3xl p-8 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-accent/10 blur-[60px] group-hover:bg-cyber-accent/20 transition-all"></div>
              
              <div className="flex justify-between items-start mb-10">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-cyber-accent">
                   <Shield size={24} />
                </div>
                <div className="text-right">
                  <div className="text-[8px] uppercase tracking-[0.3em] text-cyber-accent font-bold mb-1 italic">Authorized Personnel</div>
                  <div className="w-16 h-1 bg-cyber-accent/30 rounded-full ml-auto overflow-hidden">
                    <div className="w-1/2 h-full bg-cyber-accent animate-[scan_2s_linear_infinite]"></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center mb-8">
                <div 
                  onClick={triggerFileInput}
                  className="w-24 h-24 rounded-2xl bg-white/5 p-1 border border-cyber-accent/20 mb-4 shadow-xl cursor-pointer hover:border-cyber-accent/60 transition-all group/avatar overflow-hidden relative"
                >
                  <div className="w-full h-full rounded-xl bg-gradient-to-tr from-gray-200 to-white flex items-center justify-center overflow-hidden">
                     {profileImage ? (
                       <img src={profileImage} alt="ID Profile" className="w-full h-full object-cover" />
                     ) : (
                       <User size={48} className="text-cyber-blue/40" />
                     )}
                  </div>
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                    <Camera size={20} className="text-white mb-1" />
                    <span className="text-[8px] text-white font-bold uppercase tracking-tighter">Update</span>
                  </div>
                </div>
                <h5 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">{USER_DATA.name}</h5>
                <p className="text-[10px] text-cyber-accent font-mono tracking-widest">{USER_DATA.role}</p>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/5">
                <div className="flex justify-between text-[10px]">
                  <span className="text-white/30 uppercase tracking-widest">Employee ID</span>
                  <span className="font-mono text-white/80">{USER_DATA.employeeId}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-white/30 uppercase tracking-widest">Access Bio</span>
                  <span className="font-mono text-white/80">Alpha-Confirmed</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-white/30 uppercase tracking-widest">Region</span>
                  <span className="font-mono text-white/80">APAC-JPNDHK</span>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                 <div className="w-full bg-black/40 p-2 rounded-lg border border-white/5 flex flex-col items-center">
                    <div className="w-full flex gap-1 justify-center mb-1">
                       {[...Array(24)].map((_, i) => (
                         <div key={i} className={`w-[2px] h-4 bg-white/${i % 3 === 0 ? '40' : '10'}`}></div>
                       ))}
                    </div>
                    <span className="text-[8px] font-mono text-white/20 tracking-[0.5em]">007729BD9910</span>
                 </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants} className="glass-panel p-6">
              <h4 className="font-bold text-sm mb-6 flex items-center gap-2 uppercase tracking-wider">
                <Cpu size={16} className="text-cyber-accent" /> System Terminal
              </h4>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <ActionButton label="Request Leave" />
                <ActionButton label="Tax Statement" />
                <ActionButton label="IT Support" />
                <ActionButton label="Remote VPN" />
              </div>
              <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                <p className="text-[10px] font-mono text-cyber-accent opacity-60 mb-2">{">"} System health optimal</p>
                <div className="flex items-center gap-1">
                  <div className="h-[2px] flex-1 bg-cyber-accent/20 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-cyber-accent"></div>
                  </div>
                  <span className="text-[8px] font-mono text-white/40">75% CPU</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      ` }} />
    </div>
  );
}

function NavItem({ icon: Icon, label, active = false, badge = 0, onClick }: { icon: any, label: string, active?: boolean, badge?: number, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-cyber-accent/10 border border-cyber-accent/20 text-cyber-accent' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} />
        <span className="text-sm font-medium">{label}</span>
      </div>
      {badge > 0 && (
        <span className="bg-cyber-accent text-cyber-blue text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
          {badge}
        </span>
      )}
      {active && <ChevronRight size={14} className="opacity-50" />}
    </div>
  );
}

function ActionButton({ label }: { label: string }) {
  return (
    <button className="text-[10px] font-semibold text-white/70 bg-white/5 border border-white/5 hover:border-cyber-accent/30 hover:bg-white/10 p-3 rounded-xl text-center transition-all">
      {label}
    </button>
  );
}

