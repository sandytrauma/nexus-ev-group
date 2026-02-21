"use client";

import React from 'react';
import { 
  Zap, ShieldCheck, Rocket, Timer, Award, 
  CheckCircle2, Package, ShieldAlert, BarChart, 
  ArrowRight, Globe, ZapIcon, 
} from 'lucide-react';

export default function IPMarketingPage() {
  return (
    <div className="min-h-screen bg-[#020205] text-white font-sans selection:bg-cyan-500/30">
      
      {/* --- HERO: THE HOOK --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-cyan-400/10 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400">Territory Slots Open: North India 2026</span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85] uppercase">
            THE LOCAL <br/><span className="text-cyan-400">MONOPOLY.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed">
            By 2027, 60% of 2-wheelers in your city will be Electric. Most will fail due to poor parts supply. 
            As a <span className="text-white font-bold">Nexus Partner</span>, you own the supply chain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-cyan-400 text-black px-10 py-5 rounded-full font-black text-xl hover:scale-105 transition-all shadow-[0_0_30px_-5px_#22d3ee]">
              SECURE YOUR ZONE
            </button>
          </div>
        </div>
      </section>

      {/* --- MARKET ANALYSIS --- */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-10 rounded-[2.5rem] border border-red-500/20 bg-red-500/5 backdrop-blur-sm">
            <h3 className="text-red-400 font-bold mb-6 flex items-center gap-2 italic text-xl uppercase tracking-tighter">
              <ShieldAlert size={24}/> The Market Problem
            </h3>
            <ul className="space-y-4 text-slate-300">
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✕</span>
                <p>Mechanics wait 7+ days for specialized EV parts, losing customers daily.</p>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✕</span>
                <p>Generic motors burn out in 45°C+ summers. No reliability.</p>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✕</span>
                <p>No warranty trust in the unorganized spare parts market.</p>
              </li>
            </ul>
          </div>

          <div className="p-10 rounded-[2.5rem] border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm">
            <h3 className="text-emerald-400 font-bold mb-6 flex items-center gap-2 italic text-xl uppercase tracking-tighter">
              <CheckCircle2 size={24}/> The Nexus Solution
            </h3>
            <ul className="space-y-4 text-slate-300">
              <li className="flex gap-3">
                <span className="text-emerald-500 font-bold">✓</span>
                <p><b>24H Delivery:</b> Inventory is pre-stocked in your local Hub.</p>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 font-bold">✓</span>
                <p><b>Alpha Tech:</b> Motors rated for 120°C extreme thermal resistance.</p>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 font-bold">✓</span>
                <p><b>Direct Warranty:</b> SPV-backed 1-year replacement guarantee.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- THE 1.5L VALUE BREAKDOWN --- */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h2 className="text-4xl font-black uppercase tracking-tight">The Asset-Backed Investment</h2>
          <p className="text-slate-500 mt-2 italic font-mono">Total Entry Cost: ₹1,50,000</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Unit Economics */}
          <div className="md:col-span-7 p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[2.5rem]">
            <div className="bg-[#0a0a0f] rounded-[2.4rem] p-10 h-full">
              <h3 className="text-2xl font-bold mb-8 text-cyan-400 uppercase tracking-tighter">Profit Matrix</h3>
              <div className="space-y-6">
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-slate-400">Avg. Profit Per Kit</span>
                  <span className="font-mono font-bold text-xl">₹1,650</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-slate-400">Marketing & Branding Support</span>
                  <span className="font-mono font-bold text-emerald-400 uppercase text-xs">Included</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-slate-400">Estimated Monthly Net</span>
                  <span className="font-mono font-bold text-xl text-cyan-400">₹45,000+</span>
                </div>
                <div className="flex justify-between pt-4">
                  <span className="text-slate-400">Projected Annual ROI</span>
                  <span className="font-mono font-black text-3xl text-emerald-400">360%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Physical Inventory */}
          <div className="md:col-span-5 p-10 rounded-[2.5rem] border border-white/5 bg-white/5 flex flex-col justify-between">
            <div>
              <Package className="text-cyan-400 mb-6" size={32} />
              <h3 className="text-xl font-bold mb-6">Initial "Alpha" Stock</h3>
              <div className="space-y-4 text-sm font-mono text-slate-400">
                <p>• 12x Alpha Motors (1.2kW)</p>
                <p>• 20x Smart Sine-Wave Controllers</p>
                <p>• 40x Heavy Duty Converters</p>
                <p className="text-cyan-400 font-bold">• 500x Mechanic Training Kits</p>
              </div>
            </div>
            <div className="mt-10 p-4 rounded-xl bg-cyan-400/10 border border-cyan-400/20">
              <p className="text-[10px] text-cyan-400 font-black uppercase tracking-widest leading-tight">
                Stock is refreshed monthly via Nexus SPV Logistics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE 12-MONTH ASCENT --- */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="text-4xl font-black mb-16 uppercase italic text-center">The 1-Year Partner Roadmap</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <TimelineStep num="01" title="Deployment" desc="Hub signage installed. Local mechanics onboarded with gear." />
          <TimelineStep num="03" title="Break Even" desc="Initial capital recovered through fast-moving inventory sales." />
          <TimelineStep num="08" title="Market Cap" desc="Your Hub becomes the default supplier for a 5km radius." />
          <TimelineStep num="12" title="Expansion" desc="Option to unlock Territory #2 or join Battery Swap modules." />
        </div>
      </section>

      {/* --- GOVERNANCE & SECURITY --- */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="bg-cyan-400/5 border border-cyan-400/10 p-12 rounded-[3rem]">
          <h2 className="text-3xl font-black mb-6 uppercase italic tracking-widest">Partner Protection Clause</h2>
          <p className="text-slate-400 mb-10 leading-relaxed text-sm max-w-2xl mx-auto">
            We protect our Hubs. Nexus does not sell directly to mechanics in your zone. 
            All regional web orders are automatically routed to your Hub for fulfillment.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-[0.2em]"><Globe size={14}/> Geo-Fenced Territory</div>
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-[0.2em]"><ShieldCheck size={14}/> Asset Buy-Back</div>
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-[0.2em]"><BarChart size={14}/> Price Protection</div>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <footer className="py-32 text-center border-t border-white/5">
        <h2 className="text-5xl font-black mb-6">CLAIM YOUR CITY.</h2>
        <p className="text-slate-500 mb-10">Limited Slots available for NCR Region Q1 2026.</p>
        <button className="flex items-center gap-3 mx-auto bg-white text-black px-12 py-5 rounded-full font-black hover:bg-cyan-400 hover:scale-105 transition-all group">
          BECOME A PARTNER <ArrowRight className="group-hover:translate-x-2 transition-transform" />
        </button>
      </footer>
    </div>
  );
}

function TimelineStep({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="flex flex-col gap-4 p-6 glass-panel border-white/5 hover:border-cyan-400/20 transition-all rounded-[2rem]">
      <div className="w-12 h-12 rounded-full bg-cyan-400/20 flex items-center justify-center font-black text-cyan-400 border border-cyan-400/30">
        {num}
      </div>
      <h4 className="font-black text-xl">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}