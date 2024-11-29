import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { EmailList } from './components/EmailList';
import { NavigationMenu } from './components/NavigationMenu';
import { ViewsConfig } from './components/ViewsConfig';
import { TagsPage } from './components/TagsPage';
import { View, Tag, Email } from './types';
import emailData from './data/emails.json';

function App() {
  const [selectedView, setSelectedView] = useState('Inbox');
  const [currentPage, setCurrentPage] = useState('home');
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  
  const [views, setViews] = useState<View[]>([
    { 
      id: 'docs', 
      name: 'Official Documents', 
      visible: true,
      conditions: [{ 
        type: 'includes-any',
        tags: ['Government', 'Tax', 'Health Insurance']
      }]
    },
    { 
      id: 'living', 
      name: 'Living & Utilities', 
      visible: true,
      conditions: [{
        type: 'includes-any',
        tags: ['Housing', 'Utilities']
      }]
    },
    { 
      id: 'banking', 
      name: 'Banking & Finance', 
      visible: true,
      conditions: [{
        type: 'includes-any',
        tags: ['Bank', 'Investment']
      }]
    },
    { 
      id: 'work', 
      name: 'Work & Career', 
      visible: true,
      conditions: [{
        type: 'includes-any',
        tags: ['Job', 'Professional']
      }]
    },
    { 
      id: 'education', 
      name: 'Education', 
      visible: true,
      conditions: [{
        type: 'includes-any',
        tags: ['Education']
      }]
    }
  ]);

  const [tags, setTags] = useState<Tag[]>([
    { id: 'gov', name: 'Government' },
    { id: 'tax', name: 'Tax' },
    { id: 'health-ins', name: 'Health Insurance' },
    { id: 'banking', name: 'Bank' },
    { id: 'invest', name: 'Investment' },
    { id: 'housing', name: 'Housing' },
    { id: 'utilities', name: 'Utilities' },
    { id: 'job', name: 'Job' },
    { id: 'prof', name: 'Professional' },
    { id: 'edu', name: 'Education' }
  ]);

  const [emails] = useState<Email[]>(emailData.emails);

  const getTagHierarchy = (tagId: string): string[] => {
    const tag = tags.find(t => t.id === tagId);
    if (!tag) return [];
    return [tag.name];
  };

  const handleUpdateViews = (updatedViews: View[]) => {
    setViews(updatedViews);
  };

  const handleUpdateTags = (updatedTags: Tag[]) => {
    setTags(updatedTags);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setIsNavMenuOpen(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header 
        onSelectView={setSelectedView} 
        onMenuClick={() => setIsNavMenuOpen(true)}
      />
      <NavigationMenu
        isOpen={isNavMenuOpen}
        onClose={() => setIsNavMenuOpen(false)}
        onNavigate={handleNavigate}
      />
      <div className="flex flex-1 overflow-hidden">
        {currentPage === 'home' && (
          <Sidebar
            views={views.filter(v => v.visible)}
            selectedView={selectedView}
            onSelectView={setSelectedView}
            currentPage={currentPage}
          />
        )}
        {currentPage === 'views' ? (
          <ViewsConfig
            views={views}
            onUpdateViews={handleUpdateViews}
          />
        ) : currentPage === 'tags' ? (
          <TagsPage 
            tags={tags}
            onUpdateTags={handleUpdateTags}
          />
        ) : (
          <EmailList 
            emails={emails}
            selectedView={selectedView}
            views={views}
            getParentView={getTagHierarchy}
          />
        )}
      </div>
    </div>
  );
}

export default App;