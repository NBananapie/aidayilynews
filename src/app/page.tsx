import {
  Rss, Database, Cpu, Clock, Send, Sparkles,
  Settings, ChevronRight, BarChart3, Search
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 selection:bg-cyan-500/30">

      {/* Header */}
      <header className="w-full max-w-6xl flex justify-between items-center mb-10 mt-4 animate-in fade-in slide-in-from-top-4 duration-700">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
            <Sparkles className="text-cyan-400 h-8 w-8" />
            AI Daily News
          </h1>
          <p className="text-slate-400 text-lg">Manage your automated intelligence pipeline</p>
        </div>

        <button className="hidden sm:flex items-center gap-2 glass-card px-5 py-2.5 rounded-full text-sm font-medium hover:bg-white/10 transition">
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </header>

      {/* Bento Grid */}
      <main className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">

        {/* 1. Information Sources (Span 2) */}
        <div className="glass-card rounded-3xl p-6 md:col-span-2 flex flex-col group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-10 -mt-20 z-0"></div>

          <div className="flex justify-between items-center mb-6 relative z-10">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Rss className="w-6 h-6 text-cyan-400" />
              Information Sources
            </h2>
            <button className="bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/40 hover:text-cyan-100 transition-colors px-4 py-2 rounded-xl text-sm font-medium backdrop-blur-md">
              Add Source
            </button>
          </div>

          <div className="flex-1 space-y-3 relative z-10 w-full overflow-hidden">
            {[
              { name: "TechCrunch AI", count: "12 new articles", status: "Active" },
              { name: "Hacker News Top", count: "8 relevant posts", status: "Active" },
              { name: "ArXiv ML Papers", count: "24 new papers", status: "Syncing..." },
            ].map((source, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group/item cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                    <Search className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-200">{source.name}</h3>
                    <p className="text-xs text-slate-400">{source.count}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${source.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                    {source.status}
                  </span>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover/item:text-slate-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. AI Models & Config */}
        <div className="glass-card rounded-3xl p-6 flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl -mr-10 -mb-10 z-0"></div>

          <div className="flex justify-between items-center mb-6 relative z-10">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Cpu className="w-6 h-6 text-purple-400" />
              AI Models
            </h2>
          </div>

          <div className="flex-1 flex flex-col gap-4 relative z-10">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-xs text-slate-400 mb-1">Summarization Model</p>
              <div className="flex justify-between items-center">
                <p className="font-medium text-lg">Claude 3.5 Sonnet</p>
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-xs text-slate-400 mb-1">Translation & Tone</p>
              <div className="flex justify-between items-center">
                <p className="font-medium text-lg">GPT-4o</p>
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
              </div>
            </div>

            <button className="mt-auto w-full py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium flex items-center justify-center gap-2">
              <Settings className="w-4 h-4" /> Configure Prompts
            </button>
          </div>
        </div>

        {/* 3. Update Frequency */}
        <div className="glass-card rounded-3xl p-6 flex flex-col justify-between animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
              <Clock className="w-6 h-6 text-orange-400" />
              Schedule
            </h2>
            <p className="text-slate-400 text-sm">Next delivery scheduled in 14h 22m</p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                  <Send className="w-4 h-4" />
                </div>
                <span className="font-medium">Every Morning</span>
              </div>
              <span className="text-lg font-bold">08:00 AM</span>
            </div>
            <div className="text-xs text-center text-slate-500">
              Timezone: Asia/Shanghai (UTC+8)
            </div>
          </div>
        </div>

        {/* 4. Enterprise Knowledge Base (Span 2) */}
        <div className="glass-card rounded-3xl p-6 md:col-span-2 flex flex-col justify-between animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/5 to-transparent z-0"></div>

          <div className="flex justify-between items-center mb-6 relative z-10">
            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Database className="w-6 h-6 text-blue-400" />
                Enterprise Knowledge Base
              </h2>
              <p className="text-slate-400 text-sm mt-1">Vector DB connected: 124,592 documents</p>
            </div>

            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs">PDF</div>
              <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-xs">MD</div>
              <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-600 flex items-center justify-center text-xs">+3</div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10 w-full">
            {[
              { label: "Memory Retrieval", value: "98.2%" },
              { label: "Indexing Queue", value: "0" },
              { label: "Storage Used", value: "4.2 GB" },
              { label: "Namespaces", value: "8" }
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-black/20 border border-white/5 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold text-slate-200">{stat.value}</span>
                <span className="text-xs text-slate-400 mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Footer / Status */}
      <footer className="w-full max-w-6xl mt-10 flex justify-between items-center text-sm text-slate-500 animate-in fade-in duration-1000 delay-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          System Operational
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-slate-300 transition-colors">Documentation</a>
          <a href="#" className="hover:text-slate-300 transition-colors">GitHub</a>
        </div>
      </footer>

    </div>
  );
}
