import React, { useState } from 'react';
import { X, Search, Plus } from 'lucide-react';
import { Tag } from '../types';

interface TagSelectorProps {
  existingTags: string[];
  availableTags: string[];
  onSave: (tags: string[]) => void;
  onClose: () => void;
  onAddNewTag?: (tagName: string) => void;
}

export function TagSelector({ existingTags, availableTags, onSave, onClose, onAddNewTag }: TagSelectorProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>(existingTags);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewTagInput, setShowNewTagInput] = useState(false);
  const [newTagName, setNewTagName] = useState('');

  const filteredTags = availableTags.filter(tag => 
    tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShowNewTagInput = () => {
    setNewTagName(searchQuery); // Pre-fill with search query
    setShowNewTagInput(true);
  };

  const handleAddNewTag = () => {
    if (newTagName.trim() && onAddNewTag) {
      const newTag = newTagName.trim();
      onAddNewTag(newTag);
      setSelectedTags(prev => [...prev, newTag]);
      setNewTagName('');
      setShowNewTagInput(false);
      setSearchQuery('');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (showNewTagInput) {
      setShowNewTagInput(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[400px] max-w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-text-primary">Select Tags</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-surface-secondary rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-secondary" />
          </button>
        </div>
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
            <input
              type="text"
              placeholder="Search tags..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              aria-label="Search tags"
            />
          </div>

          <div className="space-y-2 h-[280px] overflow-y-auto pr-2">
            {filteredTags.map(tag => (
              <label 
                key={tag} 
                className="flex items-center p-2 hover:bg-surface-secondary rounded-lg transition-colors cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTags([...selectedTags, tag]);
                    } else {
                      setSelectedTags(selectedTags.filter(t => t !== tag));
                    }
                  }}
                  className="mr-3 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  aria-label={`Select ${tag} tag`}
                />
                <span className="text-text-primary">{tag}</span>
              </label>
            ))}

            {showNewTagInput ? (
              <div className="p-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    placeholder="Enter new tag name"
                    className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    autoFocus
                    aria-label="New tag name"
                  />
                  <button
                    onClick={handleAddNewTag}
                    disabled={!newTagName.trim()}
                    className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                    aria-label="Create new tag"
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleShowNewTagInput}
                className="flex items-center w-full p-2 hover:bg-surface-secondary rounded-lg transition-colors text-primary"
                aria-label="Create new tag"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Tag {searchQuery && `"${searchQuery}"`}
              </button>
            )}
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-text-secondary hover:bg-surface-secondary rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(selectedTags)}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}