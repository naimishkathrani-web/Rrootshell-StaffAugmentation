# Developer Onboarding Guide

Welcome to the **Rrootshell Staff Augmentation** project! This guide will help you get up and running quickly.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
3. [Project Overview](#project-overview)
4. [Development Environment Setup](#development-environment-setup)
5. [Running the Application](#running-the-application)
6. [Understanding the Codebase](#understanding-the-codebase)
7. [Development Workflow](#development-workflow)
8. [Common Tasks](#common-tasks)
9. [Debugging Tips](#debugging-tips)
10. [Resources](#resources)

---

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- ✅ **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- ✅ **npm** (comes with Node.js) or **yarn**
- ✅ **Git** - [Download](https://git-scm.com/)
- ✅ **VS Code** (recommended) - [Download](https://code.visualstudio.com/)

### Recommended VS Code Extensions
- ESLint
- Prettier
- ES7+ React/Redux/React-Native snippets
- Thunder Client or REST Client (for API testing)
- GitLens

### Knowledge Requirements
- JavaScript (ES6+)
- React.js fundamentals
- Node.js & Express.js basics
- REST API concepts
- Git version control
- SQL basics (helpful)

---

## Getting Started

### Step 1: Clone the Repository

```bash
git clone https://github.com/naimishkathrani-web/Rrootshell-StaffAugmentation.git
cd Rrootshell-StaffAugmentation
```

### Step 2: Install Dependencies

Install dependencies for both backend and frontend:

```bash
npm run install-all
```

Or manually:

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### Step 3: Configure Environment Variables

Create `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and configure:

```env
PORT=5000
JWT_SECRET=your-super-secret-key-change-this-in-production
NODE_ENV=development

# SMTP Configuration (Optional - for email notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@rrootshell.com
```

**Important:** 
- Generate a strong `JWT_SECRET` (use a random string generator)
- SMTP configuration is optional for development; notifications will log to console without it

Create `client/.env`:

```bash
cd client
cp .env.example .env
```

Edit `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Seed the Database (Optional but Recommended)

Populate the database with sample data:

```bash
npm run seed
```

This creates:
- Sample users (different roles)
- Sample contracts
- Sample resources
- Sample purchase orders

**Default Test Users:**
- **Admin:** `admin` / `admin123`
- **Director:** `john.director` / `director123`
- **Manager:** `jane.manager` / `manager123`

### Step 5: Start Development Servers

**Option A: Two Terminal Windows (Recommended)**

Terminal 1 - Backend:
```bash
npm run dev
```

Terminal 2 - Frontend:
```bash
npm run client
```

**Option B: Concurrent Startup**

If you have `concurrently` installed globally:
```bash
npm run dev & npm run client
```

### Step 6: Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api

Login with one of the test users created by the seed script.

---

## Project Overview

### What Are We Building?

A comprehensive **Unified Timesheet & Contract Management System** for Rrootshell, featuring:

1. **Timesheet Management** (Future Phase)
   - Employee timesheet submission
   - Approval workflows
   - Distribution to multiple teams

2. **Contract Management** (Current Phase)
   - Track client contracts
   - Manage resources/employees
   - Monitor purchase orders
   - Automated expiration notifications

3. **Document Management** (Future Phase)
   - Contract document uploads
   - Renewal tracking
   - Version control

### Current Development Phase

We're currently in **Phase 1: Contract Tracking Foundation**

**What's Implemented:**
- ✅ User authentication & authorization
- ✅ Contract CRUD operations
- ✅ Resource management
- ✅ Purchase order tracking
- ✅ Expiration notifications (email alerts)
- ✅ Dashboard with key metrics

**What's Next:**
- Timesheet management module
- Admin configuration panel
- Advanced approval workflows
- Document management system
- SSO integration

---

## Development Environment Setup

### Folder Structure Overview

```
Rrootshell-StaffAugmentation/
├── server/          # Backend (Node.js + Express)
├── client/          # Frontend (React + Vite)
├── docs/            # Documentation & developer portal
└── [config files]   # Root configuration
```

**See `PROJECT_STRUCTURE.md` for detailed structure.**

### Key Technologies

**Backend:**
- Node.js + Express.js
- SQLite + Sequelize ORM
- JWT authentication
- Node-cron (scheduled tasks)
- Nodemailer (email)

**Frontend:**
- React 18
- React Router v6
- Axios (HTTP client)
- Vite (build tool)
- Context API (state management)

---

## Running the Application

### Development Mode

**Backend (Port 5000):**
```bash
npm run dev
```
Uses `nodemon` for auto-restart on file changes.

**Frontend (Port 5173):**
```bash
npm run client
```
Uses Vite dev server with hot module replacement.

### Production Mode

Build and start:
```bash
npm run build   # Builds frontend to client/dist
npm start       # Starts production server
```

Access at: http://localhost:5000

---

## Understanding the Codebase

### Backend Architecture

**Entry Point:** `server/index.js`

1. **Routes** (`server/routes/`)
   - Define API endpoints
   - Apply middleware (auth)
   - Call controllers

2. **Controllers** (`server/controllers/`)
   - Business logic
   - Request validation
   - Response formatting
   - Error handling

3. **Models** (`server/models/`)
   - Database schema (Sequelize)
   - Relationships between tables
   - Validations

4. **Middleware** (`server/middleware/`)
   - Authentication (JWT verification)
   - Rate limiting (future)
   - Error handling (future)

5. **Utils** (`server/utils/`)
   - Notification system
   - Helper functions

**Example Flow:**
```
Client Request
    ↓
Route (routes/contracts.js)
    ↓
Auth Middleware (middleware/auth.js)
    ↓
Controller (controllers/contractController.js)
    ↓
Model (models/Contract.js)
    ↓
Database (SQLite)
    ↓
Response to Client
```

### Frontend Architecture

**Entry Point:** `client/src/main.jsx` → `App.jsx`

1. **Pages** (`client/src/pages/`)
   - Route components (Dashboard, Contracts, etc.)
   - Page-level state management
   - API calls via services

2. **Components** (`client/src/components/`)
   - Reusable UI components
   - Layout wrapper
   - Private route guard

3. **Contexts** (`client/src/contexts/`)
   - AuthContext - User authentication state
   - Shared across the app

4. **Services** (`client/src/services/`)
   - API communication layer
   - Axios configuration
   - Request/response interceptors

**Example Flow:**
```
User Action (Button Click)
    ↓
Page Component (pages/Contracts.jsx)
    ↓
Service Function (services/index.js)
    ↓
Axios Request (services/api.js)
    ↓
Backend API
    ↓
Update State
    ↓
Re-render UI
```

---

## Development Workflow

### Daily Workflow

1. **Pull Latest Changes**
   ```bash
   git pull origin main
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes & Test**
   - Write code
   - Test in browser
   - Check console for errors

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "Add: description of changes"
   ```

5. **Push & Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Commit Message Conventions

Use clear, descriptive commit messages:

- `Add: new feature or file`
- `Update: modify existing functionality`
- `Fix: bug fix`
- `Refactor: code restructuring`
- `Docs: documentation updates`
- `Style: formatting, no code change`

Examples:
```bash
git commit -m "Add: timesheet submission form"
git commit -m "Fix: contract date validation"
git commit -m "Update: dashboard card styling"
```

---

## Common Tasks

### 1. Adding a New API Endpoint

**Backend Steps:**

1. **Create Controller Function** (`server/controllers/yourController.js`)
   ```javascript
   exports.yourFunction = async (req, res) => {
     try {
       // Your logic here
       res.json({ success: true, data: result });
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
   };
   ```

2. **Add Route** (`server/routes/yourRoutes.js`)
   ```javascript
   const { yourFunction } = require('../controllers/yourController');
   router.get('/endpoint', auth, yourFunction);
   ```

3. **Register Route** (`server/index.js`)
   ```javascript
   app.use('/api/your-resource', require('./routes/yourRoutes'));
   ```

**Frontend Steps:**

4. **Add Service Function** (`client/src/services/index.js`)
   ```javascript
   export const yourApiCall = () => api.get('/your-resource/endpoint');
   ```

5. **Use in Component**
   ```javascript
   const fetchData = async () => {
     const response = await yourApiCall();
     setData(response.data);
   };
   ```

### 2. Creating a New Page

1. **Create Page Component** (`client/src/pages/YourPage.jsx`)
   ```javascript
   import React from 'react';

   export default function YourPage() {
     return (
       <div>
         <h1>Your Page</h1>
       </div>
     );
   }
   ```

2. **Add Route** (`client/src/App.jsx`)
   ```javascript
   <Route path="/your-page" element={
     <PrivateRoute>
       <YourPage />
     </PrivateRoute>
   } />
   ```

3. **Add Navigation** (`client/src/components/Layout.jsx`)
   ```javascript
   <Link to="/your-page">Your Page</Link>
   ```

### 3. Adding a Database Model

1. **Create Model File** (`server/models/YourModel.js`)
   ```javascript
   module.exports = (sequelize, DataTypes) => {
     const YourModel = sequelize.define('YourModel', {
       // Define fields
       name: {
         type: DataTypes.STRING,
         allowNull: false
       }
     });
     return YourModel;
   };
   ```

2. **Register Model** (`server/models/index.js`)
   ```javascript
   const YourModel = require('./YourModel')(sequelize, DataTypes);
   ```

3. **Define Relationships** (if needed)
   ```javascript
   YourModel.belongsTo(OtherModel);
   ```

### 4. Testing API Endpoints

**Using Thunder Client (VS Code Extension):**

1. Install Thunder Client extension
2. Create new request
3. Set method (GET, POST, PUT, DELETE)
4. Set URL: `http://localhost:5000/api/contracts`
5. Add headers (if needed):
   ```
   Authorization: Bearer your-jwt-token
   ```
6. Add body (for POST/PUT)
7. Send request

**Using curl:**
```bash
# Login to get token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Use token in subsequent requests
curl http://localhost:5000/api/contracts \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Debugging Tips

### Backend Debugging

1. **Console Logs**
   ```javascript
   console.log('Debug:', variable);
   ```

2. **Check Server Console**
   - All logs appear in the terminal running `npm run dev`

3. **Database Inspection**
   - SQLite database file: `database.sqlite`
   - Use DB Browser for SQLite: https://sqlitebrowser.org/

4. **Common Issues**
   - Port already in use: Change `PORT` in `.env`
   - Database errors: Delete `database.sqlite` and re-seed
   - JWT errors: Check `JWT_SECRET` in `.env`

### Frontend Debugging

1. **Browser DevTools**
   - Console: `F12` → Console tab
   - Network: Monitor API calls
   - React DevTools: Install browser extension

2. **Console Logs**
   ```javascript
   console.log('State:', state);
   ```

3. **Network Tab**
   - Check API requests/responses
   - Look for 401 (unauthorized) or 500 (server error)

4. **Common Issues**
   - 401 errors: Token expired, login again
   - CORS errors: Check backend CORS configuration
   - Blank page: Check browser console for errors

---

## Resources

### Documentation
- 📄 [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Repository structure
- 📄 [REQUIREMENTS.md](./REQUIREMENTS.md) - Project requirements
- 📄 [QUICKSTART.md](./QUICKSTART.md) - Quick start guide
- 📄 [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment instructions
- 📄 [SECURITY.md](./SECURITY.md) - Security guidelines
- 📄 Technical Specification PDF - Full project specifications

### Developer Portal
Open `docs/developer-portal/index.html` in your browser for:
- UI mockups (when available)
- Requirements documentation
- Task management board

### External Resources
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [Sequelize Docs](https://sequelize.org/)
- [Vite Guide](https://vitejs.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## Getting Help

### When You're Stuck

1. **Check Documentation**
   - Review this guide
   - Check `PROJECT_STRUCTURE.md`
   - Read the Technical Specification PDF

2. **Search the Code**
   - Look for similar implementations
   - Check how existing features are built

3. **Ask the Team**
   - Create a GitHub issue
   - Ask in team chat
   - Schedule a pair programming session

4. **Debug Systematically**
   - Isolate the problem
   - Check logs and error messages
   - Test one thing at a time

---

## Next Steps

Now that you're set up:

1. ✅ Explore the application
   - Login with test users
   - Navigate all pages
   - Test CRUD operations

2. ✅ Review the codebase
   - Read through key files
   - Understand the architecture
   - Follow a request flow

3. ✅ Make your first change
   - Pick a small task
   - Create a feature branch
   - Submit a pull request

4. ✅ Familiarize with requirements
   - Read `REQUIREMENTS.md`
   - Review the Technical Specification
   - Understand the roadmap

---

## Welcome Aboard! 🚀

You're now ready to contribute to the Rrootshell Staff Augmentation project. Happy coding!

**Questions?** Don't hesitate to reach out to the team.

---

**Last Updated:** November 11, 2025  
**Version:** 1.0
