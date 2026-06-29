import React from 'react';
import { Cloud, DollarSign, Globe, LayoutGrid } from 'lucide-react';

export default function StatsBar({ providerCount, currencyCount, regionCount, presetCount }) {
  const stats = [
    { icon: Cloud, value: providerCount, label: "Providers", color: "text-primary" },
    { icon: DollarSign, value: currencyCount, label: "Currencies", color: "text-chart-2" },
    { icon: Globe, value: regionCount, label: "Regions", color: "text-chart-3" },
    { icon: LayoutGrid, value: presetCount, label: "Presets", color: "text-chart-5" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="flex items-center gap-3 p-3 md:p-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
          <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color} shrink-0`} />
          <div className="min-w-0">
            <p className="text-lg md:text-2xl font-bold font-mono leading-none">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}