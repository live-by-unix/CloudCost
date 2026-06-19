import React, { useState, useMemo, useEffect } from 'react';
import { providers, defaultConfig } from '@/lib/providerData';
import { calculateAllProviders, assignBadges, simulateTrafficMultiplier } from '@/lib/costEngine';
import { parseShareURL } from '@/lib/formatUtils';
import Navbar from '@/components/cloudcost/Navbar';
import HeroSection from '@/components/cloudcost/HeroSection';
import WorkloadConfigurator from '@/components/cloudcost/WorkloadConfigurator';
import PresetWorkloads from '@/components/cloudcost/PresetWorkloads';
import CostSummaryCards from '@/components/cloudcost/CostSummaryCards';
import ComparisonTable from '@/components/cloudcost/ComparisonTable';
import CostCharts from '@/components/cloudcost/CostCharts';
import WhatIfAnalysis from '@/components/cloudcost/WhatIfAnalysis';
import RecommendationCards from '@/components/cloudcost/RecommendationCards';
import ExportTools from '@/components/cloudcost/ExportTools';
import FAQSection from '@/components/cloudcost/FAQSection';
import ProviderDetailModal from '@/components/cloudcost/ProviderDetailModal';

export default function Home() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [currency, setCurrency] = useState("USD");
  const [config, setConfig] = useState(defaultConfig);
  const [activePreset, setActivePreset] = useState(null);
  const [trafficMultiplier, setTrafficMultiplier] = useState(1);
  const [selectedResult, setSelectedResult] = useState(null);

  // Restore from URL on mount
  useEffect(() => {
    const shared = parseShareURL();
    if (shared) {
      setConfig(prev => ({ ...prev, ...shared.config }));
      setCurrency(shared.currency);
    }
  }, []);

  // Theme toggle
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const effectiveConfig = useMemo(() => {
    return trafficMultiplier > 1
      ? simulateTrafficMultiplier(config, trafficMultiplier)
      : config;
  }, [config, trafficMultiplier]);

  const results = useMemo(() => {
    const raw = calculateAllProviders(providers, effectiveConfig);
    return assignBadges(raw);
  }, [effectiveConfig]);

  const handlePreset = (preset) => {
    setActivePreset(preset.id);
    setConfig(preset.config);
    setTrafficMultiplier(1);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar
        isDark={isDark}
        onToggleTheme={() => setIsDark(d => !d)}
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      <HeroSection />

      <main className="max-w-7xl mx-auto px-4 pb-20">
        <WorkloadConfigurator config={config} onChange={c => { setConfig(c); setActivePreset(null); }} />
        <PresetWorkloads activePreset={activePreset} onSelect={handlePreset} />
        <CostSummaryCards results={results} currency={currency} config={effectiveConfig} />
        <ComparisonTable results={results} currency={currency} onProviderClick={setSelectedResult} />
        <CostCharts results={results} currency={currency} />
        <WhatIfAnalysis activeMultiplier={trafficMultiplier} onMultiplierChange={setTrafficMultiplier} />
        <RecommendationCards results={results} currency={currency} onProviderClick={setSelectedResult} />
        <ExportTools results={results} config={config} currency={currency} />
        <FAQSection />
      </main>

      <footer className="border-t border-border bg-card py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="font-semibold text-foreground mb-1">CloudCost Compare</p>
          <p>Free cloud hosting cost comparison tool. Pricing data is approximate and for estimation purposes only.</p>
          <p className="mt-2">© {new Date().getFullYear()} CloudCost Compare. All pricing data sourced from official provider pages.</p>
        </div>
      </footer>

      <ProviderDetailModal
        result={selectedResult}
        currency={currency}
        open={!!selectedResult}
        onClose={() => setSelectedResult(null)}
      />
    </div>
  );
}