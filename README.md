# Rrootshell Staff Augmentation - Developer Portal

A comprehensive developer portal for the Rrootshell Staff Augmentation application. This portal provides developers with access to UI mockups, requirements documentation, and task management tools all in one place.

## 🎯 Purpose

This developer portal serves as a central hub for:
- **UI Mockups**: Reference approved design mockups during development
- **Requirements Documentation**: Access detailed specifications and requirements
- **Onboarding & Task Management**: Track daily and weekly assigned tasks

## 🚀 Features

### 1. UI Mockups Section
- View all approved UI mockups organized by category (Dashboard, Forms, Reports, Settings)
- Quick access to mockups from the header via "Quick Mockups" button
- Filter mockups by category
- Click on any mockup to view details
- Mockups remain accessible throughout the development process

### 2. Requirements Documentation
- Comprehensive documentation of application requirements
- Organized by modules:
  - Authentication & Authorization
  - Staff Management
  - Project Assignment
  - Reporting & Analytics
- Each requirement includes:
  - Unique requirement ID
  - Description
  - Implementation details
  - Task breakdown

### 3. Onboarding & Task Management
- Kanban-style task board with three columns: Pending, In Progress, Completed
- Filter tasks by: All, Daily, Weekly, Completed
- Drag and drop tasks between columns to update status
- Add new tasks with the "+ Add New Task" button
- Each task displays:
  - Task title and description
  - Assignee
  - Task type (Daily/Weekly)
  - Due date

## 🛠️ Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A local web server (optional, for development)

### Running the Application

#### Option 1: Using Python's Built-in Server
```bash
python3 -m http.server 8080
```
Then open your browser and navigate to `http://localhost:8080`

#### Option 2: Using Node.js http-server
```bash
npx http-server -p 8080
```
Then open your browser and navigate to `http://localhost:8080`

#### Option 3: Open Directly
Simply open `index.html` in your web browser.

## 📁 Project Structure

```
Rrootshell-StaffAugmentation/
├── index.html              # Main HTML file
├── styles/
│   └── main.css           # All styles for the application
├── js/
│   ├── app.js             # Application logic and interactions
│   └── data.js            # Sample data for mockups, requirements, and tasks
├── data/
│   └── mockups/           # Directory for mockup images (to be populated)
└── README.md              # This file
```

## 🎨 UI Components

### Header
- Sticky header that remains visible while scrolling
- Navigation links to all main sections
- "Quick Mockups" button for instant access to mockups from any page

### Home Page
- Welcome message and overview
- Three feature cards linking to main sections

### Mockups Gallery
- Grid layout displaying all mockups
- Category filter buttons
- Click any mockup card to view in modal

### Requirements Sidebar
- Left sidebar navigation for requirement modules
- Main content area displaying selected module requirements
- Detailed implementation notes for each requirement

### Task Board
- Three-column Kanban layout
- Drag-and-drop functionality
- Filter buttons for task types
- Modal form for adding new tasks

## 📝 Customization

### Adding New Mockups
Edit `js/data.js` and add entries to the `mockupsData` array:

```javascript
{
    id: 9,
    title: "Your Mockup Title",
    category: "dashboard", // or forms, reports, settings
    description: "Description of the mockup",
    imageUrl: "data/mockups/your-mockup.png",
    lastUpdated: "2024-01-15"
}
```

### Adding New Requirements
Edit `js/data.js` and add modules or items to the `requirementsData` object:

```javascript
"module-key": {
    title: "Module Title",
    items: [
        {
            id: "module-001",
            title: "Requirement Title",
            description: "Description",
            details: ["Detail 1", "Detail 2"]
        }
    ]
}
```

### Adding New Tasks
Use the "+ Add New Task" button in the UI, or edit `js/data.js` to add entries to the `tasksData` array.

## 🎯 Usage for Developers

1. **Starting a New Feature**: 
   - Review the relevant mockup in the UI Mockups section
   - Check the Requirements section for detailed specifications
   - Create or check tasks in the Onboarding section

2. **During Development**:
   - Use the "Quick Mockups" button in the header to reference designs
   - Refer to requirements documentation for implementation details
   - Update task status by dragging cards across columns

3. **Task Management**:
   - Daily tasks: Short-term tasks to be completed within a day
   - Weekly tasks: Larger tasks spanning multiple days

## 🔧 Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling with CSS variables and modern layouts
- **Vanilla JavaScript**: Application logic without frameworks
- **Responsive Design**: Mobile-friendly layout

## 📱 Responsive Design

The portal is fully responsive and works on:
- Desktop computers (1200px and above)
- Tablets (768px - 1199px)
- Mobile devices (below 768px)

## 🤝 Contributing

When adding new features or content:
1. Follow the existing code structure
2. Update the data files in `js/data.js`
3. Test on multiple screen sizes
4. Ensure all interactive elements work properly

## 📄 License

This project is part of the Rrootshell Staff Augmentation system.

## 📞 Support

For questions or issues with the developer portal, please contact the development team.
