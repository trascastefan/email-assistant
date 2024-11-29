import React from 'react';
import { View } from '../types';
import { 
  Inbox,
  FileText, 
  Home, 
  Wallet, 
  Briefcase, 
  GraduationCap,
  Heart,
  ShoppingBag,
  Plane,
  CreditCard,
  Users,
  Newspaper,
  Tag,
  Settings
} from 'lucide-react';

interface SidebarProps {
  views: View[];
  selectedView: string;
  onSelectView: (view: string) => void;
  currentPage: string;
}

const getViewIcon = (id: string) => {
  const icons = {
    docs: FileText,
    living: Home,
    banking: Wallet,
    work: Briefcase,
    education: GraduationCap,
    health: Heart,
    shopping: ShoppingBag,
    travel: Plane,
    subscriptions: CreditCard,
    personal: Users,
    newsletters: Newspaper,
    promos: Tag
  };

  const IconComponent = icons[id as keyof typeof icons];
  return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
};

export function Sidebar({ views, selectedView, onSelectView, currentPage }: SidebarProps) {
  const topLevelViews = views.filter(view => !view.parentId);

  if (currentPage === 'tags') {
    return (
      <aside className="w-64 border-r overflow-y-auto">
        <div className="p-4">
          <h3 className="px-3 text-sm font-medium text-gray-500 mb-2">All Tags</h3>
          {views.map((view) => (
            <button
              key={view.id}
              className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 font-medium flex items-center ${
                selectedView === view.name ? 'bg-blue-100 text-blue-600' : ''
              }`}
              onClick={() => onSelectView(view.name)}
            >
              <span className="mr-3">{getViewIcon(view.id)}</span>
              {view.name}
            </button>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-64 border-r overflow-y-auto">
      <div className="p-4">
        {currentPage === 'home' && (
          <>
            <button
              className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 font-medium flex items-center ${
                selectedView === 'Inbox' ? 'bg-blue-100 text-blue-600' : ''
              }`}
              onClick={() => onSelectView('Inbox')}
            >
              <Inbox className="w-5 h-5 mr-3" />
              Inbox
            </button>

            <div className="mt-6">
              <h3 className="px-3 text-sm font-medium text-gray-500 mb-2">Views</h3>
              {topLevelViews.map((view) => (
                <button
                  key={view.id}
                  className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 font-medium flex items-center ${
                    selectedView === view.name ? 'bg-blue-100 text-blue-600' : ''
                  }`}
                  onClick={() => onSelectView(view.name)}
                >
                  <span className="mr-3">{getViewIcon(view.id)}</span>
                  {view.name}
                </button>
              ))}
            </div>
          </>
        )}

        {currentPage === 'views' && (
          <>
            <div className="flex items-center justify-between px-3 mb-4">
              <h3 className="text-sm font-medium text-gray-500">Views</h3>
              <button
                onClick={() => onSelectView('config')}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Settings className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            {topLevelViews.map((view) => (
              <button
                key={view.id}
                className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 font-medium flex items-center ${
                  selectedView === view.name ? 'bg-blue-100 text-blue-600' : ''
                }`}
                onClick={() => onSelectView(view.name)}
              >
                <span className="mr-3">{getViewIcon(view.id)}</span>
                {view.name}
              </button>
            ))}
          </>
        )}
      </div>
    </aside>
  );
}