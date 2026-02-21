"use client";

import React, { useState } from 'react';
import { 
  Zap, ShieldCheck, TrendingUp, Factory, 
  Target, ShieldAlert, BarChart3, Megaphone, Presentation,
  Rocket, Timer, Award, CheckCircle2, Package, Globe, ArrowRight,
  GalleryHorizontal, LayoutGrid
} from 'lucide-react';
import Image from 'next/image';

export default function NexusUnifiedDashboard() {
  const [activeTab, setActiveTab] = useState<'plan' | 'marketing'>('plan');
  const [unitCount, setUnitCount] = useState(25);
  
  const avgKitProfit = 1650; 
  const ipInvestment = 150000;
  const monthlyProfit = unitCount * avgKitProfit;
  const paybackMonths = Math.ceil(ipInvestment / monthlyProfit);

  return (
    <div className="min-h-screen bg-[#020205] text-white p-4 md:p-12 font-sans selection:bg-cyan-500/30">
      
      {/* --- TAB NAVIGATION --- */}
      <div className="max-w-7xl mx-auto mb-10 flex justify-center md:justify-start">
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
      </div>

      <div className="max-w-7xl mx-auto">
        {activeTab === 'plan' ? (
          /* --- BUSINESS PLAN VIEW --- */
          <div className="animate-in fade-in duration-500">
            <header className="mb-10 md:mb-16">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10px] md:text-sm mb-4 uppercase tracking-[0.2em] md:tracking-[0.3em]">
                <Zap size={14} /> <span>Nexus EV Group Hub</span>
              </div>
              <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-none uppercase">
                EXECUTION <br/><span className="text-cyan-400 font-outline">REALITY.</span>
              </h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
              <div className="md:col-span-12 mb-6">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <Presentation className="text-cyan-400" size={20} />
                  <h2 className="text-xl md:text-3xl font-black tracking-widest uppercase">Strategic Business Plan</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <SlideItem phase="01" title="The Fragmentation" desc="Solving the 7-day part delay with 24H localized hubs." meta="Demand: 15k+ Units" />
                  <SlideItem phase="02" title="Nexus-Gold SKU" desc="Proprietary Alpha Motors with 120°C heat resistance." meta="High-Temp Certified" />
                  <SlideItem phase="03" title="Circular Capital" desc="150 hubs self-funded via partner deposits." meta="150 Regional Hubs" />
                  <SlideItem phase="04" title="Lean Operations" desc="Stock moves to IP within 14 days of factory arrival." meta="12.5% SPV Fee" />
                </div>
              </div>

              {/* Profit Calculator */}
              <div className="md:col-span-8 glass-panel p-6 md:p-8 bg-cyan-500/5 border-cyan-500/20 rounded-[1.5rem] md:rounded-[2rem]">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex flex-col">
                    <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight">IP Profit Forecast</h2>
                    <p className="text-[10px] text-slate-500">Live projection based on unit turnover</p>
                  </div>
                  <BarChart3 className="text-cyan-400" />
                </div>
                <div className="space-y-10">
                  <div>
                    <div className="flex flex-col md:flex-row md:justify-between mb-4 gap-2">
                        <span className="text-[10px] md:text-sm text-slate-400 uppercase tracking-widest">Monthly Units Sold</span>
                        <span className="text-xl md:text-2xl font-black text-cyan-400">{unitCount} Units</span>
                    </div>
                    <input 
                        type="range" min="5" max="150" value={unitCount} 
                        onChange={(e) => setUnitCount(parseInt(e.target.value))} 
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400" 
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <StatCard label="Monthly Net" value={`₹${monthlyProfit.toLocaleString()}`} />
                    <StatCard label="Annual ROI" value={`${((monthlyProfit * 12 / ipInvestment) * 100).toFixed(0)}%`} color="text-emerald-400" />
                    <StatCard label="Payback" value={`${paybackMonths} Months`} color="text-cyan-400" />
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 glass-panel p-6 md:p-8 border-white/10 flex flex-col justify-between rounded-[1.5rem] md:rounded-[2rem]">
                <h2 className="text-lg md:text-xl font-bold mb-6 uppercase tracking-tighter">1.5L IP Package</h2>
                <div className="space-y-3 md:space-y-4">
                  <PriceRow label="Stock Inventory" price="₹1.00L" />
                  <PriceRow label="Security Deposit" price="₹0.50L" />
                  <PriceRow label="Total Investment" price="₹1.50L" highlight />
                </div>
                <p className="text-[9px] md:text-[10px] text-slate-500 mt-6 italic font-mono uppercase">Exit Plan: 12 Month Lock // 90 Day Notice</p>
              </div>
            </div>
          </div>
        ) : (
          /* --- MARKETING PAGE VIEW --- */
          <div className="animate-in slide-in-from-right duration-500 pb-20">
            <header className="mb-12 md:mb-16 text-center md:text-left">
              <h1 className="text-4xl md:text-9xl font-black tracking-tighter leading-[0.9] md:leading-[0.85] mb-6 uppercase">
                THE LOCAL <br/><span className="text-cyan-400">MONOPOLY.</span>
              </h1>
              <p className="text-slate-400 text-sm md:text-xl max-w-3xl leading-relaxed mx-auto md:mx-0">
                By 2027, 60% of 2-wheelers in India will be Electric. Most will fail due to poor parts supply. 
                As a **Nexus Partner**, you own the supply chain for your city.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-16">
              <div className="glass-panel p-6 md:p-8 border-red-500/20 bg-red-500/5 rounded-2xl md:rounded-3xl">
                <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2 italic uppercase tracking-tighter text-sm md:text-base">
                  <ShieldAlert size={18}/> The Problem
                </h3>
                <ul className="space-y-3 text-[12px] md:text-sm text-slate-400 font-medium">
                  <li>• Mechanics wait 7+ days for specialized EV parts.</li>
                  <li>• Motors burn out in 45°C summers due to low-grade build.</li>
                  <li>• No brand trust in the unorganized spare parts market.</li>
                </ul>
              </div>
              <div className="glass-panel p-6 md:p-8 border-emerald-500/20 bg-emerald-500/5 rounded-2xl md:rounded-3xl">
                <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2 italic uppercase tracking-tighter text-sm md:text-base">
                  <CheckCircle2 size={18}/> The Nexus Solution
                </h3>
                <ul className="space-y-3 text-[12px] md:text-sm text-slate-400 font-medium">
                  <li>• **24H Delivery:** Parts are pre-stocked in your Hub.</li>
                  <li>• **Thermal Tech:** Motors rated for 120°C extreme heat.</li>
                  <li>• **Guaranteed:** SPV-backed 1-year replacement warranty.</li>
                </ul>
              </div>
            </div>

            <div className="glass-panel p-6 md:p-10 bg-cyan-400/5 border-cyan-400/20 rounded-[2rem] md:rounded-[3rem] mb-12 md:mb-16">
              <h2 className="text-xl md:text-3xl font-black mb-10 md:mb-12 italic uppercase tracking-widest flex items-center gap-3">
                <Rocket className="text-cyan-400" /> The 365-Day Ascent
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <TimelineStep num="01" title="Deployment" desc="Hub signage installed. Local mechanics onboarded with gear." />
                <TimelineStep num="02" title="Market Fit" desc="First 50 Alpha-kits deployed. Mechanics become your sales force." />
                <TimelineStep num="06" title="Payback" desc="Initial capital recovered. Monthly net shifts to profit." />
                <TimelineStep num="12" title="Expansion" desc="Control 40% of local trade. Ready to unlock Hub #2." />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-12 md:mb-16">
              <div className="md:col-span-7 glass-panel p-6 md:p-8 border-white/5 rounded-2xl md:rounded-3xl">
                <h3 className="text-lg md:text-xl font-bold mb-6 text-cyan-400 uppercase tracking-tighter">IP Economics (Example)</h3>
                <div className="space-y-4 font-mono text-xs md:text-sm">
                  <div className="flex justify-between pb-2 border-b border-white/5">
                    <span className="text-slate-500">Avg Profit / Unit</span>
                    <span className="text-white">₹1,650</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-white/5">
                    <span className="text-slate-500">Monthly Units</span>
                    <span className="text-white">30 - 50</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-white/5">
                    <span className="text-slate-500">Annual Net Profit</span>
                    <span className="text-emerald-400 font-bold">₹5.9L - ₹9.8L</span>
                  </div>
                  <div className="pt-4 flex items-center gap-2 text-[9px] md:text-[10px] text-slate-500 italic uppercase">
                    <ShieldCheck size={12} /> SPV Funds all local marketing & lead gen
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 glass-panel p-6 md:p-8 bg-white/5 rounded-2xl md:rounded-3xl">
                <h3 className="text-lg md:text-xl font-bold mb-6 uppercase flex items-center gap-2">
                  <Package className="text-cyan-400" /> Initial Stock
                </h3>
                <div className="space-y-3 text-[10px] md:text-xs text-slate-400">
                  <div className="flex justify-between"><span>Alpha Motors</span><span className="text-white">12 Units</span></div>
                  <div className="flex justify-between"><span>Controllers</span><span className="text-white">20 Units</span></div>
                  <div className="flex justify-between"><span>Converters</span><span className="text-white">40 Units</span></div>
                  <div className="flex justify-between font-bold text-cyan-400 pt-2 border-t border-white/10"><span>Mechanic Kits</span><span>Full Set</span></div>
                </div>
              </div>
            </div>

            {/* GALLERY SECTION */}
            <section className="max-w-7xl mx-auto py-10 md:py-20">
                <h2 className="text-2xl md:text-4xl font-black mb-8 md:mb-12 uppercase italic text-center flex items-center justify-center gap-3">
                    <LayoutGrid className="text-cyan-400" size={24} /> See What You Get.
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <GalleryItem src="/images/alpha-motor-hero.png" title="Alpha Motor (1.2kW)" />
                    <GalleryItem src="/images/sine-wave-controller.png" title="Sine-Wave Controller" />
                    <GalleryItem src="/images/dc-convertor.png" title="Heavy Duty DC Converter" />
                    <GalleryItem src="/images/partner-starter-kit.png" title="Branded Mechanic Kit" />
                </div>
            </section>

            {/* Territory Trust */}
            <div className="text-center bg-white/[0.02] p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/10">
              <h2 className="text-xl md:text-2xl font-black mb-4 uppercase italic">Territory Protection</h2>
              <p className="text-slate-400 max-w-2xl mx-auto mb-8 md:mb-10 text-[12px] md:text-sm leading-relaxed">
                We protect our IPs. Every territory is geo-fenced. All local orders are routed to your Hub for a 10% fulfillment commission.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-cyan-400 uppercase tracking-widest"><Globe size={14}/> Geo-Fenced Zone</div>
                <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-cyan-400 uppercase tracking-widest"><ShieldCheck size={14}/> Asset Buy-Back</div>
                <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-cyan-400 uppercase tracking-widest"><Target size={14}/> Lead Routing</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* --- REFACTORED SUB-COMPONENTS FOR BETTER RESPONSIVENESS --- */

function GalleryItem({ src, title }: { src: string, title: string }) {
  return (
    <div className="relative group rounded-xl overflow-hidden aspect-video md:aspect-square lg:aspect-video">
      <Image
        src={src}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        className="object-cover group-hover:scale-105 transition-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end p-4">
        <p className="text-[10px] md:text-xs font-bold text-white uppercase tracking-tight">{title}</p>
      </div>
    </div>
  );
}

function TimelineStep({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="flex flex-col gap-3 group">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-cyan-400/20 flex items-center justify-center font-black text-cyan-400 border border-cyan-400/30 group-hover:scale-110 transition-transform text-sm md:text-base">
        {num}
      </div>
      <h4 className="font-black text-lg md:text-xl text-white">{title}</h4>
      <p className="text-[12px] md:text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function SlideItem({ phase, title, desc, meta }: any) {
  return (
    <div className="glass-panel p-5 md:p-6 border-white/5 bg-white/5 min-h-[180px] md:min-h-[220px] flex flex-col rounded-2xl">
      <span className="text-cyan-400 font-mono text-[9px] md:text-[10px] mb-2 uppercase">{phase} // Strategy</span>
      <h3 className="text-base md:text-lg font-bold mb-3 italic underline decoration-cyan-400/50 underline-offset-4">{title}</h3>
      <p className="text-[11px] md:text-xs text-slate-400 leading-relaxed">{desc}</p>
      <div className="mt-auto pt-4 flex items-center gap-2 text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest">
        <Target size={12}/> {meta}
      </div>
    </div>
  );
}

function StatCard({ label, value, color = "text-white" }: any) {
  return (
    <div className="p-4 md:p-6 bg-black/40 rounded-2xl border border-white/5">
      <p className="text-[9px] md:text-[10px] text-slate-500 uppercase mb-1 tracking-widest">{label}</p>
      <p className={`text-xl md:text-3xl font-black ${color}`}>{value}</p>
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