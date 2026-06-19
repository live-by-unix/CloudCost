import React, { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Search, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import ProviderLogo from './ProviderLogo';
import { formatCurrency } from '@/lib/formatUtils';

export default function ComparisonTable({ results, currency, onProviderClick }) {
  const [sortKey, setSortKey] = useState("monthly");
  const [sortDir, setSortDir] = useState("asc");
  const [search, setSearch] = useState("");

  const sorted = useMemo(() => {
    let filtered = results.filter(r =>
      r.provider.name.toLowerCase().includes(search.toLowerCase())
    );

    return filtered.sort((a, b) => {
      let aVal, bVal;
      switch (sortKey) {
        case "name": aVal = a.provider.name; bVal = b.provider.name; break;
        case "monthly": aVal = a.costs.monthly; bVal = b.costs.monthly; break;
        case "yearly": aVal = a.costs.yearly; bVal = b.costs.yearly; break;
        case "compute": aVal = a.costs.compute; bVal = b.costs.compute; break;
        case "storage": aVal = a.costs.storage; bVal = b.costs.storage; break;
        case "bandwidth": aVal = a.costs.bandwidth; bVal = b.costs.bandwidth; break;
        case "database": aVal = a.costs.database; bVal = b.costs.database; break;
        default: aVal = a.costs.monthly; bVal = b.costs.monthly;
      }
      if (typeof aVal === "string") return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      return sortDir === "asc" ? aVal - bVal : bVal - aVal;
    });
  }, [results, sortKey, sortDir, search]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(d => d === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <ArrowUpDown className="w-3 h-3 text-muted-foreground/50" />;
    return sortDir === "asc" ? <ArrowUp className="w-3 h-3 text-primary" /> : <ArrowDown className="w-3 h-3 text-primary" />;
  };

  const columns = [
    { key: "name", label: "Provider" },
    { key: "monthly", label: "Monthly" },
    { key: "yearly", label: "Yearly" },
    { key: "compute", label: "Compute" },
    { key: "storage", label: "Storage" },
    { key: "bandwidth", label: "Bandwidth" },
    { key: "database", label: "Database" },
  ];

  return (
    <section id="comparison" className="mt-12 scroll-mt-20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-heading">Provider Comparison</h2>
          <p className="text-muted-foreground mt-1">{sorted.length} providers sorted by {sortKey}</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search providers..."
            className="pl-9 w-64 h-9 bg-secondary border-border"
          />
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {columns.map(col => (
                <th key={col.key} className="sticky top-0 bg-muted/50 backdrop-blur-sm">
                  <button
                    onClick={() => handleSort(col.key)}
                    className="flex items-center gap-1.5 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors w-full"
                  >
                    {col.label}
                    <SortIcon col={col.key} />
                  </button>
                </th>
              ))}
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Free Tier
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Badges
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((r, i) => (
              <tr
                key={r.provider.id}
                onClick={() => onProviderClick(r)}
                className={`border-b border-border/50 cursor-pointer hover:bg-accent/50 transition-colors ${i === 0 ? 'bg-primary/5' : ''}`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <ProviderLogo provider={r.provider} size="sm" />
                    <div>
                      <p className="font-semibold">{r.provider.name}</p>
                      {i === 0 && <span className="text-xs text-primary font-medium">Best price</span>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 font-semibold font-mono">{formatCurrency(r.costs.monthly, currency)}</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">{formatCurrency(r.costs.yearly, currency)}</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">{formatCurrency(r.costs.compute, currency)}</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">{formatCurrency(r.costs.storage, currency)}</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">{formatCurrency(r.costs.bandwidth, currency)}</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">{formatCurrency(r.costs.database, currency)}</td>
                <td className="px-4 py-3">
                  {r.provider.freeTier ? (
                    <Check className="w-4 h-4 text-chart-2" />
                  ) : (
                    <X className="w-4 h-4 text-muted-foreground/30" />
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1 flex-wrap max-w-48">
                    {r.badges?.slice(0, 2).map((b, j) => (
                      <Badge key={j} variant="secondary" className="text-xs whitespace-nowrap">
                        {b.emoji} {b.label}
                      </Badge>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {sorted.map((r, i) => (
          <div
            key={r.provider.id}
            onClick={() => onProviderClick(r)}
            className={`p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md ${
              i === 0 ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <ProviderLogo provider={r.provider} size="sm" />
                <div>
                  <p className="font-semibold">{r.provider.name}</p>
                  {i === 0 && <span className="text-xs text-primary font-medium">Best price</span>}
                </div>
              </div>
              <p className="text-lg font-bold font-mono">{formatCurrency(r.costs.monthly, currency)}<span className="text-xs text-muted-foreground font-normal">/mo</span></p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center p-1.5 rounded-lg bg-muted/50">
                <p className="text-muted-foreground">Compute</p>
                <p className="font-mono font-medium">{formatCurrency(r.costs.compute, currency)}</p>
              </div>
              <div className="text-center p-1.5 rounded-lg bg-muted/50">
                <p className="text-muted-foreground">Storage</p>
                <p className="font-mono font-medium">{formatCurrency(r.costs.storage, currency)}</p>
              </div>
              <div className="text-center p-1.5 rounded-lg bg-muted/50">
                <p className="text-muted-foreground">Bandwidth</p>
                <p className="font-mono font-medium">{formatCurrency(r.costs.bandwidth, currency)}</p>
              </div>
            </div>
            {r.badges?.length > 0 && (
              <div className="flex gap-1 flex-wrap mt-2">
                {r.badges.map((b, j) => (
                  <Badge key={j} variant="secondary" className="text-xs">{b.emoji} {b.label}</Badge>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}