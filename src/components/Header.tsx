import React, { useEffect, useRef } from 'react';
import { Menu, Search, Settings, HelpCircle, Mail } from 'lucide-react';

interface HeaderProps {
  onSelectView: (view: string) => void;
  onMenuClick: () => void;
}

export function Header({ onSelectView, onMenuClick }: HeaderProps) {
  const mailIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateIcon = () => {
      if (mailIconRef.current) {
        mailIconRef.current.classList.remove('animate');
        void mailIconRef.current.offsetWidth;
        mailIconRef.current.classList.add('animate');
      }
    };

    const initialTimeout = setTimeout(animateIcon, 2000);
    const interval = setInterval(animateIcon, 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const handleLogoClick = () => {
    onSelectView('Inbox');
  };

  return (
    <header className="flex items-center px-4 py-2 bg-surface border-b border-border shadow-sm">
      <div className="flex items-center">
        <button 
          className="p-2 hover:bg-surface-secondary rounded-full transition-colors"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <Menu className="w-6 h-6 text-primary" />
        </button>
        <button 
          onClick={handleLogoClick}
          className="flex items-center -ml-1 hover:bg-surface-secondary rounded-lg px-2 py-1 transition-colors"
          aria-label="Go to inbox"
        >
          <div ref={mailIconRef} className="mail-icon">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <span className="ml-2 text-xl font-semibold text-text-primary">Assistant</span>
        </button>
      </div>
      <div className="flex-1 mx-8">
        <div className="flex items-center max-w-2xl bg-surface-secondary rounded-lg px-4 py-2 border border-border">
          <Search className="w-5 h-5 text-secondary" />
          <input
            type="text"
            placeholder="Search mail"
            className="ml-2 bg-transparent outline-none flex-1 text-text-primary placeholder-secondary"
            aria-label="Search emails"
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button 
          className="p-2 hover:bg-surface-secondary rounded-full transition-colors"
          aria-label="Get help"
        >
          <HelpCircle className="w-6 h-6 text-secondary" />
        </button>
        <button 
          className="p-2 hover:bg-surface-secondary rounded-full transition-colors"
          aria-label="Open settings"
        >
          <Settings className="w-6 h-6 text-secondary" />
        </button>
        <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary/10">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces"
            alt="User profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}