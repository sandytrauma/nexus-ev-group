"use client";

import React, { useState } from 'react';
import { 
  Zap, ShieldCheck, Rocket, Target, Lightbulb, 
  CheckCircle2, Package, ShieldAlert, BarChart3, 
  ArrowRight, Globe, Info, IndianRupee, TrendingUp,
  Cpu, MousePointer2, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function IPMarketingPage() {
  const [calcUnits, setCalcUnits] = useState(25);
  const marginPerUnit = 1650;
  const monthlyProfit = calcUnits * marginPerUnit;

  return (
    <div className="min-h-screen bg-[#020205] text-white font-sans selection:bg-cyan-400/30 pb-20">
      
      {/* --- FLOATING NAV --- */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl px-6 py-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center text-black">
            <Zap size={18} fill="currentColor" />
          </div>
          <span className="font-black tracking-tighter text-xl"><Link href="/">NEXUS</Link><span className="text-cyan-400">EV</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <a href="#problem" className="hover:text-cyan-400 transition-colors">The Gap</a>
          <a href="#investment" className="hover:text-cyan-400 transition-colors">ROI Matrix</a>
          <a href="#roadmap" className="hover:text-cyan-400 transition-colors">12-Month Plan</a>
        </div>
        <button className="bg-cyan-400 text-black px-6 py-2 rounded-full text-[10px] font-black hover:scale-105 transition-all">
          APPLY NOW
        </button>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-cyan-500/10 blur-[140px] rounded-full -z-10" />
        
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 mb-8 animate-bounce">
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-cyan-400">EARLY ADOPTER SLOTS: 04 LEFT IN NCR</span>
          </div>
          
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter mb-8 leading-[0.8] uppercase italic">
            OWN THE <br/><span className="text-cyan-400 font-outline">ROADS.</span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed">
            Stop chasing customers. Start supplying the mechanics who serve them. 
            Invest <span className="text-white font-bold">₹1.50L</span> to become the exclusive EV Hub for your 5km radius.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-20 border-t border-white/10 pt-10">
            <Stat label="Thermal Rating" val="120°C" />
            <Stat label="Buy-Back" val="85%" />
            <Stat label="Delivery" val="< 24H" />
            <Stat label="ROI" val="211%+" />
          </div>
        </div>
      </section>

      {/* --- THE INTERACTIVE CALCULATOR --- */}
      <section id="investment" className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 leading-tight">Your Profit <br/><span className="text-cyan-400">Engine.</span></h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Unlike stock markets, this is physical utility. You hold the inventory that keeps your city moving. Adjust the slider to see your monthly potential.
            </p>
            
            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
              <div className="flex justify-between mb-4">
                <span className="text-sm font-bold uppercase text-slate-500">Kits Sold Per Month</span>
                <span className="text-2xl font-black text-cyan-400">{calcUnits}</span>
              </div>
              <input 
                type="range" min="5" max="100" value={calcUnits} 
                onChange={(e) => setCalcUnits(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 mb-8"
              />
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Margin per kit</span>
                  <span className="font-mono">₹1,650</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-white/10">
                  <span className="font-bold uppercase tracking-tighter">Monthly Net Profit</span>
                  <span className="text-3xl font-black text-emerald-400">₹{monthlyProfit.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FeatureCard 
              icon={<Package className="text-cyan-400" />}
              title="Asset-Backed"
              desc="₹1 Lakh of your investment is locked in high-demand physical inventory."
            />
            <FeatureCard 
              icon={<TrendingUp className="text-cyan-400" />}
              title="Zero Marketing"
              desc="Nexus routes all local web leads and repair inquiries directly to your Hub."
            />
            <FeatureCard 
              icon={<Cpu className="text-cyan-400" />}
              title="Alpha Tech"
              desc="Exclusive rights to sell High-Thermal motors designed for Indian summers."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-cyan-400" />}
              title="Locked Zones"
              desc="No other Nexus partner can be onboarded within your 5km Geo-Fence."
            />
          </div>
        </div>
      </section>

      {/* --- THE INVENTORY VISUALIZER --- */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-white/5 rounded-[3rem] border border-white/10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black uppercase">What's inside the ₹1.5L Kit?</h2>
          <p className="text-slate-500 mt-2">Professional Grade EV fulfillment hardware</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <InventoryItem title="12x Alpha Motors" specs="1.2kW / IP67 / 120°C" color="cyan" />
          <InventoryItem title="20x Controllers" specs="Smart Sine-Wave / 48-60V" color="white" />
          <InventoryItem title="Training Collateral" specs="500x Kits for Local Mechanics" color="emerald" />
        </div>
      </section>

      {/* --- STEP BY STEP --- */}
      <section id="roadmap" className="max-w-7xl mx-auto px-6 py-32">
        <h2 className="text-4xl font-black mb-16 text-center italic uppercase">The Path to ROI</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <Step num="1" title="Zone Audit" desc="We verify your storage space (100sqft) and local mechanic density." />
          <Step num="2" title="Deployment" desc="Stock arrives. Your Hub goes live on our 'Nexus-Nearby' App." />
          <Step num="3" title="Velocity" desc="First 10 kits sold. Capital starts churning. Weekly restocking begins." />
          <Step num="4" title="Monopoly" desc="Local mechanics rely solely on your 24-hour part fulfillment." />
        </div>
      </section>

      {/* --- FINAL ACTION --- */}
      <section className="max-w-4xl mx-auto px-6 text-center py-20 border-t border-white/10">
        <h2 className="text-5xl md:text-7xl font-black uppercase mb-8">Ready to <br/><span className="text-cyan-400">Scale?</span></h2>
        <p className="text-slate-500 mb-12">Don't wait for your competitor to own your pincode.</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="bg-white text-black px-12 py-5 rounded-full font-black text-lg hover:bg-cyan-400 transition-all flex items-center justify-center gap-2">
            RESERVE MY TERRITORY <ArrowRight size={20} />
          </button>
          <button className="bg-white/5 border border-white/10 px-12 py-5 rounded-full font-black text-lg hover:bg-white/10 transition-all">
            DOWNLOAD FULL CATALOG
          </button>
        </div>
      </section>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function Stat({ label, val }: { label: string, val: string }) {
  return (
    <div className="text-center">
      <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">{label}</p>
      <p className="text-2xl font-black text-white">{val}</p>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all group">
      <div className="mb-4 group-hover:scale-110 transition-transform">{icon}</div>
      <h4 className="text-lg font-bold mb-2 uppercase tracking-tight">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function InventoryItem({ title, specs, color }: any) {
  return (
    <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 text-center">
      <div className={`w-12 h-12 mx-auto rounded-xl mb-4 flex items-center justify-center ${color === 'cyan' ? 'bg-cyan-400/20 text-cyan-400' : 'bg-white/10 text-white'}`}>
        <Package size={24} />
      </div>
      <h4 className="font-bold mb-1">{title}</h4>
      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{specs}</p>
    </div>
  );
}

function Step({ num, title, desc }: any) {
  return (
    <div className="flex-1 p-8 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden group">
      <span className="absolute -right-4 -top-8 text-[8rem] font-black text-white/[0.03] group-hover:text-cyan-400/[0.05] transition-colors">{num}</span>
      <h4 className="text-xl font-black mb-4 uppercase italic">Phase {num}</h4>
      <p className="text-sm text-slate-500 leading-relaxed relative z-10">{desc}</p>
    </div>
  );
}