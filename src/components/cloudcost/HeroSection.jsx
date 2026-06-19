import React from 'react';
import { ArrowDown, Zap } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-20 right-1/4 w-72 h-72 bg-chart-5/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-5xl mx-auto text-center px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent border border-border mb-6 text-sm font-medium text-accent-foreground">
          <Zap className="w-3.5 h-3.5" />
          Compare 13 cloud providers instantly
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight font-display leading-tight">
          <span className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
            Cloud Hosting Costs,
          </span>
          <br />
          <span className="bg-gradient-to-r from-primary via-chart-5 to-chart-2 bg-clip-text text-transparent">
            Compared Instantly
          </span>
        </h1>
        
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Configure your workload and see real-time cost estimates across AWS, GCP, Azure, 
          and 10 more providers. Find the perfect cloud for your budget.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#configurator"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-all shadow-lg shadow-primary/25"
          >
            Start Comparing
            <ArrowDown className="w-4 h-4" />
          </a>
          <a
            href="#comparison"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-secondary text-secondary-foreground font-semibold text-base hover:bg-secondary/80 transition-all border border-border"
          >
            View All Providers
          </a>
        </div>
        
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-chart-2" /> Free to use
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary" /> No sign-up needed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-chart-3" /> Real pricing data
          </span>
        </div>
      </div>
    </section>
  );
}