# Rrootshell Staff Augmentation System

> A comprehensive unified platform for timesheet management and contract tracking

A full-stack web application designed to streamline Rrootshell's staff augmentation operations, including contract management, resource tracking, purchase order monitoring, and automated renewal notifications.

---

## 📚 Documentation

**New to the project?** Start here:

- 📖 **[DEVELOPER_ONBOARDING.md](./DEVELOPER_ONBOARDING.md)** - Complete setup guide for new developers
- 🏗️ **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Detailed repository structure and architecture
- 📋 **[REQUIREMENTS.md](./REQUIREMENTS.md)** - Feature requirements and specifications for the entire team
- ⚡ **[QUICKSTART.md](./QUICKSTART.md)** - Quick start guide (5-minute setup)
- 🚀 **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment instructions
- 🔒 **[SECURITY.md](./SECURITY.md)** - Security guidelines and best practices

**Developer Portal:** Open `docs/developer-portal/index.html` for UI mockups, requirements viewer, and task management.

**Technical Specification:** See the included PDF for complete system requirements.

---

## 🎯 Project Vision

Building a **Unified Timesheet & Contract Management System** that integrates:
1. **Timesheet Management** - Employee time tracking and approval workflows (Future Phase)
2. **Contract Management** - Client contract and resource tracking (Current Phase ✅)
3. **Document Management** - Contract document uploads and renewal tracking (Future Enhancement)

**Current Status:** Phase 1 Complete - Contract Tracking Foundation

---

## Features

- 📋 **Contract Management**: Track all client contracts with detailed information
- 👥 **Resource Management**: Manage deployed employees/resources under each contract
- 📄 **Purchase Order Tracking**: Monitor POs for each resource with expiration dates
- 🔔 **Automated Notifications**: Email alerts for expiring contracts and purchase orders
- 📊 **Dashboard**: Real-time overview of contracts, resources, and upcoming expirations
- 🔐 **Authentication**: Secure login system with role-based access control
- ⚡ **Real-time Updates**: Instant notifications for contracts expiring within 30 days

## Tech Stack

### Backend
- **Node.js** with Express.js
- **SQLite** database with Sequelize ORM
- **JWT** for authentication
- **Node-cron** for scheduled notification checks
- **Nodemailer** for email notifications

### Frontend
- **React** with Vite
- **React Router** for navigation
- **Axios** for API calls
- **Context API** for state management

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/naimishkathrani-web/Rrootshell-StaffAugmentation.git
cd Rrootshell-StaffAugmentation
```

2. Install dependencies for both backend and frontend:
```bash
npm run install-all
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and configure the following:
- `JWT_SECRET`: Your secret key for JWT tokens
- `SMTP_*`: Email configuration for notifications (optional)

## Running the Application

### Development Mode

1. Start the backend server:
```bash
npm run dev
```
The server will run on `http://localhost:5000`

2. In a new terminal, start the frontend:
```bash
npm run client
```
The client will run on `http://localhost:5173`

### Production Build

1. Build the frontend:
```bash
npm run build
```

2. Start the server:
```bash
npm start
```

The application will be available at `http://localhost:5000`

## Usage

### First Time Setup

1. Register a new user at `/register`
2. Choose the appropriate role:
   - **Director**: Receives email notifications for expiring contracts
   - **Manager**: Can manage contracts and resources
   - **Admin**: Full system access

### Managing Contracts

1. Navigate to **Contracts** page
2. Click **Add Contract** to create a new contract
3. Fill in client details, contract dates, and value
4. View expiring contracts on the dashboard

### Managing Resources

1. Navigate to **Resources** page
2. Click **Add Resource** to assign an employee to a contract
3. Enter resource details and associate with a contract

### Managing Purchase Orders

1. Navigate to **Purchase Orders** page
2. Click **Add Purchase Order**
3. Link PO to a specific resource and contract
4. Set PO dates and value

### Notifications

- The system automatically checks for expiring contracts and POs daily at 9 AM
- Directors receive email notifications for items expiring within 30 days
- View expiring items on the dashboard

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Contracts
- `GET /api/contracts` - Get all contracts
- `GET /api/contracts/:id` - Get contract by ID
- `GET /api/contracts/expiring?days=30` - Get expiring contracts
- `POST /api/contracts` - Create contract
- `PUT /api/contracts/:id` - Update contract
- `DELETE /api/contracts/:id` - Delete contract

### Resources
- `GET /api/resources` - Get all resources
- `GET /api/resources/:id` - Get resource by ID
- `GET /api/resources/contract/:contractId` - Get resources by contract
- `POST /api/resources` - Create resource
- `PUT /api/resources/:id` - Update resource
- `DELETE /api/resources/:id` - Delete resource

### Purchase Orders
- `GET /api/purchase-orders` - Get all purchase orders
- `GET /api/purchase-orders/:id` - Get PO by ID
- `GET /api/purchase-orders/expiring?days=30` - Get expiring POs
- `GET /api/purchase-orders/contract/:contractId` - Get POs by contract
- `POST /api/purchase-orders` - Create PO
- `PUT /api/purchase-orders/:id` - Update PO
- `DELETE /api/purchase-orders/:id` - Delete PO

## Database Schema

### Contract
- Client name, contract number, dates, value, status, description

### Resource
- Name, email, role, skills, contract association, status

### Purchase Order
- PO number, resource, contract, dates, value, status

### User
- Username, email, password (hashed), role, status

## Notification System

The notification system runs on a scheduled cron job:
- Checks daily at 9:00 AM for expiring contracts and POs
- Sends email alerts to all active directors
- Marks notifications as sent to avoid duplicates
- Configurable threshold (default: 30 days)

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- Role-based access control
- SQL injection prevention via Sequelize ORM

## Project Structure

```
.
├── server/
│   ├── config/         # Database configuration
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Authentication middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── utils/          # Utilities (notifications)
│   └── index.js        # Server entry point
├── client/
│   ├── public/         # Static files
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── contexts/   # Context providers
│   │   ├── pages/      # Page components
│   │   ├── services/   # API services
│   │   └── App.jsx     # Main app component
│   └── package.json
├── .env.example        # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## License

ISC

## Support

For issues and questions, please open an issue on GitHub or contact the development team.

