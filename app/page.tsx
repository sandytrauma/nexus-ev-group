"use client";

import React, { useState, useRef } from 'react';
import { 
  Zap, ShieldCheck, TrendingUp, BarChart3, 
  FileDown, FileText, ClipboardCheck, ScrollText, Eraser, PenTool, CheckCircle2,
  UserCheck, MapPin, Building2, Package
} from 'lucide-react';
import Image from 'next/image';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar
} from 'recharts';

// PDF Logic Imports
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; 

const growthData = [
  { year: 'Year 1', units: 400, profit: 6.6 },
  { year: 'Year 2', units: 850, profit: 14.0 },
  { year: 'Year 3', units: 1500, profit: 24.7 },
  { year: 'Year 4', units: 2200, profit: 36.3 },
  { year: 'Year 5', units: 3500, profit: 57.7 },
];

export default function NexusUnifiedDashboard() {
  const [activeTab, setActiveTab] = useState<'plan' | 'marketing'>('plan');
  const [unitCount, setUnitCount] = useState(16); // Default 16 as per Prospectus
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // --- FINANCIAL CALCULATIONS (Directly from Nexus Prospectus) ---
  const ipInvestment = 150000;
  const directorInvestment = 500000;
  
  const marginMotor = 950;
  const marginController = 450;
  const marginConsumables = 250;
  const totalUnitMargin = marginMotor + marginController + marginConsumables; // 1650

  const ipMonthlyProfit = unitCount * totalUnitMargin; 
  const directorMonthlyProfit = unitCount * 4200; // Calculated baseline for Director tier

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

  // --- PDF EXPORT WITH 5-YEAR ROADMAP ---
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

    // CASTING TO ANY TO RESOLVE TYPESCRIPT Error
    const firstTableY = (doc as any).lastAutoTable.finalY;

    doc.setFontSize(14);
    doc.text("2. 5-Year Growth Roadmap", 15, firstTableY + 15);
    autoTable(doc, {
      startY: firstTableY + 20,
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

    const secondTableY = (doc as any).lastAutoTable.finalY;
    doc.setFontSize(14);
    doc.text("3. IP Profit Per Unit Breakdown", 15, secondTableY + 15);
    autoTable(doc, {
      startY: secondTableY + 20,
      head: [['Component', 'Margin (INR)']],
      body: [
        ["Alpha Motor (High Temp)", "INR 950"],
        ["Sine-Wave Controller", "INR 450"],
        ["Consumables & Wiring", "INR 250"],
        ["Total Net Margin", "INR 1650"]
      ],
      headStyles: { fillColor: [71, 85, 105], textColor: [255, 255, 255] },
    });

    applySKWatermark(doc);
    doc.save(`Nexus_Full_Prospectus_2026.pdf`);
  };

  const downloadMOU = () => {
    const doc = new jsPDF();
    drawHeader(doc, "MEMORANDUM OF UNDERSTANDING");
    doc.setTextColor(0, 0, 0); doc.setFontSize(9);
    
    const content = [
      { t: "1. Objective", c: "The Company appoints the RP as a Micro-Warehouse and Fulfillment Partner for the specified region for Automotive/EV components." },
      { t: "2. Financial Commitment", c: "Total Commitment: ₹1,50,000. Breakup: ₹50,000 Refundable Security Deposit (Interest-free) and ₹1,00,000 Advance for Initial Inventory." },
      { t: "3. Roles", c: "Company provides components, technical training, and digital leads. RP provides 100-200 sq. ft. storage and manages local deliveries." },
      { t: "4. Pricing & Margins", c: "Supplied at Wholesale Partner Rates. RP authorized to sell at MRP with a projected margin of 15-25%." },
      { t: "5. Inventory", c: "RP must maintain a 20% minimum threshold. Restocking on Pre-paid basis." },
      { t: "6. Exit Clause", c: "Mandatory 6-month lock-in. 30-day notice for termination. Buy-back of undamaged stock at 85% of invoice value." }
    ];

    let y = 55;
    content.forEach(item => {
      doc.setFont("helvetica", "bold"); doc.text(item.t, 15, y);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(item.c, 180); doc.text(lines, 15, y + 5);
      y += (lines.length * 5) + 10;
    });

    if (canvasRef.current) {
        doc.text("Partner Signature:", 15, y + 10);
        doc.addImage(canvasRef.current.toDataURL('image/png'), 'PNG', 15, y + 12, 40, 20);
    }
    applySKWatermark(doc);
    doc.save("Nexus_MOU_Signed.pdf");
  };

  const downloadLOI = () => {
    const doc = new jsPDF();
    drawHeader(doc, "LETTER OF INTENT (LOI)");
    doc.setTextColor(0, 0, 0); doc.setFontSize(11);
    const loiText = "I hereby express my formal intent to apply for the Nexus Regional Partner position. I acknowledge the financial commitment of INR 1,50,000 and agree to the operational terms defined in the MOU. I confirm availability of storage space and capacity for local fulfillment.";
    doc.text(doc.splitTextToSize(loiText, 175), 15, 60);
    
    if (canvasRef.current) {
        doc.text("Digital Signature Authorization:", 15, 100);
        doc.addImage(canvasRef.current.toDataURL('image/png'), 'PNG', 15, 105, 40, 20);
    }
    applySKWatermark(doc);
    doc.save("Nexus_LOI.pdf");
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white p-4 md:p-12 font-sans selection:bg-cyan-500/30">
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 w-full md:w-fit backdrop-blur-xl">
          <button onClick={() => setActiveTab('plan')} className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'plan' ? 'bg-cyan-400 text-black shadow-[0_0_20px_-5px_#22d3ee]' : 'text-slate-400 hover:text-white'}`}>BUSINESS PLAN</button>
          <button onClick={() => setActiveTab('marketing')} className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'marketing' ? 'bg-cyan-400 text-black shadow-[0_0_20px_-5px_#22d3ee]' : 'text-slate-400 hover:text-white'}`}>MARKETING PAGE</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {activeTab === 'plan' ? (
          <div className="animate-in fade-in duration-500">
            <header className="mb-10 md:mb-16">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm mb-4 uppercase tracking-[0.3em]"><Zap size={14} /> <span>Nexus EV Execution Hub</span></div>
              <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-none uppercase">EXECUTION <br/><span className="text-cyan-400 font-outline">REALITY.</span></h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8 space-y-6">
                <div className="glass-panel p-6 md:p-8 bg-cyan-500/5 border-cyan-500/20 rounded-[2rem]">
                  <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-8">Financial Tier Analysis</h2>
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
                        <span className="text-sm text-slate-400 uppercase tracking-widest font-bold">Projected Monthly Units</span>
                        <span className="text-2xl font-black text-cyan-400">{unitCount} Units</span>
                    </div>
                    <input type="range" min="8" max="100" value={unitCount} onChange={(e) => setUnitCount(parseInt(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 mb-10" />
                  </div>
                </div>

                <div className="glass-panel p-6 md:p-8 bg-white/[0.03] border-white/10 rounded-[2rem]">
                   <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2 mb-8"><UserCheck size={16}/> Selection Criteria</h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <SelectionCard icon={<Building2 size={16}/>} title="Entity Type" desc="Registered Proprietorship or Pvt Ltd preferred." />
                      <SelectionCard icon={<MapPin size={16}/>} title="Location" desc="Strategic access to regional transport hubs." />
                      <SelectionCard icon={<Package size={16}/>} title="Capacity" desc="Min 100-200 sq. ft. fire-safe dry storage." />
                      <SelectionCard icon={<ShieldCheck size={16}/>} title="Compliance" desc="GST Registration & valid trade licenses." />
                   </div>
                </div>

                <div className="glass-panel p-6 md:p-8 bg-white/[0.03] border-white/10 rounded-[2rem]">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2"><PenTool size={14}/> Digital Signature Authorization</h3>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
                      <DocBtn title="Prospectus" icon={<FileDown size={14}/>} fn={downloadProspectus} />
                      <DocBtn title="Sign MOU" icon={<ScrollText size={14}/>} fn={downloadMOU} />
                      <DocBtn title="Sign LOI" icon={<FileText size={14}/>} fn={downloadLOI} />
                      <DocBtn title="Selection Docs" icon={<ClipboardCheck size={14}/>} fn={() => {}} />
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 space-y-4">
                <div className="glass-panel p-6 border-white/10 rounded-[2rem] bg-cyan-400/5">
                    <h2 className="text-lg font-bold mb-6 uppercase text-cyan-400">Inventory Partner (IP)</h2>
                    <div className="space-y-4">
                        <PriceRow label="Stock Inventory" price="₹1.00L" />
                        <PriceRow label="Security Deposit" price="₹0.50L" />
                        <PriceRow label="Total Capital" price="₹1.50L" highlight />
                    </div>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem]">
                    <p className="text-[10px] text-slate-500 uppercase mb-2">Monthly Net Profit</p>
                    <p className="text-3xl font-black">₹{ipMonthlyProfit.toLocaleString()}</p>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] space-y-2">
                   <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Key Terms Summary</h3>
                   <div className="flex items-center gap-2 text-[10px]"><CheckCircle2 size={12} className="text-cyan-400" /> 85% Buy-Back Policy</div>
                   <div className="flex items-center gap-2 text-[10px]"><CheckCircle2 size={12} className="text-cyan-400" /> 6-Month Lock-in Period</div>
                   <div className="flex items-center gap-2 text-[10px]"><CheckCircle2 size={12} className="text-cyan-400" /> Pre-paid Restocking</div>
                </div>
              </div>

              <div className="md:col-span-12 mt-12">
                <div className="flex items-center gap-3 mb-8"><TrendingUp className="text-cyan-400" /><h2 className="text-2xl md:text-3xl font-black tracking-widest uppercase">Growth roadmap</h2></div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-4 glass-panel p-8 bg-white/[0.02] border-white/10 rounded-[2rem]">
                    <h3 className="text-cyan-400 font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-sm"><ShieldCheck size={18} /> Milestones</h3>
                    <div className="space-y-6">
                      <YearPlan year="Year 1" goal="Payback Phase" detail="400 Units target. Establishing 150 District Fulfillment Hubs." />
                      <YearPlan year="Year 3" goal="Market Dominance" detail="1,500 Units target. Strategic regional expansion." />
                      <YearPlan year="Year 5" goal="IPO / Exit Ready" detail="3,500 Units target. Strategic exit for partners." />
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
          <div className="animate-in slide-in-from-right duration-500 pb-20">
            <header className="mb-12 md:mb-16">
              <h1 className="text-4xl md:text-9xl font-black tracking-tighter leading-[0.9] mb-6 uppercase">THE LOCAL <br/><span className="text-cyan-400 font-outline">MONOPOLY.</span></h1>
            </header>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <GalleryItem src="/images/alpha-motor-hero.png" title="Alpha Motor (1.2kW)" />
                <GalleryItem src="/images/sine-wave-controller.png" title="Sine-Wave Controller" />
                <GalleryItem src="/images/dc-convertor.png" title="Heavy Duty DC Converter" />
                <GalleryItem src="/images/partner-starter-kit.png" title="Branded Mechanic Kit" />
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---
function DocBtn({ title, icon, fn }: any) {
  return (
    <button onClick={fn} className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 p-3 rounded-xl text-[10px] font-bold transition-all group">
      <span className="text-cyan-400 group-hover:scale-110 transition-transform">{icon}</span> {title}
    </button>
  );
}

function SelectionCard({ icon, title, desc }: any) {
  return (
    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-cyan-400/50 transition-colors">
      <div className="text-cyan-400 mb-2">{icon}</div>
      <h4 className="text-xs font-bold uppercase mb-1">{title}</h4>
      <p className="text-[10px] text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function PriceRow({ label, price, highlight }: any) {
  return (
    <div className={`flex justify-between items-center p-4 rounded-xl ${highlight ? 'bg-cyan-400/10 border border-cyan-400/20' : 'bg-white/5'}`}>
      <span className={`text-sm ${highlight ? 'text-cyan-400 font-bold uppercase' : 'text-slate-400'}`}>{label}</span>
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

function GalleryItem({ src, title }: any) {
  return (
    <div className="relative group rounded-xl overflow-hidden aspect-video bg-white/5">
      <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-[10px] text-slate-500 font-mono">[IMAGE]</div>
      <Image src={src} alt={title} fill sizes="25vw" className="object-cover group-hover:scale-105 transition-transform" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end p-4"><p className="text-xs font-bold text-white uppercase tracking-tight">{title}</p></div>
    </div>
  );
}