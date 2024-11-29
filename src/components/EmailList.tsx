import React, { useState } from 'react';
import { RefreshCcw, Archive, Plus, X } from 'lucide-react';
import { Email, View } from '../types';
import { TagSelector } from './TagSelector';

interface EmailListProps {
  emails: Email[];
  selectedView: string;
  views: View[];
  getParentView: (viewName: string) => string[];
}

export function EmailList({ emails, selectedView, views, getParentView }: EmailListProps) {
  const [showTagSelector, setShowTagSelector] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [emailsState, setEmailsState] = useState<Email[]>(emails);

  const handleRemoveTag = (emailId: number, tagToRemove: string) => {
    setEmailsState(emailsState.map(email => {
      if (email.id === emailId) {
        return {
          ...email,
          tags: email.tags.filter(tag => tag !== tagToRemove)
        };
      }
      return email;
    }));
  };

  const handleAddTags = (newTags: string[]) => {
    if (selectedEmail) {
      setEmailsState(emailsState.map(email => {
        if (email.id === selectedEmail.id) {
          return {
            ...email,
            tags: [...new Set([...email.tags, ...newTags])]
          };
        }
        return email;
      }));
    }
    setShowTagSelector(false);
    setSelectedEmail(null);
  };

  const handleAddNewTag = (tagName: string) => {
    // In a real application, this would be handled by a global tag management system
    console.log('New tag created:', tagName);
  };

  if (selectedView !== 'Inbox') {
    return <main className="flex-1 bg-white" />;
  }

  return (
    <main className="flex-1 overflow-y-auto bg-white">
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              className="mr-4"
              aria-label="Select all emails" 
            />
            <button 
              className="p-2 hover:bg-surface-secondary rounded-full transition-colors"
              aria-label="Refresh emails"
            >
              <RefreshCcw className="w-5 h-5 text-secondary" />
            </button>
            <button 
              className="p-2 hover:bg-surface-secondary rounded-full transition-colors"
              aria-label="Archive selected emails"
            >
              <Archive className="w-5 h-5 text-secondary" />
            </button>
          </div>
          <div className="flex items-center space-x-2 text-sm text-secondary">
            <span>{selectedView}</span>
            <span>·</span>
            <span>{emailsState.length} messages</span>
          </div>
        </div>
      </div>

      <div>
        {emailsState.map((email) => (
          <div
            key={email.id}
            className="flex items-center px-4 py-2 border-b hover:bg-surface-secondary transition-colors cursor-pointer"
          >
            <input 
              type="checkbox" 
              className="mr-4"
              aria-label={`Select email from ${email.sender}`}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <span className="font-medium truncate">{email.sender}</span>
                <span className="ml-auto text-sm text-gray-500">{email.date}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="truncate">{email.subject}</span>
                <span className="mx-1">-</span>
                <span className="truncate">{email.preview}</span>
              </div>
              <div className="flex gap-2 mt-1 flex-wrap">
                {email.tags.map((tag) => (
                  <span key={tag} className="tag-pill group">
                    {tag}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveTag(email.id, tag);
                      }}
                      className="tag-remove-button"
                      aria-label={`Remove ${tag} tag`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEmail(email);
                    setShowTagSelector(true);
                  }}
                  className="tag-add-button"
                  aria-label="Add new tag"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Add tag
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showTagSelector && selectedEmail && (
        <TagSelector
          existingTags={selectedEmail.tags}
          availableTags={Array.from(new Set(views.flatMap(view => view.conditions.flatMap(c => c.tags))))}
          onSave={handleAddTags}
          onClose={() => {
            setShowTagSelector(false);
            setSelectedEmail(null);
          }}
          onAddNewTag={handleAddNewTag}
        />
      )}
    </main>
  );
}