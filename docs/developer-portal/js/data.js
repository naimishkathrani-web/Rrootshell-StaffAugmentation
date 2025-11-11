// Sample Data Structure
const mockupsData = [
    {
        id: 1,
        title: "Dashboard Home",
        category: "dashboard",
        description: "Main dashboard view with key metrics and statistics",
        imageUrl: "data/mockups/dashboard-home.png",
        lastUpdated: "2024-01-15"
    },
    {
        id: 2,
        title: "Staff List View",
        category: "dashboard",
        description: "View all staff members with filtering and sorting options",
        imageUrl: "data/mockups/staff-list.png",
        lastUpdated: "2024-01-14"
    },
    {
        id: 3,
        title: "Add Staff Form",
        category: "forms",
        description: "Form for adding new staff members to the system",
        imageUrl: "data/mockups/add-staff-form.png",
        lastUpdated: "2024-01-13"
    },
    {
        id: 4,
        title: "Project Assignment Form",
        category: "forms",
        description: "Interface for assigning staff to projects",
        imageUrl: "data/mockups/project-assignment.png",
        lastUpdated: "2024-01-12"
    },
    {
        id: 5,
        title: "Timesheet Report",
        category: "reports",
        description: "Weekly and monthly timesheet reports",
        imageUrl: "data/mockups/timesheet-report.png",
        lastUpdated: "2024-01-11"
    },
    {
        id: 6,
        title: "Performance Analytics",
        category: "reports",
        description: "Staff performance metrics and analytics dashboard",
        imageUrl: "data/mockups/performance-analytics.png",
        lastUpdated: "2024-01-10"
    },
    {
        id: 7,
        title: "System Settings",
        category: "settings",
        description: "Application configuration and system settings",
        imageUrl: "data/mockups/system-settings.png",
        lastUpdated: "2024-01-09"
    },
    {
        id: 8,
        title: "User Preferences",
        category: "settings",
        description: "Individual user settings and preferences",
        imageUrl: "data/mockups/user-preferences.png",
        lastUpdated: "2024-01-08"
    }
];

const requirementsData = {
    "authentication": {
        title: "Authentication & Authorization",
        items: [
            {
                id: "auth-001",
                title: "User Login",
                description: "Users should be able to log in with email and password",
                details: [
                    "Email validation",
                    "Password minimum 8 characters",
                    "Remember me functionality",
                    "Password reset via email"
                ]
            },
            {
                id: "auth-002",
                title: "Role-Based Access Control",
                description: "Different user roles with specific permissions",
                details: [
                    "Admin role - full access",
                    "Manager role - team management access",
                    "Developer role - limited access",
                    "Role assignment by admin"
                ]
            }
        ]
    },
    "staff-management": {
        title: "Staff Management",
        items: [
            {
                id: "staff-001",
                title: "Add Staff Member",
                description: "Ability to add new staff members to the system",
                details: [
                    "Required fields: name, email, role, skills",
                    "Optional fields: phone, location, availability",
                    "Auto-generate staff ID",
                    "Email notification to new staff"
                ]
            },
            {
                id: "staff-002",
                title: "Edit Staff Information",
                description: "Update existing staff member details",
                details: [
                    "Editable fields: all except staff ID",
                    "Track change history",
                    "Require confirmation for role changes",
                    "Auto-save functionality"
                ]
            },
            {
                id: "staff-003",
                title: "Staff List & Search",
                description: "View and search all staff members",
                details: [
                    "Pagination for large datasets",
                    "Filter by role, skills, availability",
                    "Search by name or email",
                    "Export to CSV"
                ]
            }
        ]
    },
    "project-assignment": {
        title: "Project Assignment",
        items: [
            {
                id: "project-001",
                title: "Assign Staff to Project",
                description: "Assign available staff members to projects",
                details: [
                    "Check staff availability",
                    "Match skills to project requirements",
                    "Set assignment duration",
                    "Send notification to assigned staff"
                ]
            },
            {
                id: "project-002",
                title: "Project Timeline",
                description: "View project timelines and staff allocation",
                details: [
                    "Gantt chart view",
                    "Calendar view",
                    "Resource utilization metrics",
                    "Conflict detection"
                ]
            }
        ]
    },
    "reporting": {
        title: "Reporting & Analytics",
        items: [
            {
                id: "report-001",
                title: "Timesheet Management",
                description: "Track and manage staff timesheets",
                details: [
                    "Daily time entry",
                    "Weekly submission",
                    "Manager approval workflow",
                    "Generate reports by period"
                ]
            },
            {
                id: "report-002",
                title: "Performance Metrics",
                description: "Track staff performance and productivity",
                details: [
                    "Project completion rate",
                    "Task velocity",
                    "Skill utilization",
                    "Custom KPIs"
                ]
            }
        ]
    }
};

const tasksData = [
    {
        id: 1,
        title: "Implement login page UI",
        description: "Create the login page according to mockup #1",
        assignee: "John Doe",
        type: "daily",
        status: "pending",
        dueDate: "2024-01-20"
    },
    {
        id: 2,
        title: "Setup authentication API",
        description: "Implement JWT-based authentication on backend",
        assignee: "Jane Smith",
        type: "weekly",
        status: "in-progress",
        dueDate: "2024-01-25"
    },
    {
        id: 3,
        title: "Create staff list component",
        description: "Build reusable staff list component with filtering",
        assignee: "Mike Johnson",
        type: "daily",
        status: "in-progress",
        dueDate: "2024-01-21"
    },
    {
        id: 4,
        title: "Write API documentation",
        description: "Document all API endpoints with examples",
        assignee: "Sarah Williams",
        type: "weekly",
        status: "pending",
        dueDate: "2024-01-26"
    },
    {
        id: 5,
        title: "Setup database migrations",
        description: "Create initial database schema and migrations",
        assignee: "John Doe",
        type: "daily",
        status: "completed",
        dueDate: "2024-01-18"
    },
    {
        id: 6,
        title: "Implement unit tests",
        description: "Add unit tests for authentication module",
        assignee: "Jane Smith",
        type: "weekly",
        status: "completed",
        dueDate: "2024-01-19"
    }
];
