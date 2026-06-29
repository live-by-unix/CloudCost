import React from 'react';
import { TrendingDown, DollarSign, Users, CalendarDays } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/formatUtils';
import { calculateTCO } from '@/lib/costEngine';

export default function CostSummaryCards({ results, currency, config }) {
  if (results.length === 0) return null;

  const cheapest = results[0];
  const mostExpensive = results[results.length - 1];
  const avgMonthlyCost = results.reduce((sum, r) => sum + r.costs.monthly, 0) / results.length;
  const savings = mostExpensive.costs.yearly - cheapest.costs.yearly;
  const tco5yr = calculateTCO(cheapest.provider, config, 5);
  const tco5yrTotal = tco5yr[4].cumulative;

  const cards = [
    {
      label: "Cheapest Monthly",
      value: formatCurrency(cheapest.costs.monthly, currency),
      sub: cheapest.provider.name,
      icon: TrendingDown,
      accent: "from-chart-2/20 to-chart-2/5"
    },
    {
      label: "Average Monthly",
      value: formatCurrency(avgMonthlyCost, currency),
      sub: `Across ${results.length} providers`,
      icon: DollarSign,
      accent: "from-primary/20 to-primary/5"
    },
    {
      label: "Max Annual Savings",
      value: formatCurrency(savings, currency),
      sub: `vs ${mostExpensive.provider.name}`,
      icon: TrendingDown,
      accent: "from-chart-3/20 to-chart-3/5"
    },
    {
      label: "5-Year TCO",
      value: formatCurrency(tco5yrTotal, currency),
      sub: `on ${cheapest.provider.name}`,
      icon: CalendarDays,
      accent: "from-chart-5/20 to-chart-5/5"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`relative p-4 md:p-5 rounded-2xl border border-border bg-gradient-to-br ${card.accent} overflow-hidden`}
        >
          <card.icon className="absolute top-3 right-3 w-8 h-8 text-foreground/5" />
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{card.label}</p>
          <p className="text-xl md:text-2xl font-bold font-mono mt-1">{card.value}</p>
          <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
        </div>
      ))}
    </div>
  );
}