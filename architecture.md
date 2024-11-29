# Email Management Application Architecture

## Core Structure

### Components
1. **App.tsx** - Root component
   - Manages global state (selected view, current page, navigation menu state)
   - Controls sidebar visibility (hidden for Views and Tags pages)
   - Contains email data, view definitions, and tag data
   - Handles routing between main views (Home, Views, Tags)

2. **Header**
   - Main navigation bar with animated mail icon
   - Search functionality
   - Profile and settings access
   - Logo/branding with home navigation

3. **Sidebar** (Home page only)
   - Shows Inbox and Views in home page
   - Hidden on views and tags pages for full-width management
   - Dynamic navigation based on current page

4. **EmailList**
   - Displays emails with tags
   - Tag management (add/remove)
   - Shows checkbox selection
   - Empty state for non-Inbox views
   - Consistent tag styling across application

5. **NavigationMenu**
   - Slide-out menu for main navigation
   - Routes between Home, Views, and Tags pages

6. **ViewsConfig**
   - Full-width view management interface
   - Tag condition management
   - Drag-and-drop reordering
   - Email count display per view
   - Visual grouping of conditions

7. **TagsPage**
   - Full-width tag management interface
   - Horizontal tag organization
   - Tag creation and deletion
   - Search functionality

8. **TagSelector**
   - Reusable modal for tag selection
   - Search functionality
   - New tag creation
   - Used in both email tag management and view configuration

9. **TagModal**
   - Modal for creating new tags
   - Input validation
   - Consistent styling with other modals

### Data Models

1. **View**
   ```typescript
   {
     id: string
     name: string
     visible: boolean
     conditions: TagCondition[]
   }
   ```

2. **TagCondition**
   ```typescript
   {
     type: 'includes-any' | 'includes-all' | 'excludes-any'
     tags: string[]
   }
   ```

3. **Tag**
   ```typescript
   {
     id: string
     name: string
   }
   ```

4. **Email**
   ```typescript
   {
     id: number
     sender: string
     subject: string
     preview: string
     date: string
     tags: string[]
   }
   ```

## Key Features

1. **Tag Management**
   - Horizontal tag organization
   - Full-width interface for better organization
   - Tag addition/removal from emails
   - Consistent tag styling across components

2. **View System**
   - Horizontal view organization
   - Configurable views with tag conditions
   - Complex filtering with includes/excludes logic
   - Email count display
   - Condition grouping visualization

3. **Navigation**
   - Full-width layouts for Views and Tags pages
   - Slide-out navigation menu
   - Animated mail icon in header
   - Consistent navigation patterns

## UI/UX Features
- Modern, professional color scheme
- Responsive design
- Custom scrollbar styling
- Hover effects for interactive elements
- Modal interfaces for tag management
- Drag-and-drop interface for organization
- Full-width layouts where appropriate
- Consistent tag styling across components
- Visual hierarchy through typography and spacing

## Data Management
- JSON-based email data store
- Tag filtering utilities
- View condition processing
- Real-time email count calculations

## Future Considerations
1. Email composition
2. Search functionality implementation
3. Email actions (archive, delete, etc.)
4. User settings persistence
5. Backend integration
6. Advanced filtering capabilities
7. Batch operations for emails
8. Export/import functionality
9. Mobile responsiveness improvements
10. Keyboard shortcuts