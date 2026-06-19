import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="relative w-14 h-7 rounded-full bg-secondary border border-border transition-colors duration-300 flex items-center"
      aria-label="Toggle theme"
    >
      <div className={`absolute w-5 h-5 rounded-full bg-primary transition-transform duration-300 flex items-center justify-center ${isDark ? 'translate-x-7' : 'translate-x-1'}`}>
        {isDark ? <Moon className="w-3 h-3 text-primary-foreground" /> : <Sun className="w-3 h-3 text-primary-foreground" />}
      </div>
    </button>
  );
}