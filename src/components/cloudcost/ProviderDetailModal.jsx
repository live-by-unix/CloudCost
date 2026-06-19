import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Check, X, ExternalLink } from 'lucide-react';
import ProviderLogo from './ProviderLogo';
import { formatCurrency } from '@/lib/formatUtils';

export default function ProviderDetailModal({ result, currency, open, onClose }) {
  if (!result) return null;
  const { provider, costs, badges } = result;

  const breakdownItems = [
    { label: "Compute", value: costs.compute, color: "bg-chart-1" },
    { label: "Storage", value: costs.storage, color: "bg-chart-2" },
    { label: "Bandwidth", value: costs.bandwidth, color: "bg-chart-3" },
    { label: "Database", value: costs.database, color: "bg-chart-4" },
    { label: "Requests", value: costs.requests, color: "bg-chart-5" },
    { label: "Platform Fee", value: costs.platformFee, color: "bg-muted-foreground" }
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <ProviderLogo provider={provider} size="lg" />
            <div>
              <DialogTitle className="text-xl">{provider.name}</DialogTitle>
              <p className="text-sm text-muted-foreground">{provider.description}</p>
            </div>
          </div>
        </DialogHeader>

        {badges?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {badges.map((b, i) => (
              <Badge key={i} variant="secondary" className="text-xs">{b.emoji} {b.label}</Badge>
            ))}
          </div>
        )}

        {/* Cost Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-accent/50 border border-border">
            <p className="text-xs text-muted-foreground">Monthly Cost</p>
            <p className="text-2xl font-bold font-mono">{formatCurrency(costs.monthly, currency)}</p>
          </div>
          <div className="p-3 rounded-xl bg-accent/50 border border-border">
            <p className="text-xs text-muted-foreground">Yearly Cost</p>
            <p className="text-2xl font-bold font-mono">{formatCurrency(costs.yearly, currency)}</p>
          </div>
          <div className="p-3 rounded-xl bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground">Per User</p>
            <p className="text-lg font-semibold font-mono">{formatCurrency(costs.costPerUser, currency)}</p>
          </div>
          <div className="p-3 rounded-xl bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground">Per 1K Requests</p>
            <p className="text-lg font-semibold font-mono">{formatCurrency(costs.costPerRequest * 1000, currency)}</p>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div>
          <h4 className="font-semibold mb-3">Cost Breakdown</h4>
          <div className="space-y-2">
            {breakdownItems.filter(b => b.value > 0).map(item => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                  <span>{item.label}</span>
                </div>
                <span className="font-mono font-medium">{formatCurrency(item.value, currency)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2 text-sm">Pros</h4>
            <ul className="space-y-1.5">
              {provider.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                  <Check className="w-3.5 h-3.5 text-chart-2 shrink-0 mt-0.5" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-sm">Cons</h4>
            <ul className="space-y-1.5">
              {provider.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                  <X className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Best For */}
        <div>
          <h4 className="font-semibold mb-2 text-sm">Best For</h4>
          <div className="flex flex-wrap gap-1.5">
            {provider.bestFor.map((use, i) => (
              <Badge key={i} variant="outline" className="text-xs">{use}</Badge>
            ))}
          </div>
        </div>

        {/* Free Tier */}
        <div className="p-3 rounded-xl bg-chart-2/5 border border-chart-2/20">
          <h4 className="font-semibold text-sm mb-1">Free Tier</h4>
          <p className="text-xs text-muted-foreground">{provider.freeTier}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}