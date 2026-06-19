import React from 'react';
import { Badge } from '@/components/ui/badge';
import ProviderLogo from './ProviderLogo';
import { formatCurrency } from '@/lib/formatUtils';

export default function RecommendationCards({ results, currency, onProviderClick }) {
  const withBadges = results.filter(r => r.badges && r.badges.length > 0).slice(0, 6);
  
  if (withBadges.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl md:text-3xl font-bold font-heading mb-2">Recommendations</h2>
      <p className="text-muted-foreground mb-6">Our picks based on your workload configuration</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {withBadges.map(r => (
          <div
            key={r.provider.id}
            onClick={() => onProviderClick(r)}
            className="group p-5 rounded-2xl border border-border bg-card hover:shadow-lg hover:border-primary/20 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5" style={{ backgroundColor: r.provider.color, transform: 'translate(30%, -30%)' }} />
            
            <div className="flex items-center gap-3 mb-3">
              <ProviderLogo provider={r.provider} size="md" />
              <div>
                <p className="font-bold text-lg">{r.provider.name}</p>
                <p className="text-lg font-bold font-mono text-primary">
                  {formatCurrency(r.costs.monthly, currency)}
                  <span className="text-xs text-muted-foreground font-normal">/mo</span>
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1.5 mb-3">
              {r.badges.map((b, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {b.emoji} {b.label}
                </Badge>
              ))}
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2">{r.provider.description}</p>
            
            <div className="mt-3 pt-3 border-t border-border grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">Yearly</span>
                <p className="font-mono font-semibold">{formatCurrency(r.costs.yearly, currency)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Per User</span>
                <p className="font-mono font-semibold">{formatCurrency(r.costs.costPerUser, currency)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}