import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { currencies } from '@/lib/providerData';

export default function CurrencySelector({ value, onChange }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-28 h-9 text-sm bg-secondary border-border">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {currencies.map(c => (
          <SelectItem key={c.code} value={c.code}>
            <span className="flex items-center gap-1.5">
              <span className="font-mono text-xs">{c.symbol}</span>
              {c.code}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}