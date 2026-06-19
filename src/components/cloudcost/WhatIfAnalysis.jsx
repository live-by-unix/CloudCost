import React from 'react';
import { TrendingUp } from 'lucide-react';

const multipliers = [
  { value: 2, label: "2x", color: "bg-chart-2/10 text-chart-2 border-chart-2/20" },
  { value: 5, label: "5x", color: "bg-primary/10 text-primary border-primary/20" },
  { value: 10, label: "10x", color: "bg-chart-3/10 text-chart-3 border-chart-3/20" },
  { value: 25, label: "25x", color: "bg-chart-4/10 text-chart-4 border-chart-4/20" },
  { value: 50, label: "50x", color: "bg-chart-5/10 text-chart-5 border-chart-5/20" },
  { value: 100, label: "100x", color: "bg-destructive/10 text-destructive border-destructive/20" },
];

export default function WhatIfAnalysis({ activeMultiplier, onMultiplierChange }) {
  return (
    <section className="mt-12">
      <div className="flex items-center gap-3 mb-4">
        <TrendingUp className="w-5 h-5 text-primary" />
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-heading">What-If Analysis</h2>
          <p className="text-muted-foreground">Simulate traffic growth and see how costs scale</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onMultiplierChange(1)}
          className={`px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
            activeMultiplier === 1
              ? 'bg-foreground text-background border-foreground shadow-lg'
              : 'bg-card border-border hover:border-primary/30 text-foreground'
          }`}
        >
          Base (1x)
        </button>
        {multipliers.map(m => (
          <button
            key={m.value}
            onClick={() => onMultiplierChange(m.value)}
            className={`px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
              activeMultiplier === m.value
                ? `${m.color} shadow-lg`
                : 'bg-card border-border hover:border-primary/30 text-foreground'
            }`}
          >
            {m.label} traffic
          </button>
        ))}
      </div>
      
      {activeMultiplier > 1 && (
        <div className="mt-4 p-3 rounded-xl bg-accent/50 border border-border text-sm">
          <span className="font-medium">Simulating {activeMultiplier}x traffic:</span>{' '}
          <span className="text-muted-foreground">
            Bandwidth, requests, and users multiplied by {activeMultiplier}. 
            All provider costs recalculated in real-time.
          </span>
        </div>
      )}
    </section>
  );
}