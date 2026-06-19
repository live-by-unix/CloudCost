import React, { useState } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency } from '@/lib/formatUtils';

const COLORS = [
  'hsl(245, 58%, 51%)', 'hsl(160, 60%, 45%)', 'hsl(30, 80%, 55%)',
  'hsl(340, 75%, 55%)', 'hsl(200, 70%, 50%)', 'hsl(280, 65%, 60%)',
  'hsl(50, 80%, 50%)', 'hsl(120, 50%, 40%)', 'hsl(0, 70%, 55%)',
  'hsl(180, 55%, 45%)', 'hsl(220, 60%, 55%)', 'hsl(100, 45%, 50%)',
  'hsl(310, 60%, 50%)'
];

function CustomTooltip({ active, payload, label, currency }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-lg shadow-xl p-3 text-sm">
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-muted-foreground">
          <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: p.color }} />
          {p.name}: {formatCurrency(p.value, currency)}
        </p>
      ))}
    </div>
  );
}

function ProviderCostBar({ results, currency }) {
  const data = results.slice(0, 10).map(r => ({
    name: r.provider.name,
    monthly: r.costs.monthly,
    color: r.provider.color
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="name" angle={-30} textAnchor="end" fontSize={11} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
        <YAxis fontSize={11} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
        <Tooltip content={<CustomTooltip currency={currency} />} />
        <Bar dataKey="monthly" name="Monthly Cost" radius={[4, 4, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function MonthlyVsYearly({ results, currency }) {
  const data = results.slice(0, 8).map(r => ({
    name: r.provider.name,
    monthly: r.costs.monthly,
    yearly: r.costs.yearly / 12
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="name" angle={-30} textAnchor="end" fontSize={11} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
        <YAxis fontSize={11} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
        <Tooltip content={<CustomTooltip currency={currency} />} />
        <Legend />
        <Bar dataKey="monthly" name="Monthly" fill="hsl(245, 58%, 51%)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="yearly" name="Yearly (avg/mo)" fill="hsl(160, 60%, 45%)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function CostBreakdownPie({ results, currency }) {
  const cheapest = results[0];
  if (!cheapest) return null;

  const data = [
    { name: "Compute", value: cheapest.costs.compute },
    { name: "Storage", value: cheapest.costs.storage },
    { name: "Bandwidth", value: cheapest.costs.bandwidth },
    { name: "Database", value: cheapest.costs.database },
    { name: "Requests", value: cheapest.costs.requests },
    { name: "Platform", value: cheapest.costs.platformFee }
  ].filter(d => d.value > 0);

  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground mb-2">Cost breakdown for {cheapest.provider.name} (cheapest)</p>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={110} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip content={<CustomTooltip currency={currency} />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function ScalingProjection({ results, currency }) {
  const top5 = results.slice(0, 5);
  const multipliers = [1, 2, 5, 10, 25, 50];
  
  const data = multipliers.map(m => {
    const point = { name: `${m}x` };
    top5.forEach(r => {
      point[r.provider.name] = r.costs.monthly * m;
    });
    return point;
  });

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="name" fontSize={11} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
        <YAxis fontSize={11} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
        <Tooltip content={<CustomTooltip currency={currency} />} />
        <Legend />
        {top5.map((r, i) => (
          <Line key={r.provider.id} type="monotone" dataKey={r.provider.name} stroke={r.provider.color} strokeWidth={2} dot={{ r: 3 }} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

function TrafficGrowth({ results, currency }) {
  const top5 = results.slice(0, 5);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  
  const data = months.map(m => {
    const growthFactor = 1 + (m - 1) * 0.15;
    const point = { name: `Month ${m}` };
    top5.forEach(r => {
      point[r.provider.name] = r.costs.monthly * growthFactor;
    });
    return point;
  });

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="name" fontSize={11} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
        <YAxis fontSize={11} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
        <Tooltip content={<CustomTooltip currency={currency} />} />
        <Legend />
        {top5.map((r, i) => (
          <Area key={r.provider.id} type="monotone" dataKey={r.provider.name} stroke={r.provider.color} fill={r.provider.color} fillOpacity={0.1} strokeWidth={2} />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default function CostCharts({ results, currency }) {
  const [activeChart, setActiveChart] = useState("bar");

  const charts = {
    bar: { label: "Cost Comparison", component: <ProviderCostBar results={results} currency={currency} /> },
    grouped: { label: "Monthly vs Yearly", component: <MonthlyVsYearly results={results} currency={currency} /> },
    pie: { label: "Cost Breakdown", component: <CostBreakdownPie results={results} currency={currency} /> },
    line: { label: "Scaling", component: <ScalingProjection results={results} currency={currency} /> },
    area: { label: "Traffic Growth", component: <TrafficGrowth results={results} currency={currency} /> }
  };

  return (
    <section className="mt-12">
      <h2 className="text-2xl md:text-3xl font-bold font-heading mb-6">Visual Analytics</h2>
      
      <div className="rounded-2xl border border-border bg-card shadow-sm p-4 md:p-6">
        <Tabs value={activeChart} onValueChange={setActiveChart}>
          <TabsList className="bg-muted mb-4 flex-wrap h-auto gap-1">
            {Object.entries(charts).map(([key, { label }]) => (
              <TabsTrigger key={key} value={key} className="text-xs sm:text-sm">
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        <div className="w-full">
          {charts[activeChart]?.component}
        </div>
      </div>
    </section>
  );
}