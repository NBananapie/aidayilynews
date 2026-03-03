"use client";
import { useEffect, useState } from "react";
import {
  Database, Cpu, Clock, Send, Sparkles,
  Settings, ChevronRight, FileText, Search, Activity, RefreshCw, BellRing
} from "lucide-react";
import ReactMarkdown from "react-markdown";

type Report = {
  id: string;
  title: string;
  content: string;
  date: string;
};

export default function Dashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reports')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setReports(data.reports);
          if (data.reports.length > 0) {
            setSelectedReport(data.reports[0]);
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 selection:bg-cyan-500/30">

      {/* Header */}
      <header className="w-full max-w-7xl flex justify-between items-center mb-10 mt-4 animate-in fade-in slide-in-from-top-4 duration-700">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
            <Sparkles className="text-cyan-400 h-8 w-8" />
            AI 日报管家
          </h1>
          <p className="text-slate-300 text-lg">个人定制化 AI 资讯自动化工作流</p>
        </div>

        <button className="hidden sm:flex items-center gap-2 glass-card px-5 py-2.5 rounded-full text-slate-200 text-sm font-medium hover:bg-white/20 transition">
          <Settings className="w-4 h-4" />
          系统设置
        </button>
      </header>

      {/* Bento Grid */}
      <main className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">

        {/* 1. Daily Reports Reader (Spans 2-3 columns depending on screen) */}
        <div className="glass-card rounded-3xl p-6 md:col-span-2 lg:col-span-3 flex flex-col group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-10 -mt-20 z-0"></div>

          <div className="flex justify-between items-center mb-6 relative z-10 border-b border-white/10 pb-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-white">
              <FileText className="w-6 h-6 text-cyan-400" />
              AI 产出日报列表
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-300">共 {reports.length} 份报告</span>
              <button
                onClick={() => window.location.reload()}
                className="bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/40 hover:text-white transition-colors p-2 rounded-xl backdrop-blur-md"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Reader Layout Split */}
          <div className="flex flex-col lg:flex-row gap-6 flex-1 relative z-10 w-full h-[500px]">
            {/* Sidebar list */}
            <div className="w-full lg:w-1/3 flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
              {loading ? (
                <div className="text-slate-400 text-center py-10">正在加载生成好的日报...</div>
              ) : reports.length === 0 ? (
                <div className="text-slate-400 text-center py-10">暂无生成的日报 (请检查 reports 目录)</div>
              ) : (
                reports.map((report) => (
                  <div
                    key={report.id}
                    onClick={() => setSelectedReport(report)}
                    className={`flex flex - col p - 4 rounded - 2xl border transition - all cursor - pointer ${selectedReport?.id === report.id
                        ? 'bg-cyan-500/20 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                      } `}
                  >
                    <h3 className="font-medium text-slate-100 mb-1 leading-snug">{report.title}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(report.date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Markdown Viewer */}
            <div className="w-full lg:w-2/3 h-full bg-black/40 rounded-2xl border border-white/10 p-6 overflow-y-auto custom-scrollbar">
              {selectedReport ? (
                <div className="prose prose-invert prose-slate max-w-none text-slate-200 
                  prose-headings:text-white prose-a:text-cyan-400 prose-strong:text-cyan-100 prose-code:text-emerald-300">
                  <ReactMarkdown>{selectedReport.content}</ReactMarkdown>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500">
                  点击左侧列表预览日报详细内容
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar Configs */}
        <div className="flex flex-col gap-6 w-full h-full">

          {/* 2. AI Models & Config (Volcengine) */}
          <div className="glass-card rounded-3xl p-6 flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 relative overflow-hidden flex-1">
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl -mr-10 -mb-10 z-0"></div>

            <div className="flex justify-between items-center mb-5 relative z-10">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                <Cpu className="w-5 h-5 text-purple-400" />
                大模型驱动
              </h2>
            </div>

            <div className="flex-1 flex flex-col gap-3 relative z-10">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-slate-400 mb-1">当前推理引擎</p>
                <div className="flex justify-between items-center">
                  <p className="font-medium text-slate-100">Volcengine AI</p>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-slate-400 mb-1">默认调用模型</p>
                <div className="flex justify-between items-center">
                  <p className="font-medium text-slate-100">DeepSeek R1 / Kimi</p>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                </div>
              </div>

              <button className="mt-auto w-full py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-slate-200 text-sm font-medium flex items-center justify-center gap-2">
                <Settings className="w-4 h-4" /> API 密钥与端点配置
              </button>
            </div>
          </div>

          {/* 3. Delivery Output (Feishu) */}
          <div className="glass-card rounded-3xl p-6 flex flex-col justify-between animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 relative overflow-hidden flex-1">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-transparent z-0"></div>

            <div className="relative z-10">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-2 text-white">
                <BellRing className="w-5 h-5 text-blue-400" />
                分发渠道
              </h2>
              <p className="text-slate-400 text-xs">生成完毕后将推送到您的工作区</p>
            </div>

            <div className="mt-4 space-y-3 relative z-10">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Send className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-slate-200 text-sm">Feishu Webhook</span>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Active
                </span>
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* Footer / Status */}
      <footer className="w-full max-w-7xl mt-10 flex justify-between items-center text-sm text-slate-400 animate-in fade-in duration-1000 delay-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          系统服务正常执行中
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-slate-200 transition-colors">Documentation</a>
          <a href="#" className="hover:text-slate-200 transition-colors">GitHub</a>
        </div>
      </footer>

      {/* Global override for prose scrollbar since it's injected inside */}
      <style dangerouslySetInnerHTML={{
        __html: `
  .custom - scrollbar:: -webkit - scrollbar {
  width: 6px;
}
        .custom - scrollbar:: -webkit - scrollbar - track {
  background: rgba(255, 255, 255, 0.02);
  border - radius: 8px;
}
        .custom - scrollbar:: -webkit - scrollbar - thumb {
  background: rgba(255, 255, 255, 0.1);
  border - radius: 8px;
}
        .custom - scrollbar:: -webkit - scrollbar - thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
`}} />
    </div>
  );
}
