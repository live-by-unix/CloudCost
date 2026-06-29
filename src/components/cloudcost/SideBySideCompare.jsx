import React, { useState } from 'react';
import { GitCompare, X, Check, ExternalLink } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import ProviderLogo from './ProviderLogo';
import { formatCurrency } from '@/lib/formatUtils';
import { getProviderMeta, getCategoryLabel } from '@/lib/providerMetadata';

const ROWS = [
  { key: "monthly",     label: "Monthly",     format: "currency" },
  { key: "yearly",      label: "Yearly",      format: "currency" },
  { key: "compute",     label: "Compute",     format: "currency" },
  { key: "gpu",          label: "GPU",         format: "currency" },
  { key: "storage",     label: "Storage",     format: "currency" },
  { key: "bandwidth",   label: "Bandwidth",   format: "currency" },
  { key: "database",    label: "Database",    format: "currency" },
  { key: "costPerUser", label: "Per User",    format: "currency" }
];

const META_ROWS = [
  { key: "category",    label: "Category",    format: "category" },
  { key: "sla",         label: "SLA",         format: "text" },
  { key: "datacenters", label: "Data Centers", format: "number" },
  { key: "founded",     label: "Founded",     format: "number" }
];

export default function SideBySideCompare({ results, currency, onProviderClick }) {
  const [selectedIds, setSelectedIds] = useState([
    results[0]?.provider.id,
    results[1]?.provider.id,
    results[2]?.provider.id
  ].filter(Boolean));

  const selected = selectedIds.map(id => results.find(r => r.provider.id === id)).filter(Boolean);
  const cheapestMonthly = Math.min(...selected.map(r => r.costs.monthly));

  const handleSelect = (slot, id) => {
    setSelectedIds(prev => {
      const next = [...prev];
      if (next[slot] === id) {
        next.splice(slot, 1);
      } else {
        next[slot] = id;
      }
      return next.filter(Boolean);
    });
  };

  const addSlot = () => {
    if (selectedIds.length >= 4) return;
    const available = results.find(r => !selectedIds.includes(r.provider.id));
    if (available) setSelectedIds([...selectedIds, available.provider.id]);
  };

  return (
    <section className="mt-12">
      <div className="flex items-center gap-2 mb-2">
        <GitCompare className="w-6 h-6 text-primary" />
        <h2 className="text-2xl md:text-3xl font-bold font-heading">Side-by-Side Comparison</h2>
      </div>
      <p className="text-muted-foreground mb-6">Select up to 4 providers to compare in detail</p>

      {/* Selector dropdowns */}
      <div className="flex flex-wrap gap-3 mb-6">
        {selectedIds.map((id, i) => (
          <Select key={i} value={id} onValueChange={v => handleSelect(i, v)}>
            <SelectTrigger className="w-48 h-9 text-sm bg-secondary border-border">
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              {results.map(r => (
                <SelectItem key={r.provider.id} value={r.provider.id}>
                  {r.provider.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
        {selectedIds.length < 4 && (
          <Button variant="outline" size="sm" onClick={addSlot} className="h-9">
            + Add provider
          </Button>
        )}
      </div>

      {selected.length === 0 ? (
        <div className="p-8 rounded-2xl border border-dashed border-border text-center text-muted-foreground">
          Select at least one provider to compare.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground sticky left-0 bg-muted/50">
                  Metric
                </th>
                {selected.map(r => (
                  <th key={r.provider.id} className="px-4 py-3 text-center min-w-[140px]">
                    <div
                      className="flex flex-col items-center gap-2 cursor-pointer"
                      onClick={() => onProviderClick(r)}
                    >
                      <ProviderLogo provider={r.provider} size="sm" />
                      <p className="font-semibold text-sm">{r.provider.name}</p>
                      {r.costs.monthly === cheapestMonthly && (
                        <span className="text-xs text-chart-2 font-medium">★ Cheapest</span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(row => (
                <tr key={row.key} className="border-b border-border/50 hover:bg-accent/30">
                  <td className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground sticky left-0 bg-card">
                    {row.label}
                  </td>
                  {selected.map(r => {
                    const val = r.costs[row.key];
                    const isBest = row.key !== "costPerUser" && val === Math.min(...selected.map(s => s.costs[row.key]));
                    return (
                      <td key={r.provider.id} className="px-4 py-3 text-center font-mono">
                        <span className={isBest ? "text-chart-2 font-bold" : "text-foreground"}>
                          {val > 0 ? formatCurrency(val, currency) : "—"}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
              {META_ROWS.map(row => (
                <tr key={row.key} className="border-b border-border/50 hover:bg-accent/30">
                  <td className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground sticky left-0 bg-card">
                    {row.label}
                  </td>
                  {selected.map(r => {
                    const meta = getProviderMeta(r.provider.id);
                    const val = meta[row.key];
                    return (
                      <td key={r.provider.id} className="px-4 py-3 text-center text-sm">
                        {row.format === "category" ? getCategoryLabel(val) : val}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr className="border-b border-border/50 hover:bg-accent/30">
                <td className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground sticky left-0 bg-card">
                  Free Tier
                </td>
                {selected.map(r => (
                  <td key={r.provider.id} className="px-4 py-3 text-center">
                    {r.provider.freeTier?.toLowerCase().includes("always free") ? (
                      <Check className="w-4 h-4 text-chart-2 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-muted-foreground/30 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-accent/30">
                <td className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground sticky left-0 bg-card">
                  Website
                </td>
                {selected.map(r => {
                  const meta = getProviderMeta(r.provider.id);
                  return (
                    <td key={r.provider.id} className="px-4 py-3 text-center">
                      <a
                        href={meta.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        Visit <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}