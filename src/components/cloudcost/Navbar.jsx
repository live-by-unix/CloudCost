import React from 'react';
import { Cloud } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import CurrencySelector from './CurrencySelector';

export default function Navbar({ isDark, onToggleTheme, currency, onCurrencyChange }) {
  const navLinks = [
    { href: "#configurator", label: "Configure", minShow: "xs" },
    { href: "#comparison", label: "Compare", minShow: "sm" },
    { href: "#charts", label: "Charts", minShow: "md" },
    { href: "#faq", label: "FAQ", minShow: "lg" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-2">
        <a href="/" className="flex items-center gap-2 font-bold text-lg font-heading shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Cloud className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="hidden xs:inline">CloudCost</span>
          <span className="text-primary hidden xs:inline">Compare</span>
        </a>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className={`hover:text-foreground transition-colors ${link.minShow === 'md' ? 'hidden md:inline' : link.minShow === 'lg' ? 'hidden lg:inline' : ''}`}>
                {link.label}
              </a>
            ))}
          </div>
          <CurrencySelector value={currency} onChange={onCurrencyChange} />
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>
      </div>
    </nav>
  );
}