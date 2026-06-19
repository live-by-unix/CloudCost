import React from 'react';
import { Cloud } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import CurrencySelector from './CurrencySelector';

export default function Navbar({ isDark, onToggleTheme, currency, onCurrencyChange }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 font-bold text-lg font-heading">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Cloud className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="hidden sm:inline">CloudCost</span>
          <span className="text-primary hidden sm:inline">Compare</span>
        </a>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground mr-4">
            <a href="#configurator" className="hover:text-foreground transition-colors">Configure</a>
            <a href="#comparison" className="hover:text-foreground transition-colors">Compare</a>
          </div>
          <CurrencySelector value={currency} onChange={onCurrencyChange} />
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>
      </div>
    </nav>
  );
}