"use client";

import React, { useState } from 'react';
import { 
  Zap, ShieldCheck, TrendingUp, Factory, 
  Target, ShieldAlert, BarChart3, Megaphone, Presentation,
  Rocket, Timer, Award, CheckCircle2, Package, Globe, ArrowRight
} from 'lucide-react';

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
        <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 w-fit backdrop-blur-xl">
          <button 
            onClick={() => setActiveTab('plan')}
            className={`px-8 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'plan' ? 'bg-cyan-400 text-black shadow-[0_0_20px_-5px_#22d3ee]' : 'text-slate-400 hover:text-white'}`}
          >
            BUSINESS PLAN
          </button>
          <button 
            onClick={() => setActiveTab('marketing')}
            className={`px-8 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'marketing' ? 'bg-cyan-400 text-black shadow-[0_0_20px_-5px_#22d3ee]' : 'text-slate-400 hover:text-white'}`}
          >
            MARKETING PAGE
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {activeTab === 'plan' ? (
          /* --- BUSINESS PLAN VIEW (INTACT) --- */
          <div className="animate-in fade-in duration-500">
            <header className="mb-16">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm mb-4 uppercase tracking-[0.3em]">
                <Zap size={14} /> <span>Nexus EV Group Hub</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none uppercase">
                EXECUTION <br/><span className="text-cyan-400 font-outline">REALITY.</span>
              </h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-12 mb-6">
                <div className="flex items-center gap-3 mb-8">
                  <Presentation className="text-cyan-400" />
                  <h2 className="text-3xl font-black tracking-widest uppercase">Strategic Business Plan</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <SlideItem phase="01" title="The Fragmentation" desc="Solving the 7-day part delay with 24H localized hubs." meta="Demand: 15k+ Units" />
                  <SlideItem phase="02" title="Nexus-Gold SKU" desc="Proprietary Alpha Motors with 120°C heat resistance." meta="High-Temp Certified" />
                  <SlideItem phase="03" title="Circular Capital" desc="150 hubs self-funded via partner deposits." meta="150 Regional Hubs" />
                  <SlideItem phase="04" title="Lean Operations" desc="Stock moves to IP within 14 days of factory arrival." meta="12.5% SPV Fee" />
                </div>
              </div>

              <div className="md:col-span-8 glass-panel p-8 bg-cyan-500/5 border-cyan-500/20 rounded-[2rem]">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-bold uppercase tracking-tight">IP Profit Forecast</h2>
                    <p className="text-xs text-slate-500">Live projection based on unit turnover</p>
                  </div>
                  <BarChart3 className="text-cyan-400" />
                </div>
                <div className="space-y-10">
                  <div>
                    <div className="flex justify-between mb-4">
                        <span className="text-sm text-slate-400 uppercase tracking-widest">Monthly Units Sold</span>
                        <span className="text-2xl font-black text-cyan-400">{unitCount} Units</span>
                    </div>
                    <input 
                        type="range" min="5" max="150" value={unitCount} 
                        onChange={(e) => setUnitCount(parseInt(e.target.value))} 
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400" 
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard label="Monthly Net" value={`₹${monthlyProfit.toLocaleString()}`} />
                    <StatCard label="Annual ROI" value={`${((monthlyProfit * 12 / ipInvestment) * 100).toFixed(0)}%`} color="text-emerald-400" />
                    <StatCard label="Payback" value={`${paybackMonths} Months`} color="text-cyan-400" />
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 glass-panel p-8 border-white/10 flex flex-col justify-between rounded-[2rem]">
                <h2 className="text-xl font-bold mb-6 uppercase tracking-tighter">1.5L IP Package</h2>
                <div className="space-y-4">
                  <PriceRow label="Stock Inventory" price="₹1.00L" />
                  <PriceRow label="Security Deposit" price="₹0.50L" />
                  <PriceRow label="Total Investment" price="₹1.50L" highlight />
                </div>
                <p className="text-[10px] text-slate-500 mt-6 italic font-mono uppercase">Exit Plan: 12 Month Lock // 90 Day Notice</p>
              </div>
            </div>
          </div>
        ) : (
          /* --- ENHANCED MARKETING VIEW --- */
          <div className="animate-in slide-in-from-right duration-500 pb-20">
            <header className="mb-16 text-center md:text-left">
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-6 uppercase">
                THE LOCAL <br/><span className="text-cyan-400">MONOPOLY.</span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-3xl leading-relaxed">
                By 2027, 60% of 2-wheelers in India will be Electric. Most will fail due to poor parts supply. 
                As a **Nexus Partner**, you own the supply chain for your city.
              </p>
            </header>

            {/* Market Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <div className="glass-panel p-8 border-red-500/20 bg-red-500/5 rounded-3xl">
                <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2 italic uppercase tracking-tighter">
                  <ShieldAlert size={20}/> The Problem
                </h3>
                <ul className="space-y-3 text-sm text-slate-400 font-medium">
                  <li>• Mechanics wait 7+ days for specialized EV parts.</li>
                  <li>• Motors burn out in 45°C summers due to low-grade build.</li>
                  <li>• No brand trust in the unorganized spare parts market.</li>
                </ul>
              </div>
              <div className="glass-panel p-8 border-emerald-500/20 bg-emerald-500/5 rounded-3xl">
                <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2 italic uppercase tracking-tighter">
                  <CheckCircle2 size={20}/> The Nexus Solution
                </h3>
                <ul className="space-y-3 text-sm text-slate-400 font-medium">
                  <li>• **24H Delivery:** Parts are pre-stocked in your Hub.</li>
                  <li>• **Thermal Tech:** Motors rated for 120°C extreme heat.</li>
                  <li>• **Guaranteed:** SPV-backed 1-year replacement warranty.</li>
                </ul>
              </div>
            </div>

            {/* 1-Year Roadmap */}
            <div className="glass-panel p-10 bg-cyan-400/5 border-cyan-400/20 rounded-[3rem] mb-16">
              <h2 className="text-3xl font-black mb-12 italic uppercase tracking-widest flex items-center gap-3">
                <Rocket className="text-cyan-400" /> The 365-Day Ascent
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <TimelineStep num="01" title="Deployment" desc="Hub signage installed. Local mechanics onboarded with Nexus gear." />
                <TimelineStep num="02" title="Market Fit" desc="First 50 Alpha-kits deployed. Mechanics become your sales force." />
                <TimelineStep num="06" title="Payback" desc="Initial capital recovered. Monthly net shifts to 100% pure profit." />
                <TimelineStep num="12" title="Expansion" desc="Control 40% of local trade. Ready to unlock Hub #2." />
              </div>
            </div>

            {/* Detailed Economics & Inventory */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
              <div className="md:col-span-7 glass-panel p-8 border-white/5 rounded-3xl">
                <h3 className="text-xl font-bold mb-6 text-cyan-400 uppercase tracking-tighter">IP Economics (Example)</h3>
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex justify-between pb-2 border-b border-white/5">
                    <span className="text-slate-500">Average Profit / Unit</span>
                    <span className="text-white">₹1,650</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-white/5">
                    <span className="text-slate-500">Projected Monthly Units</span>
                    <span className="text-white">30 - 50</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-white/5">
                    <span className="text-slate-500">Annual Net Profit</span>
                    <span className="text-emerald-400 font-bold">₹5.9L - ₹9.8L</span>
                  </div>
                  <div className="pt-4 flex items-center gap-2 text-[10px] text-slate-500 italic uppercase">
                    <ShieldCheck size={12} /> SPV Funds all local marketing & lead generation
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 glass-panel p-8 bg-white/5 rounded-3xl">
                <h3 className="text-xl font-bold mb-6 uppercase flex items-center gap-2">
                  <Package className="text-cyan-400" /> Initial Stock
                </h3>
                <div className="space-y-3 text-xs text-slate-400">
                  <div className="flex justify-between"><span>Alpha Motors (1.2kW)</span><span className="text-white">12 Units</span></div>
                  <div className="flex justify-between"><span>Sine-Wave Controllers</span><span className="text-white">20 Units</span></div>
                  <div className="flex justify-between"><span>Heavy Duty Converters</span><span className="text-white">40 Units</span></div>
                  <div className="flex justify-between font-bold text-cyan-400 pt-2 border-t border-white/10"><span>Mechanic Marketing Kits</span><span>Full Set</span></div>
                </div>
              </div>
            </div>

            {/* Territory Trust */}
            <div className="text-center bg-white/[0.02] p-12 rounded-[3rem] border border-white/10">
              <h2 className="text-2xl font-black mb-4 uppercase italic">Territory Protection</h2>
              <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-sm leading-relaxed">
                We protect our IPs. Every territory is geo-fenced. We do not sell directly to customers in your zone; 
                all local orders are routed to your Hub for a 10% fulfillment commission.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-2 text-[10px] font-bold text-cyan-400 uppercase tracking-widest"><Globe size={14}/> Geo-Fenced Zone</div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-cyan-400 uppercase tracking-widest"><ShieldCheck size={14}/> Asset Buy-Back</div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-cyan-400 uppercase tracking-widest"><Target size={14}/> Lead Routing</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* --- SUB-COMPONENTS --- */

function TimelineStep({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="flex flex-col gap-4 group">
      <div className="w-12 h-12 rounded-full bg-cyan-400/20 flex items-center justify-center font-black text-cyan-400 border border-cyan-400/30 group-hover:scale-110 transition-transform">
        {num}
      </div>
      <h4 className="font-black text-xl text-white">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function SlideItem({ phase, title, desc, meta }: any) {
  return (
    <div className="glass-panel p-6 border-white/5 bg-white/5 min-h-[220px] flex flex-col rounded-2xl">
      <span className="text-cyan-400 font-mono text-[10px] mb-2 uppercase">{phase} // Strategy</span>
      <h3 className="text-lg font-bold mb-3 italic underline decoration-cyan-400/50 underline-offset-4">{title}</h3>
      <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
      <div className="mt-auto pt-4 flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
        <Target size={12}/> {meta}
      </div>
    </div>
  );
}

function StatCard({ label, value, color = "text-white" }: any) {
  return (
    <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
      <p className="text-[10px] text-slate-500 uppercase mb-1 tracking-widest">{label}</p>
      <p className={`text-3xl font-black ${color}`}>{value}</p>
    </div>
  );
}

function PriceRow({ label, price, highlight }: any) {
  return (
    <div className={`flex justify-between items-center p-4 rounded-xl ${highlight ? 'bg-cyan-400/10 border border-cyan-400/20' : 'bg-white/5'}`}>
      <span className={`text-sm ${highlight ? 'text-cyan-400 font-bold text-[10px] uppercase' : 'text-slate-400'}`}>{label}</span>
      <span className={`font-bold font-mono ${highlight ? 'text-cyan-400 text-lg' : ''}`}>{price}</span>
    </div>
  );
}

function MarketingFeature({ icon, title, desc }: any) {
  return (
    <div className="glass-panel p-8 border-white/5 bg-white/5 hover:border-cyan-400/20 transition-all rounded-[2rem]">
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-bold mb-4 italic tracking-tight">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}