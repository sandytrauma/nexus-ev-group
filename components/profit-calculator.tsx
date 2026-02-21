"use client";

import React, { useState } from 'react';

export default function ProfitCalculator() {
  const [salesPerMonth, setSalesPerMonth] = useState(20);
  
  // Logic based on our established Unit Economics (Avg profit of ₹1,450 per kit)
  const avgProfitPerUnit = 1450;
  const investment = 150000;
  const monthlyProfit = salesPerMonth * avgProfitPerUnit;
  const annualProfit = monthlyProfit * 12;
  const roi = ((annualProfit / investment) * 100).toFixed(0);

  return (
    <div className="glass-card p-8 border-cyan-500/30 bg-cyan-500/5">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400">IP Earnings Forecast</h3>
      
      <div className="space-y-8">
        <div>
          <label className="block text-sm text-slate-400 mb-4 uppercase tracking-widest">
            Estimated Units Sold Per Month: <span className="text-white font-bold text-xl">{salesPerMonth}</span>
          </label>
          <input 
            type="range" 
            min="5" 
            max="100" 
            value={salesPerMonth} 
            onChange={(e) => setSalesPerMonth(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
            <p className="text-xs text-slate-500 uppercase">Monthly Income</p>
            <p className="text-2xl font-black text-white">₹{monthlyProfit.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
            <p className="text-xs text-slate-500 uppercase">Annual ROI</p>
            <p className="text-2xl font-black text-emerald-400">{roi}%</p>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 text-center">
          <p className="text-sm text-slate-400">
            Payback Period: <span className="text-white font-bold">~{Math.ceil(investment / monthlyProfit)} Months</span>
          </p>
        </div>
      </div>
    </div>
  );
}