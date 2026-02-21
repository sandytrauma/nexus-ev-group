"use client";

import React, { useState } from 'react';
import { 
  Zap, ShieldCheck, TrendingUp, Target, ShieldAlert, BarChart3, 
  CheckCircle2, Globe, LayoutGrid, FileDown, Crown, ArrowRight, Info
} from 'lucide-react';
import Image from 'next/image';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Legend
} from 'recharts';

// PDF Logic Imports
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; 

const growthData = [
  { year: 'Year 1', profit: 6.6 },
  { year: 'Year 2', profit: 14.0 },
  { year: 'Year 3', profit: 24.7 },
  { year: 'Year 4', profit: 36.3 },
  { year: 'Year 5', profit: 57.7 },
];

export default function NexusUnifiedDashboard() {
  const [activeTab, setActiveTab] = useState<'plan' | 'marketing'>('plan');
  const [unitCount, setUnitCount] = useState(25);
  
  // --- FINANCIAL CALCULATIONS ---
  const ipInvestment = 150000;
  const directorInvestment = 500000;
  
  const profitPerMotor = 950;
  const profitPerController = 450;
  const profitPerConsumables = 250;
  const totalUnitProfit = profitPerMotor + profitPerController + profitPerConsumables; 

  const ipMonthlyProfit = unitCount * totalUnitProfit;
  const directorMonthlyProfit = unitCount * 4200; 

  const comparisonData = [
    { name: 'Investment', IP: ipInvestment / 1000, Director: directorInvestment / 1000 },
    { name: 'Monthly Profit', IP: ipMonthlyProfit / 1000, Director: directorMonthlyProfit / 1000 },
  ];

  // --- PDF GENERATOR (WATERMARK TO FRONT + BLUR EFFECT) ---
  const handleDownload = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // 1. Branding Header
    doc.setFillColor(2, 2, 5); 
    doc.rect(0, 0, 210, 40, 'F');
    doc.setFontSize(22);
    doc.setTextColor(34, 211, 238); 
    doc.setFont("helvetica", "bold");
    doc.text("NEXUS EV GROUP", 15, 25);
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text("OFFICIAL INVESTMENT PROSPECTUS // 2026", 15, 32);

    // 2. Comparative Table
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text("Partnership Tier Comparison", 15, 55);
    
    const compareRows = [
      ["Initial Capital", "INR 1.50L", "INR 5.00L"],
      ["Monthly Unit Goal", `${unitCount}`, `${unitCount}`],
      ["Monthly Net Profit", `INR ${ipMonthlyProfit.toLocaleString()}`, `INR ${directorMonthlyProfit.toLocaleString()}`],
      ["Annual ROI Ratio", `${((ipMonthlyProfit * 12 / ipInvestment) * 100).toFixed(0)}%`, `${((directorMonthlyProfit * 12 / directorInvestment) * 100).toFixed(0)}%`],
      ["Territory Rights", "Localized Hub", "Regional/City Wide"]
    ];

    autoTable(doc, {
      startY: 60,
      head: [['Metric', 'Inventory Partner (IP)', 'Director Level']],
      body: compareRows,
      headStyles: { fillColor: [34, 211, 238], textColor: [0, 0, 0] },
      styles: { fontSize: 10, cellPadding: 3 },
    });

    let finalY = (doc as any).lastAutoTable.finalY || 100;

    // 3. Profit Breakdown Table
    doc.setFontSize(14);
    doc.text("IP Profit Per Unit Breakdown", 15, finalY + 15);
    
    autoTable(doc, {
        startY: finalY + 20,
        head: [['Component', 'Margin (INR)']],
        body: [
            ['Alpha Motor (High Temp)', `INR ${profitPerMotor}`],
            ['Sine-Wave Controller', `INR ${profitPerController}`],
            ['Consumables & Wiring', `INR ${profitPerConsumables}`],
            ['Total Net Margin', `INR ${totalUnitProfit}`]
        ],
        theme: 'grid',
        styles: { fontSize: 9 },
        headStyles: { fillColor: [71, 85, 105] }
    });

    finalY = (doc as any).lastAutoTable.finalY || 180;

    // 4. 5-Year Scaling Roadmap
    doc.setFontSize(14);
    doc.text("5-Year Growth Roadmap", 15, finalY + 15);
    const tableRows = [
      ["Year 1", "400 Units", "INR 6.6L", "Payback Phase"],
      ["Year 3", "1,500 Units", "INR 24.7L", "Market Dominance"],
      ["Year 5", "3,500 Units", "INR 57.7L", "IPO / Exit Ready"]
    ];

    autoTable(doc, {
      startY: finalY + 20,
      head: [['Timeline', 'Unit Velocity', 'Annual Net', 'Strategic Status']],
      body: tableRows,
      headStyles: { fillColor: [34, 211, 238], textColor: [0, 0, 0] },
      alternateRowStyles: { fillColor: [245, 245, 245] }
    });

    // 5. Signature Footer
    const footerY = 285;
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text("Generated via Nexus Executive Hub", 15, footerY);
    doc.setFont("helvetica", "italic");
    doc.text("Authorized Digital Signature: SK // NEXUS-EV-2026", 140, footerY);

    // --- 6. FRONT-LAYER WATERMARK (RUNS LAST TO BE ON TOP) ---
    doc.saveGraphicsState();
    // Use GState for transparency (acts like a 'blur' or semi-transparent overlay)
    const gState = new (doc as any).GState({ opacity: 0.06 }); 
    doc.setGState(gState);
    doc.setTextColor(150, 150, 150);

    // REPEATING PATTERN OVER DATA
    doc.setFontSize(10);
    for (let i = 0; i < pageWidth; i += 40) {
      for (let j = 0; j < pageHeight; j += 30) {
        doc.text("SK", i, j, { angle: 25 });
      }
    }

    // LARGE CENTRAL FRONT WATERMARK
    doc.setFontSize(160);
    doc.setFont("helvetica", "bold");
    doc.text("SK", pageWidth / 2, pageHeight / 2, {
      align: "center",
      angle: 45
    });
    
    doc.restoreGraphicsState();

    doc.save(`Nexus_Prospectus_SK_Overlay_${unitCount}_Units.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white p-4 md:p-12 font-sans selection:bg-cyan-500/30">
      
      {/* --- HEADER --- */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 w-full md:w-fit backdrop-blur-xl">
          <button 
            onClick={() => setActiveTab('plan')}
            className={`flex-1 md:flex-none px-4 md:px-8 py-3 rounded-xl text-[10px] md:text-xs font-bold transition-all ${activeTab === 'plan' ? 'bg-cyan-400 text-black shadow-[0_0_20px_-5px_#22d3ee]' : 'text-slate-400 hover:text-white'}`}
          >
            BUSINESS PLAN
          </button>
          <button 
            onClick={() => setActiveTab('marketing')}
            className={`flex-1 md:flex-none px-4 md:px-8 py-3 rounded-xl text-[10px] md:text-xs font-bold transition-all ${activeTab === 'marketing' ? 'bg-cyan-400 text-black shadow-[0_0_20px_-5px_#22d3ee]' : 'text-slate-400 hover:text-white'}`}
          >
            MARKETING PAGE
          </button>
        </div>

        <button 
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl text-xs font-bold transition-all group"
        >
          <FileDown size={16} className="text-cyan-400 group-hover:animate-bounce" />
          GENERATE PERSONALIZED PDF
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        {activeTab === 'plan' ? (
          <div className="animate-in fade-in duration-500">
            <header className="mb-10 md:mb-16">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10px] md:text-sm mb-4 uppercase tracking-[0.2em] md:tracking-[0.3em]">
                <Zap size={14} /> <span>Nexus EV Group Hub</span>
              </div>
              <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-none uppercase">
                EXECUTION <br/><span className="text-cyan-400 font-outline">REALITY.</span>
              </h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8 space-y-6">
                <div className="glass-panel p-6 md:p-8 bg-cyan-500/5 border-cyan-500/20 rounded-[1.5rem] md:rounded-[2rem]">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight">Tier Comparison</h2>
                    <div className="flex gap-4 text-[10px] font-bold">
                      <span className="flex items-center gap-1"><div className="w-2 h-2 bg-slate-500 rounded-full"/> IP</span>
                      <span className="flex items-center gap-1"><div className="w-2 h-2 bg-cyan-400 rounded-full"/> Director</span>
                    </div>
                  </div>

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

                  {/* PROFIT BREAKDOWN UI */}
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 mb-8">
                    <h3 className="text-[10px] uppercase font-bold text-slate-500 mb-4 flex items-center gap-2">
                        <Info size={14} className="text-cyan-400" /> IP Profit Breakdown per Unit
                    </h3>
                    <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="flex flex-col">
                            <span className="text-cyan-400 font-mono font-bold text-sm">₹{profitPerMotor}</span>
                            <span className="text-[9px] text-slate-500 uppercase">Motor</span>
                        </div>
                        <div className="flex flex-col border-x border-white/10">
                            <span className="text-cyan-400 font-mono font-bold text-sm">₹{profitPerController}</span>
                            <span className="text-[9px] text-slate-500 uppercase">Controller</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-cyan-400 font-mono font-bold text-sm">₹{profitPerConsumables}</span>
                            <span className="text-[9px] text-slate-500 uppercase">Consumables</span>
                        </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row md:justify-between mb-4 gap-2">
                        <span className="text-[10px] md:text-sm text-slate-400 uppercase tracking-widest font-bold">Target Monthly Units</span>
                        <span className="text-xl md:text-2xl font-black text-cyan-400">{unitCount} Units</span>
                    </div>
                    <input type="range" min="10" max="250" value={unitCount} onChange={(e) => setUnitCount(parseInt(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <p className="text-[10px] text-slate-500 uppercase mb-2">IP Monthly Net</p>
                    <p className="text-3xl font-black">₹{ipMonthlyProfit.toLocaleString()}</p>
                  </div>
                  <div className="p-6 bg-cyan-400/10 border border-cyan-400/30 rounded-2xl">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[10px] text-cyan-400 uppercase">Director Monthly Net</p>
                      <Crown size={14} className="text-cyan-400" />
                    </div>
                    <p className="text-3xl font-black text-cyan-400">₹{directorMonthlyProfit.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 glass-panel p-6 md:p-8 border-white/10 flex flex-col justify-between rounded-[1.5rem] md:rounded-[2rem]">
                <h2 className="text-lg md:text-xl font-bold mb-6 uppercase tracking-tighter text-cyan-400">Standard IP Package</h2>
                <div className="space-y-3 md:space-y-4">
                  <PriceRow label="Stock Inventory" price="₹1.00L" />
                  <PriceRow label="Security Deposit" price="₹0.50L" />
                  <PriceRow label="Total Capital" price="₹1.50L" highlight />
                </div>
                <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                   <div className="flex items-center gap-2 text-[10px] text-emerald-400">
                     <CheckCircle2 size={14} /> <span>100% Stock Buy-back Guarantee</span>
                   </div>
                   <div className="flex items-center gap-2 text-[10px] text-emerald-400">
                     <CheckCircle2 size={14} /> <span>Zonal Marketing Support</span>
                   </div>
                </div>
                <p className="text-[9px] md:text-[10px] text-slate-500 mt-6 italic font-mono uppercase">Lock-in: 12 Months // Liquidation: 90 Days</p>
              </div>

              <div className="md:col-span-12 mt-8 md:mt-12">
                <div className="flex items-center gap-3 mb-8">
                  <TrendingUp className="text-cyan-400" />
                  <h2 className="text-2xl md:text-3xl font-black tracking-widest uppercase">Growth roadmap</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-4 glass-panel p-6 md:p-8 bg-white/[0.02] border-white/10 rounded-[1.5rem] md:rounded-[2rem]">
                    <h3 className="text-cyan-400 font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-[10px] md:text-sm">
                      <ShieldCheck size={18} /> Milestones
                    </h3>
                    <div className="space-y-6">
                      <YearPlan year="Year 1" goal="Penetration" detail="150 Hubs; 24H localized delivery infrastructure." />
                      <YearPlan year="Year 3" goal="The Ecosystem" detail="Nexus Smart-BMS launch & battery recycling." />
                      <YearPlan year="Year 5" goal="Exit Strategy" detail="Public offering or strategic acquisition readiness." />
                    </div>
                  </div>
                  <div className="lg:col-span-8 glass-panel p-6 md:p-8 bg-cyan-400/[0.03] border-cyan-400/20 rounded-[1.5rem] md:rounded-[2rem] min-h-[400px]">
                    <h3 className="text-emerald-400 font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-[10px] md:text-sm">
                      <BarChart3 size={18} /> Profit Trajectory (Annual Lakhs)
                    </h3>
                    <div className="h-[280px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={growthData}>
                          <defs>
                            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                          <XAxis dataKey="year" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                          <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}L`} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #22d3ee', borderRadius: '12px', fontSize: '12px' }}
                            itemStyle={{ color: '#22d3ee', fontWeight: 'bold' }}
                          />
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
          <div className="animate-in slide-in-from-right duration-500 pb-20">
            <header className="mb-12 md:mb-16 text-center md:text-left">
              <h1 className="text-4xl md:text-9xl font-black tracking-tighter leading-[0.9] md:leading-[0.85] mb-6 uppercase">
                THE LOCAL <br/><span className="text-cyan-400">MONOPOLY.</span>
              </h1>
              <p className="text-slate-400 text-sm md:text-xl max-w-3xl leading-relaxed mx-auto md:mx-0">
                By 2027, 60% of 2-wheelers in India will be Electric. As a **Nexus Partner**, you own the exclusive supply chain for your city.
              </p>
            </header>
            <section className="max-w-7xl mx-auto py-10 md:py-20 border-t border-white/5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <GalleryItem src="/images/alpha-motor-hero.png" title="Alpha Motor (1.2kW)" />
                    <GalleryItem src="/images/sine-wave-controller.png" title="Sine-Wave Controller" />
                    <GalleryItem src="/images/dc-convertor.png" title="Heavy Duty DC Converter" />
                    <GalleryItem src="/images/partner-starter-kit.png" title="Branded Mechanic Kit" />
                </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

/* --- SUB-COMPONENTS --- */
function YearPlan({ year, goal, detail }: { year: string, goal: string, detail: string }) {
  return (
    <div className="flex gap-4 border-l-2 border-cyan-400/20 pl-4 py-1">
      <div className="flex-shrink-0">
        <span className="text-cyan-400 font-black text-xs uppercase">{year}</span>
      </div>
      <div>
        <h4 className="text-white font-bold text-sm uppercase mb-1">{goal}</h4>
        <p className="text-slate-500 text-[11px] leading-relaxed">{detail}</p>
      </div>
    </div>
  );
}

function GalleryItem({ src, title }: { src: string, title: string }) {
  return (
    <div className="relative group rounded-xl overflow-hidden aspect-video bg-white/5">
      <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-[10px] text-slate-500">[Image Load]</div>
      <Image src={src} alt={title} fill sizes="25vw" className="object-cover group-hover:scale-105 transition-transform" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end p-4">
        <p className="text-[10px] md:text-xs font-bold text-white uppercase tracking-tight">{title}</p>
      </div>
    </div>
  );
}

function PriceRow({ label, price, highlight }: any) {
  return (
    <div className={`flex justify-between items-center p-3 md:p-4 rounded-xl ${highlight ? 'bg-cyan-400/10 border border-cyan-400/20' : 'bg-white/5'}`}>
      <span className={`text-[11px] md:text-sm ${highlight ? 'text-cyan-400 font-bold uppercase' : 'text-slate-400'}`}>{label}</span>
      <span className={`font-bold font-mono text-sm md:text-base ${highlight ? 'text-cyan-400' : ''}`}>{price}</span>
    </div>
  );
}