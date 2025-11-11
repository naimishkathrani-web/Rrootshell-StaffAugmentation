# Project Structure

## Overview
This document provides a comprehensive overview of the Rrootshell Staff Augmentation application repository structure, explaining the purpose and organization of each directory and key files.

---

## Repository Structure

```
Rrootshell-StaffAugmentation/
│
├── 📁 server/                          # Backend Node.js/Express application
│   ├── 📁 config/                      # Configuration files
│   │   └── database.js                 # Database connection & configuration
│   │
│   ├── 📁 controllers/                 # Business logic & request handlers
│   │   ├── authController.js           # Authentication logic (login, register, me)
│   │   ├── contractController.js       # Contract CRUD operations
│   │   ├── purchaseOrderController.js  # Purchase Order CRUD operations
│   │   └── resourceController.js       # Resource/Employee CRUD operations
│   │
│   ├── 📁 middleware/                  # Express middleware
│   │   └── auth.js                     # JWT authentication middleware
│   │
│   ├── 📁 models/                      # Database models (Sequelize ORM)
│   │   ├── index.js                    # Model initialization & relationships
│   │   ├── User.js                     # User model (authentication)
│   │   ├── Contract.js                 # Contract model
│   │   ├── PurchaseOrder.js            # Purchase Order model
│   │   └── Resource.js                 # Resource/Employee model
│   │
│   ├── 📁 routes/                      # API route definitions
│   │   ├── auth.js                     # Authentication routes (/api/auth/*)
│   │   ├── contracts.js                # Contract routes (/api/contracts/*)
│   │   ├── purchaseOrders.js           # PO routes (/api/purchase-orders/*)
│   │   └── resources.js                # Resource routes (/api/resources/*)
│   │
│   ├── 📁 utils/                       # Utility functions
│   │   └── notifications.js            # Email notification system & cron jobs
│   │
│   ├── index.js                        # Server entry point
│   └── seed.js                         # Database seeding script (sample data)
│
├── 📁 client/                          # Frontend React application
│   ├── 📁 public/                      # Static assets
│   │   └── vite.svg                    # Vite logo
│   │
│   ├── 📁 src/                         # Source code
│   │   ├── 📁 assets/                  # Images, icons, etc.
│   │   │   └── react.svg               # React logo
│   │   │
│   │   ├── 📁 components/              # Reusable React components
│   │   │   ├── Layout.jsx              # Main layout wrapper with navigation
│   │   │   ├── Layout.css              # Layout styles
│   │   │   └── PrivateRoute.jsx        # Protected route wrapper
│   │   │
│   │   ├── 📁 contexts/                # React Context providers
│   │   │   └── AuthContext.jsx         # Authentication context & state
│   │   │
│   │   ├── 📁 pages/                   # Page components (routes)
│   │   │   ├── Login.jsx               # Login page
│   │   │   ├── Login.css               # Login page styles
│   │   │   ├── Register.jsx            # User registration page
│   │   │   ├── Dashboard.jsx           # Main dashboard (home page)
│   │   │   ├── Dashboard.css           # Dashboard styles
│   │   │   ├── Contracts.jsx           # Contract management page
│   │   │   ├── Contracts.css           # Contracts page styles
│   │   │   ├── Resources.jsx           # Resource management page
│   │   │   └── PurchaseOrders.jsx      # Purchase Order management page
│   │   │
│   │   ├── 📁 services/                # API service layer
│   │   │   ├── api.js                  # Axios instance & interceptors
│   │   │   └── index.js                # API service functions
│   │   │
│   │   ├── App.jsx                     # Root React component & routing
│   │   ├── App.css                     # App-level styles
│   │   ├── main.jsx                    # React entry point
│   │   └── index.css                   # Global styles
│   │
│   ├── index.html                      # HTML entry point
│   ├── vite.config.js                  # Vite configuration
│   ├── eslint.config.js                # ESLint configuration
│   ├── package.json                    # Frontend dependencies
│   ├── package-lock.json               # Locked dependency versions
│   ├── .env.example                    # Example environment variables
│   ├── .gitignore                      # Git ignore rules (client-specific)
│   └── README.md                       # Frontend-specific documentation
│
├── 📁 docs/                            # Documentation
│   └── 📁 developer-portal/            # Developer portal (HTML/CSS/JS)
│       ├── index.html                  # Portal entry point
│       ├── 📁 js/                      # Portal JavaScript
│       │   ├── app.js                  # Portal logic
│       │   └── data.js                 # Sample data (mockups, tasks)
│       └── 📁 styles/                  # Portal styles
│           └── main.css                # Portal CSS
│
├── 📄 Configuration & Environment
│   ├── .env.example                    # Example environment variables (root)
│   ├── .gitignore                      # Git ignore rules (root)
│   ├── package.json                    # Root dependencies & scripts
│   ├── package-lock.json               # Locked dependency versions
│   └── test-app.sh                     # Shell script to test the app
│
├── 📄 Documentation Files
│   ├── README.md                       # Main project documentation
│   ├── QUICKSTART.md                   # Quick start guide
│   ├── DEPLOYMENT.md                   # Deployment instructions
│   ├── SECURITY.md                     # Security guidelines & best practices
│   ├── PROJECT_STRUCTURE.md            # This file - repository structure
│   ├── DEVELOPER_ONBOARDING.md         # Developer onboarding guide
│   ├── REQUIREMENTS.md                 # Project requirements summary
│   └── Unified Timesheet & Contract Management System - Technical Specification.pdf
│
└── 📁 .git/                            # Git version control

```

---

## Directory Purposes

### 🔹 `/server/` - Backend Application
The backend is built with **Node.js** and **Express.js**, using **SQLite** with **Sequelize ORM** for data persistence.

**Key Responsibilities:**
- RESTful API endpoints
- Authentication & authorization (JWT)
- Database operations (CRUD)
- Business logic
- Automated notifications (email alerts for expiring contracts)
- Scheduled tasks (cron jobs)

**Technology Stack:**
- Node.js + Express.js
- SQLite + Sequelize ORM
- JWT (JSON Web Tokens)
- Bcrypt (password hashing)
- Nodemailer (email notifications)
- Node-cron (scheduled tasks)

---

### 🔹 `/client/` - Frontend Application
The frontend is a **React** single-page application (SPA) built with **Vite** for fast development.

**Key Responsibilities:**
- User interface & interactions
- API communication
- State management (React Context)
- Routing (React Router)
- Form handling & validation
- Responsive design

**Technology Stack:**
- React 18
- React Router (navigation)
- Axios (HTTP client)
- Vite (build tool)
- CSS3 (styling)

---

### 🔹 `/docs/` - Documentation & Tools
Contains project documentation and developer tools.

**`/docs/developer-portal/`**
- Static HTML/CSS/JS developer portal
- UI mockups gallery
- Requirements documentation viewer
- Onboarding task board
- Independent of the main application

---

## Key Files Explained

### Root Level Files

| File | Purpose |
|------|---------|
| `package.json` | Root package file with scripts to run both client and server |
| `package-lock.json` | Locked versions of root dependencies |
| `.env.example` | Template for environment variables (copy to `.env`) |
| `.gitignore` | Files/folders to exclude from version control |
| `README.md` | Main project documentation |
| `QUICKSTART.md` | Quick start guide for developers |
| `DEPLOYMENT.md` | Production deployment instructions |
| `SECURITY.md` | Security best practices and guidelines |
| `PROJECT_STRUCTURE.md` | This file - repository structure guide |
| `DEVELOPER_ONBOARDING.md` | Onboarding guide for new developers |
| `REQUIREMENTS.md` | Project requirements and specifications |
| `test-app.sh` | Shell script to test the application |

### Server Files

| File | Purpose |
|------|---------|
| `server/index.js` | Main server entry point - starts Express server |
| `server/seed.js` | Database seeding script (creates sample data) |
| `server/config/database.js` | Database connection configuration |
| `server/models/index.js` | Initializes models and defines relationships |
| `server/middleware/auth.js` | JWT verification middleware |
| `server/utils/notifications.js` | Email notifications & scheduled checks |

### Client Files

| File | Purpose |
|------|---------|
| `client/index.html` | HTML entry point for React app |
| `client/src/main.jsx` | React entry point - renders App component |
| `client/src/App.jsx` | Root component with routing configuration |
| `client/vite.config.js` | Vite build tool configuration |
| `client/eslint.config.js` | ESLint code quality rules |

---

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client (React)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Pages     │  │ Components  │  │  Services   │        │
│  │             │  │             │  │             │        │
│  │ - Login     │  │ - Layout    │  │ - API calls │        │
│  │ - Dashboard │  │ - Private   │  │ - Axios     │        │
│  │ - Contracts │  │   Route     │  │             │        │
│  │ - Resources │  │             │  │             │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│                           │                                 │
│                    Context (State)                          │
│                   - AuthContext                             │
└───────────────────────────┬─────────────────────────────────┘
                            │
                    HTTP/REST API
                            │
┌───────────────────────────┼─────────────────────────────────┐
│                     Server (Express)                        │
│                           │                                 │
│  ┌─────────────┐  ┌──────▼──────┐  ┌─────────────┐        │
│  │   Routes    │  │ Controllers │  │   Models    │        │
│  │             │  │             │  │             │        │
│  │ - /auth     │  │ - Auth      │  │ - User      │        │
│  │ - /contracts│  │ - Contract  │  │ - Contract  │        │
│  │ - /resources│  │ - Resource  │  │ - Resource  │        │
│  │ - /pos      │  │ - PO        │  │ - PO        │        │
│  └─────────────┘  └─────────────┘  └──────┬──────┘        │
│                                            │                │
│  ┌─────────────┐                           │                │
│  │ Middleware  │                           │                │
│  │ - Auth JWT  │                           │                │
│  └─────────────┘                           │                │
│                                            │                │
│  ┌─────────────┐                           │                │
│  │   Utils     │                           │                │
│  │ - Notify    │                           │                │
│  │ - Cron Jobs │                           │                │
│  └─────────────┘                           │                │
└────────────────────────────────────────────┼────────────────┘
                                             │
                                    ┌────────▼────────┐
                                    │  SQLite Database│
                                    │  (Sequelize ORM)│
                                    └─────────────────┘
```

---

## Development Workflow

### 1. **Local Development**
```bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend
npm run client
```

### 2. **Database Seeding**
```bash
npm run seed
```

### 3. **Production Build**
```bash
npm run build    # Builds frontend
npm start        # Starts production server
```

---

## Port Configuration

| Service | Port | URL |
|---------|------|-----|
| Backend API | 5000 | http://localhost:5000 |
| Frontend Dev | 5173 | http://localhost:5173 |
| Frontend Prod | 5000 | http://localhost:5000 (served by backend) |

---

## Environment Variables

### Backend (`.env` in root)
```env
PORT=5000
JWT_SECRET=your-secret-key-here
NODE_ENV=development

# SMTP Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@rrootshell.com
```

### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## Database Schema

### Tables

1. **Users**
   - id, username, email, password (hashed), role, status, createdAt, updatedAt

2. **Contracts**
   - id, clientName, contractNumber, startDate, endDate, value, status, description, createdAt, updatedAt

3. **Resources**
   - id, name, email, role, skills, status, contractId (FK), createdAt, updatedAt

4. **PurchaseOrders**
   - id, poNumber, startDate, endDate, value, status, resourceId (FK), contractId (FK), createdAt, updatedAt

### Relationships
- Contract → has many Resources
- Contract → has many PurchaseOrders
- Resource → belongs to Contract
- Resource → has many PurchaseOrders
- PurchaseOrder → belongs to Resource
- PurchaseOrder → belongs to Contract

---

## API Endpoints Summary

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user (protected)

### Contracts
- `GET /api/contracts` - List all contracts
- `GET /api/contracts/:id` - Get contract by ID
- `GET /api/contracts/expiring?days=30` - Get expiring contracts
- `POST /api/contracts` - Create contract
- `PUT /api/contracts/:id` - Update contract
- `DELETE /api/contracts/:id` - Delete contract

### Resources
- `GET /api/resources` - List all resources
- `GET /api/resources/:id` - Get resource by ID
- `GET /api/resources/contract/:contractId` - Get resources by contract
- `POST /api/resources` - Create resource
- `PUT /api/resources/:id` - Update resource
- `DELETE /api/resources/:id` - Delete resource

### Purchase Orders
- `GET /api/purchase-orders` - List all POs
- `GET /api/purchase-orders/:id` - Get PO by ID
- `GET /api/purchase-orders/expiring?days=30` - Get expiring POs
- `GET /api/purchase-orders/contract/:contractId` - Get POs by contract
- `POST /api/purchase-orders` - Create PO
- `PUT /api/purchase-orders/:id` - Update PO
- `DELETE /api/purchase-orders/:id` - Delete PO

---

## Testing

### Manual Testing
Use the `test-app.sh` script to test API endpoints:
```bash
./test-app.sh
```

### Areas to Test
- ✅ User registration and login
- ✅ JWT token validation
- ✅ Contract CRUD operations
- ✅ Resource management
- ✅ Purchase order tracking
- ✅ Expiration notifications
- ✅ Email alerts (if SMTP configured)

---

## Future Enhancements

Based on the technical specification, the current codebase is **Phase 1** (contract tracking foundation). Future phases include:

- **Phase 2**: Timesheet management module
- **Phase 3**: Admin configuration panel
- **Phase 4**: Advanced approval workflows
- **Phase 5**: CMG document management
- **Phase 6**: Reporting & analytics
- **Phase 7**: Mobile applications
- **Phase 8**: SSO integration (Azure AD/Okta)

---

## Contributing

When adding new features:
1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Follow the existing directory structure
3. Update relevant documentation
4. Test thoroughly before merging
5. Create a pull request with detailed description

---

## Support

For questions about the project structure:
- Review this document
- Check `DEVELOPER_ONBOARDING.md` for getting started
- See `REQUIREMENTS.md` for feature specifications
- Refer to the Technical Specification PDF for full details

---

**Last Updated:** November 11, 2025  
**Version:** 1.0
