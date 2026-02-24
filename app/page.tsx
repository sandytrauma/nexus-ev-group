"use client";

import React, { useState, useRef } from 'react';
import { 
  Zap, ShieldCheck, TrendingUp, BarChart3, 
  FileDown, FileText, ClipboardCheck, ScrollText, Eraser, PenTool, CheckCircle2,
  UserCheck, MapPin, Building2, Package, Rocket, Target, Lightbulb
} from 'lucide-react';
import Image from 'next/image';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar
} from 'recharts';

// PDF Logic Imports
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; 
import Link from 'next/link';

const growthData = [
  { year: 'Year 1', units: 400, profit: 6.6 },
  { year: 'Year 2', units: 850, profit: 14.0 },
  { year: 'Year 3', units: 1500, profit: 24.7 },
  { year: 'Year 4', units: 2200, profit: 36.3 },
  { year: 'Year 5', units: 3500, profit: 57.7 },
];

export default function NexusUnifiedDashboard() {
  const [activeTab, setActiveTab] = useState<'plan' | 'marketing'>('plan');
  const [unitCount, setUnitCount] = useState(16);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // --- FINANCIAL CALCULATIONS (Directly from Nexus Prospectus) ---
  const ipInvestment = 150000;
  const directorInvestment = 500000;
  const totalUnitMargin = 1650; // (950+450+250)

  const ipMonthlyProfit = unitCount * totalUnitMargin; 
  const directorMonthlyProfit = unitCount * 4200; 

  const comparisonData = [
    { name: 'Investment', IP: ipInvestment / 1000, Director: directorInvestment / 1000 },
    { name: 'Monthly Profit', IP: ipMonthlyProfit / 1000, Director: directorMonthlyProfit / 1000 },
  ];

  // --- SIGNATURE LOGIC ---
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent): { x: number; y: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) { ctx.beginPath(); ctx.moveTo(x, y); }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.strokeStyle = '#22d3ee'; ctx.lineTo(x, y); ctx.stroke();
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const applySKWatermark = (doc: jsPDF) => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.saveGraphicsState();
    const gState = new (doc as any).GState({ opacity: 0.05 }); 
    doc.setGState(gState);
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(150);
    doc.text("SK", pageWidth / 2, pageHeight / 2, { align: "center", angle: 45 });
    doc.restoreGraphicsState();
  };

  const drawHeader = (doc: jsPDF, title: string) => {
    doc.setFillColor(2, 2, 5); doc.rect(0, 0, 210, 40, 'F');
    doc.setFontSize(20); doc.setTextColor(34, 211, 238); doc.setFont("helvetica", "bold");
    doc.text("NEXUS EV GROUP", 15, 25);
    doc.setFontSize(10); doc.setTextColor(255, 255, 255);
    doc.text(`${title} // 2026`, 15, 32);
  };

  const downloadProspectus = () => {
    const doc = new jsPDF();
    drawHeader(doc, "FULL INVESTMENT PROSPECTUS");
    doc.setTextColor(0, 0, 0); doc.setFontSize(14);
    doc.text("1. Partnership Tiers", 15, 55);
    
    autoTable(doc, {
      startY: 60,
      head: [['Metric', 'Inventory Partner (IP)', 'Director Level']],
      body: [
        ["Initial Capital", "INR 1.50L", "INR 5.00L"],
        ["Monthly Unit Goal", `${unitCount} Units`, `${unitCount} Units`],
        ["Monthly Net Profit", `INR ${ipMonthlyProfit.toLocaleString()}`, `INR ${directorMonthlyProfit.toLocaleString()}`],
        ["Annual ROI Ratio", `${((ipMonthlyProfit * 12 / ipInvestment) * 100).toFixed(0)}%`, `${((directorMonthlyProfit * 12 / directorInvestment) * 100).toFixed(0)}%`],
        ["Territory Rights", "Localized Hub", "Regional/City Wide"]
      ],
      headStyles: { fillColor: [34, 211, 238], textColor: [0, 0, 0] },
    });

    const firstY = (doc as any).lastAutoTable.finalY;

    doc.text("2. 5-Year Growth Roadmap", 15, firstY + 15);
    autoTable(doc, {
      startY: firstY + 20,
      head: [['Timeline', 'Unit Velocity', 'Annual Net', 'Strategic Status']],
      body: [
        ["Year 1", "400 Units", "INR 6.6L", "Payback Phase"],
        ["Year 2", "850 Units", "INR 14.0L", "Scaling Phase"],
        ["Year 3", "1,500 Units", "INR 24.7L", "Market Dominance"],
        ["Year 4", "2,200 Units", "INR 36.3L", "Network Maturity"],
        ["Year 5", "3,500 Units", "INR 57.7L", "IPO/Exit Ready"]
      ],
      headStyles: { fillColor: [31, 41, 55], textColor: [255, 255, 255] },
    });

    applySKWatermark(doc);
    doc.save(`Nexus_Prospectus_Roadmap.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white p-4 md:p-12 font-sans selection:bg-cyan-500/30">
      {/* Tab Switcher */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 w-full md:w-fit backdrop-blur-xl">
          <button onClick={() => setActiveTab('plan')} className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'plan' ? 'bg-cyan-400 text-black shadow-[0_0_20px_-5px_#22d3ee]' : 'text-slate-400 hover:text-white'}`}>BUSINESS PLAN</button>
          <button onClick={() => setActiveTab('marketing')} className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'marketing' ? 'bg-cyan-400 text-black shadow-[0_0_20px_-5px_#22d3ee]' : 'text-slate-400 hover:text-white'}`}><Link href="/marketing">MARKETING PAGE</Link></button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {activeTab === 'plan' ? (
          <div className="animate-in fade-in duration-700">
            
            {/* NEW HERO SECTION: THE MISSION & MODEL (500 Words Equivalent) */}
            <section className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm mb-6 uppercase tracking-[0.3em] animate-pulse">
                  <Rocket size={16} /> <span>The Nexus Masterplan</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight uppercase mb-8">
                  EV REVOLUTION <br/><span className="text-cyan-400">STARTS HERE.</span>
                </h1>
                <p className="text-slate-400 leading-relaxed text-lg mb-6">
                  Nexus EV Group is not just a parts supplier; we are building the <strong>Hyper-Local Fulfillment Infrastructure</strong> for India's electric transition. While others focus on high-cost showrooms, we focus on the "Heart of the Machine"—the motors, controllers, and conversion kits that power the 2nd and 3rd wheelers of the nation.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                   <Target className="text-cyan-400 mb-4" />
                   <h3 className="font-bold uppercase text-sm mb-2">What We Do</h3>
                   <p className="text-xs text-slate-500 leading-relaxed">We manufacture and distribute high-temperature EV powertrain components. From 1.2kW Alpha Motors to Sine-Wave controllers, we provide the tech that makes EVs reliable in Indian heat.</p>
                </div>
                <div className="p-6 rounded-3xl bg-cyan-400/10 border border-cyan-400/20">
                   <Zap className="text-cyan-400 mb-4" />
                   <h3 className="font-bold uppercase text-sm mb-2">How We Do It</h3>
                   <p className="text-xs text-slate-400 leading-relaxed">We eliminate the middleman. Through our Inventory Partner (IP) model, we turn local storage spaces into micro-fulfillment hubs, ensuring 24-hour parts availability for mechanics.</p>
                </div>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 md:col-span-2">
                   <Lightbulb className="text-cyan-400 mb-4" />
                   <h3 className="font-bold uppercase text-sm mb-2">Why Partner With Us?</h3>
                   <p className="text-xs text-slate-500 leading-relaxed">Most franchises demand 20L+ investment. Nexus allows you to enter the EV market for just ₹1.50L with an 85% buy-back guarantee on stock. We provide the leads, the tech, and the branding; you provide the local presence. It is a low-risk, high-velocity model designed for the 2026 market peak.</p>
                </div>
              </div>
            </section>

            <header className="mb-10 md:mb-16">
              <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-none uppercase">EXECUTION <br/><span className="text-cyan-400 font-outline">REALITY.</span></h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8 space-y-6">
                <div className="glass-panel p-6 md:p-8 bg-cyan-500/5 border-cyan-500/20 rounded-[2rem]">
                  <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-8">Financial Analysis</h2>
                  <div className="h-[250px] w-full mb-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                        <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}k`} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} />
                        <Bar dataKey="IP" fill="#475569" radius={[4, 4, 0, 0]} barSize={40} />
                        <Bar dataKey="Director" fill="#22d3ee" radius={[4, 4, 0, 0]} barSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-slate-400 uppercase tracking-widest font-bold">Monthly Unit Goal</span>
                        <span className="text-2xl font-black text-cyan-400">{unitCount} Units</span>
                    </div>
                    <input type="range" min="10" max="100" value={unitCount} onChange={(e) => setUnitCount(parseInt(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 mb-10" />
                  </div>
                </div>

                {/* Digital Signature */}
                <div className="glass-panel p-6 md:p-8 bg-white/[0.03] border-white/10 rounded-[2rem]">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2"><PenTool size={14}/> Digital Signature</h3>
                    <button onClick={clearSignature} className="text-[10px] text-slate-500 hover:text-white flex items-center gap-1 transition-colors"><Eraser size={12}/> Clear</button>
                  </div>
                  <div className="bg-slate-900/50 rounded-2xl border border-dashed border-white/20 overflow-hidden h-64 md:h-80 relative">
                    <canvas 
                      ref={canvasRef} width={1600} height={400}
                      onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={() => setIsDrawing(false)}
                      onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={() => setIsDrawing(false)}
                      className="w-full h-full cursor-crosshair touch-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8">
                      <DocBtn title="Prospectus + Roadmap" icon={<FileDown size={14}/>} fn={downloadProspectus} />
                      <DocBtn title="MOU (Ready)" icon={<ScrollText size={14}/>} fn={() => {}} />
                      <DocBtn title="LOI (Ready)" icon={<FileText size={14}/>} fn={() => {}} />
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 space-y-4">
                <div className="glass-panel p-6 border-white/10 rounded-[2rem] bg-cyan-400/5">
                    <h2 className="text-lg font-bold mb-6 uppercase text-cyan-400 text-center">Your Returns</h2>
                    <div className="space-y-4">
                        <PriceRow label="Monthly Profit" price={`₹${ipMonthlyProfit.toLocaleString()}`} highlight />
                        <PriceRow label="Annual ROI" price={`${((ipMonthlyProfit * 12 / ipInvestment) * 100).toFixed(0)}%`} />
                    </div>
                </div>
                <div className="p-8 bg-white/5 border border-white/10 rounded-[2rem]">
                   <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Partner Perks</h3>
                   <div className="space-y-4">
                      <div className="flex items-center gap-3 text-xs"><CheckCircle2 size={14} className="text-cyan-400" /> Lead Generation Support</div>
                      <div className="flex items-center gap-3 text-xs"><CheckCircle2 size={14} className="text-cyan-400" /> Tech Training Certification</div>
                      <div className="flex items-center gap-3 text-xs"><CheckCircle2 size={14} className="text-cyan-400" /> Regional Logistics App</div>
                   </div>
                </div>
              </div>

              {/* 5-Year Growth Roadmap Section */}
              <div className="md:col-span-12 mt-12">
                <div className="flex items-center gap-3 mb-8"><TrendingUp className="text-cyan-400" /><h2 className="text-2xl md:text-3xl font-black tracking-widest uppercase">5-Year Growth Roadmap</h2></div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-4 glass-panel p-8 bg-white/[0.02] border-white/10 rounded-[2rem]">
                    <div className="space-y-6">
                      <YearPlan year="Year 1" goal="Payback Phase" detail="400 Units target. Focus on hub stabilization and local mechanic onboarding." />
                      <YearPlan year="Year 3" goal="Market Dominance" detail="1,500 Units target. Scaling to city-wide fulfillment dominance." />
                      <YearPlan year="Year 5" goal="IPO / Exit Ready" detail="3,500 Units target. Strategic exit or infrastructure acquisition phase." />
                    </div>
                  </div>
                  <div className="lg:col-span-8 glass-panel p-8 bg-cyan-400/[0.03] border-cyan-400/20 rounded-[2rem]">
                    <h3 className="text-emerald-400 font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-sm"><BarChart3 size={18} /> Profit Trajectory (Annual Lakhs)</h3>
                    <div className="h-[280px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={growthData}>
                          <defs><linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/><stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/></linearGradient></defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                          <XAxis dataKey="year" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                          <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}L`} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #22d3ee', borderRadius: '12px' }} />
                          <Area type="monotone" dataKey="profit" stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in slide-in-from-right duration-500 pb-20 text-center py-20">
            <h2 className="text-4xl font-black mb-4">MARKETING ASSETS</h2>
            <p className="text-slate-500">Marketing view components go here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// --- HELPERS ---
function DocBtn({ title, icon, fn }: any) {
  return (
    <button onClick={fn} className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl text-[10px] font-bold transition-all group">
      <span className="text-cyan-400 group-hover:scale-110 transition-transform">{icon}</span> {title}
    </button>
  );
}

function PriceRow({ label, price, highlight }: any) {
  return (
    <div className={`flex justify-between items-center p-4 rounded-xl ${highlight ? 'bg-cyan-400/10 border border-cyan-400/20' : 'bg-white/5'}`}>
      <span className={`text-sm ${highlight ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}>{label}</span>
      <span className={`font-bold font-mono ${highlight ? 'text-cyan-400' : ''}`}>{price}</span>
    </div>
  );
}

function YearPlan({ year, goal, detail }: any) {
  return (
    <div className="flex gap-4 border-l-2 border-cyan-400/20 pl-4 py-1">
      <div className="flex-shrink-0"><span className="text-cyan-400 font-black text-xs uppercase">{year}</span></div>
      <div><h4 className="text-white font-bold text-sm uppercase mb-1">{goal}</h4><p className="text-slate-500 text-[11px] leading-relaxed">{detail}</p></div>
    </div>
  );
}