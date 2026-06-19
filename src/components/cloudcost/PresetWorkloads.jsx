import React from 'react';
import { presets } from '@/lib/providerData';

export default function PresetWorkloads({ activePreset, onSelect }) {
  return (
    <section className="mt-10">
      <h3 className="text-lg font-semibold font-heading mb-4">Quick Presets</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {presets.map(preset => (
          <button
            key={preset.id}
            onClick={() => onSelect(preset)}
            className={`group relative p-3 rounded-xl border text-left transition-all duration-200 hover:shadow-md ${
              activePreset === preset.id
                ? 'bg-primary/10 border-primary/30 shadow-sm'
                : 'bg-card border-border hover:border-primary/20'
            }`}
          >
            <span className="text-2xl">{preset.icon}</span>
            <p className="text-sm font-medium mt-1.5 leading-tight">{preset.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{preset.description}</p>
          </button>
        ))}
      </div>
    </section>
  );
}