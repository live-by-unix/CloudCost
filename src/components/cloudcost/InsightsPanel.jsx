import React, { useMemo } from 'react';
import { Lightbulb, TrendingDown, Gift, Zap, Server, ArrowRight } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/formatUtils';
import { getProviderMeta } from '@/lib/providerMetadata';

export default function InsightsPanel({ results, currency, config }) {
  const cheapest = results[0];
  const mostExpensive = results[results.length - 1];
  const savings = mostExpensive.costs.yearly - cheapest.costs.yearly;
  const savingsPct = mostExpensive.costs.monthly > 0
    ? ((1 - cheapest.costs.monthly / mostExpensive.costs.monthly) * 100).toFixed(0)
    : 0;

  const insights = useMemo(() => {
    const list = [];

    list.push({
      icon: TrendingDown,
      color: "text-chart-2",
      bg: "bg-chart-2/10",
      title: `${savingsPct}% savings possible`,
      desc: `Switch from ${mostExpensive.provider.name} to ${cheapest.provider.name} to save ${formatCurrency(savings, currency)}/year.`
    });

    if (config.bandwidth > 1000) {
      const bestBw = results.find(r => r.costs.bandwidth < cheapest.costs.bandwidth && r.provider.id !== cheapest.provider.id);
      if (bestBw) {
        const bwSavings = (cheapest.costs.bandwidth - bestBw.costs.bandwidth) * 12;
        list.push({
          icon: Zap,
          color: "text-chart-3",
          bg: "bg-chart-3/10",
          title: "Bandwidth optimization",
          desc: `You're using ${formatNumber(config.bandwidth)} GB/mo. ${bestBw.provider.name} could save ${formatCurrency(bwSavings, currency)}/yr on bandwidth alone.`
        });
      }
    }

    if (config.reservedTier === "on-demand") {
      const reservedProviders = results.filter(r => r.provider.pricing.reserved?.["1yr"] > 0);
      if (reservedProviders.length > 0) {
        const bestReserved = reservedProviders[0];
        const discount = bestReserved.provider.pricing.reserved["1yr"];
        const monthlyAfterReserved = bestReserved.costs.monthly * (1 - discount);
        const reservedSavings = (bestReserved.costs.monthly - monthlyAfterReserved) * 12;
        list.push({
          icon: Gift,
          color: "text-primary",
          bg: "bg-primary/10",
          title: `Save ${formatCurrency(reservedSavings, currency)}/yr with reserved`,
          desc: `${bestReserved.provider.name} offers ${(discount * 100).toFixed(0)}% off on 1-year commitments. Toggle "1-Year Reserved" in pricing model.`
        });
      }
    }

    const freeTierProviders = results.filter(r =>
      r.provider.freeTier && r.provider.freeTier.toLowerCase().includes("always free")
    );
    if (freeTierProviders.length > 0) {
      list.push({
        icon: Lightbulb,
        color: "text-chart-5",
        bg: "bg-chart-5/10",
        title: `${freeTierProviders.length} always-free tiers available`,
        desc: `${freeTierProviders.slice(0, 3).map(r => r.provider.name).join(", ")}${freeTierProviders.length > 3 ? " and more" : ""} offer always-free tiers you could leverage for dev/testing.`
      });
    }

    if (config.gpu > 0) {
      const gpuProviders = results.filter(r => r.provider.pricing.gpu?.perGPU > 0);
      const cheapestGpu = gpuProviders.sort((a, b) => a.costs.gpu - b.costs.gpu)[0];
      if (cheapestGpu) {
        list.push({
          icon: Server,
          color: "text-chart-4",
          bg: "bg-chart-4/10",
          title: "Best GPU value",
          desc: `${cheapestGpu.provider.name} offers the cheapest GPU at ${formatCurrency(cheapestGpu.provider.pricing.gpu.perGPU, currency)}/mo per GPU.`
        });
      }
    }

    return list;
  }, [results, currency, config, savings, savingsPct, cheapest, mostExpensive]);

  if (results.length < 2) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl md:text-3xl font-bold font-heading mb-2">Cost Insights</h2>
      <p className="text-muted-foreground mb-6">Smart recommendations to optimize your cloud spending</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, i) => (
          <div key={i} className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-card hover:shadow-md transition-shadow">
            <div className={`shrink-0 w-10 h-10 rounded-xl ${insight.bg} ${insight.color} flex items-center justify-center`}>
              <insight.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm md:text-base">{insight.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{insight.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}