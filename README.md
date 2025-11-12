# Rrootshell Staff Augmentation Platform

> A comprehensive platform for managing contracts, resources, timesheets, and purchase orders in staff augmentation operations

**Status:** 🎨 **Design Review Phase** - Mockups ready for business owner approval

---

## 🚀 Quick Start for Developers

### For Business Owners
1. Open `index.html` in a browser
2. Click **"Mockups"** to review the UI designs
3. Test the login flow with role-based dashboards (Admin vs Employee)
4. Approve designs before development begins

### For Developers
1. **After approval**, review the **[12-Day Sprint Plan](./onboarding/12-day-sprint.html)**
2. Open the sprint plan to see your daily tasks
3. Use the GitHub Copilot prompts provided in each task
4. Build the real application in `/app`, `/server`, and `/database` folders

---

## 📁 Repository Structure

```
Rrootshell-StaffAugmentation/
├── index.html                    # Developer portal homepage
├── app-login.html               # Real app entry (currently shows "Build not started")
│
├── mockups/                     # ✅ UI mockups for business review
│   ├── login.html              # Login with role selector
│   ├── admin-dashboard.html    # Admin dashboard (full access)
│   ├── employee-dashboard.html # Employee dashboard (limited)
│   ├── contracts.html          # Contract management
│   ├── resources.html          # Resource management
│   ├── purchase-orders.html    # PO tracking
│   ├── timesheets.html         # Timesheet entry & approval
│   └── ... (12 mockup pages total)
│
├── onboarding/                  # 📚 Developer onboarding
│   ├── 12-day-sprint.html      # ⭐ MAIN PLAN for 3 developers
│   └── index.html              # Full 4-week program (optional)
│
├── requirements/                # 📋 Business requirements
│   └── index.html              # Complete requirements doc
│
├── /app                         # 🚧 React frontend (TO BE BUILT)
├── /server                      # 🚧 Node.js backend (TO BE BUILT)
└── /database                    # 🚧 MongoDB schemas (TO BE BUILT)
```

---

## 🎯 Project Overview

**What:** Staff Augmentation Platform for managing:
- 📄 **Contracts** - Client contracts with expiration tracking
- 👥 **Resources** - Employee assignments and skills
- 💰 **Purchase Orders** - PO tracking and utilization
- ⏱️ **Timesheets** - Weekly time entry and approval
- 📊 **Reports** - Analytics and financial reports
- 🔐 **Role-Based Access** - Admin (full) vs Employee (limited)

**Target Deployment:** GoDaddy subdomain of www.rrootshell.com  
**Timeline:** 12 working days (Target: End of November 2025)  
**Team:** 3 developers (Frontend, Backend, Full Stack/DevOps)

---

## 👥 User Roles

### Admin Role (Full Access)
- View and manage all contracts, resources, POs
- Approve/reject timesheets from all employees
- Generate reports and analytics
- Manage users and system settings
- Access admin panel

### Employee Role (Limited Access)
- Submit own timesheets
- View/edit own profile
- View notifications relevant to them
- View assigned contract details
- **Cannot** access other employees' data

---

## 🛠️ Tech Stack

### Frontend (To Be Built)
- **React** + **Vite** + **TypeScript**
- **TailwindCSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Recharts** for data visualization

### Backend (To Be Built)
- **Node.js** + **Express** + **TypeScript**
- **MongoDB** with **Mongoose** ORM
- **JWT** authentication
- **bcrypt** for password hashing
- **Joi** for validation

### Deployment
- **Frontend:** GoDaddy static hosting
- **Backend:** GoDaddy Node.js hosting with PM2
- **Database:** MongoDB Atlas (cloud)
- **Domain:** Subdomain of www.rrootshell.com

---

## 📖 How to Use This Repository

### Phase 1: Design Review (Current)
1. Business owner opens `index.html`
2. Clicks **"Mockups"** to review UI
3. Tests login flow: Admin vs Employee dashboards
4. Reviews all 12 mockup pages
5. Approves or requests changes

### Phase 2: Development (After Approval)
1. Developers open `onboarding/12-day-sprint.html`
2. Each developer follows their track:
   - **Frontend Developer** - Days 1-12
   - **Backend Developer** - Days 1-12  
   - **Full Stack/DevOps** - Days 1-12
3. Use GitHub Copilot prompts for each task
4. Build in `/app`, `/server`, `/database` folders
5. Reference `mockups/` for UI and `requirements/` for specs

### Phase 3: Deployment
1. Build frontend: `npm run build` in `/app`
2. Deploy frontend to GoDaddy subdomain
3. Deploy backend to GoDaddy with PM2
4. Configure MongoDB Atlas connection
5. Run smoke tests on production

---

## 🚀 Getting Started (After Approval)

### Step 1: Setup Development Environment
```bash
# Clone repository (already done)
cd Rrootshell-StaffAugmentation

# Create React frontend
npm create vite@latest app -- --template react-ts
cd app
npm install react-router-dom axios tailwindcss
npm run dev

# Create Node.js backend (in new terminal)
mkdir server && cd server
npm init -y
npm install express mongoose jsonwebtoken bcrypt cors dotenv
npm install -D typescript @types/node @types/express ts-node nodemon
```

### Step 2: Follow Your Track
- **Frontend:** See `onboarding/12-day-sprint.html` → Frontend Developer section
- **Backend:** See `onboarding/12-day-sprint.html` → Backend Developer section
- **DevOps:** See `onboarding/12-day-sprint.html` → Full Stack/DevOps section

### Step 3: Use GitHub Copilot
Each day has a **GitHub Copilot Prompt** you can copy/paste into Copilot Chat:
1. Open GitHub Copilot Chat (Ctrl+Shift+I)
2. Copy the prompt from the dark box
3. Paste and press Enter
4. Review generated code
5. Test and iterate

---

## 📋 Key Features to Build

### Phase 1: Authentication & Navigation ✅ (In Mockups)
- [x] Login page with role selector
- [x] Admin dashboard with 7-item navigation
- [x] Employee dashboard with 4-item navigation
- [x] Session-based authentication

### Phase 2: Core Modules 🚧 (To Be Built)
- [ ] Contracts CRUD with expiration warnings
- [ ] Resources management with skills tracking
- [ ] Purchase Orders with utilization monitoring
- [ ] Timesheets entry and approval workflow
- [ ] Reports and analytics dashboard

### Phase 3: Advanced Features 🚧 (To Be Built)
- [ ] Document management and upload
- [ ] Notifications center with filters
- [ ] Admin panel for user management
- [ ] Email notifications for expirations
- [ ] Profile management

---

## 🔒 Security Features

- JWT-based authentication with 7-day expiration
- Password hashing with bcrypt (10 salt rounds)
- Role-based access control (RBAC)
- Protected API routes
- Input validation and sanitization
- CORS configuration
- Rate limiting on authentication endpoints

---

## 📊 Database Schema (To Be Implemented)

```typescript
// User Model
interface User {
  email: string;
  password: string; // hashed
  role: 'admin' | 'employee';
  name: string;
  phone?: string;
  status: 'active' | 'inactive';
  lastLogin?: Date;
  createdAt: Date;
}

// Contract Model
interface Contract {
  contractId: string;
  clientName: string;
  clientContact: string;
  email: string;
  phone: string;
  value: number;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'expiring' | 'expired' | 'draft';
  description?: string;
  createdBy: ObjectId; // ref: User
  createdAt: Date;
}

// Resource Model
interface Resource {
  name: string;
  email: string;
  phone?: string;
  role: string;
  hourlyRate: number;
  monthlyRate: number;
  status: 'assigned' | 'available' | 'bench';
  skills: string[];
  avatar?: string;
  assignedContract?: ObjectId; // ref: Contract
}

// ... (See requirements/index.html for complete schema)
```

---

## 📞 Support

- **Issues:** Open a GitHub issue
- **Questions:** See `requirements/index.html` for detailed specs
- **Daily Standup:** 9 AM to sync progress (during sprint)

---

## 📄 License

ISC - Rrootshell Internal Use Only

---

**Ready to build?** 🚀 Open `onboarding/12-day-sprint.html` and start with Day 1!

