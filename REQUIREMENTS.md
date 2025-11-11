# Requirements Summary

## Project Overview

**Project Name:** Unified Timesheet & Contract Management System  
**Client:** Rrootshell  
**Version:** 1.0  
**Last Updated:** November 11, 2025

This document provides a high-level summary of the project requirements for the Rrootshell Staff Augmentation application. For complete technical specifications, refer to the "Unified Timesheet & Contract Management System - Technical Specification.pdf" document.

---

## Executive Summary

The system is designed to streamline **timesheet management, approval workflows, and contract documentation** for Rrootshell's staff augmentation operations. It serves three distinct user roles with specific permissions and access controls.

### Key Objectives

1. ✅ Unified authentication using company credentials
2. ⏳ Automated timesheet approval workflows (Future)
3. ⏳ Flexible timesheet recipient configuration (Future)
4. ✅ Centralized contract document management (In Progress)
5. ✅ Automated renewal notifications
6. ✅ Role-based access control with data segregation

---

## User Roles & Access Levels

### 1. Employee Role (Basic User)
**Access Level:** Limited to own data

**Capabilities:**
- ✅ Login using company account credentials
- ⏳ Submit monthly/weekly timesheets (Future)
- ⏳ View timesheet submission history (Future)
- ⏳ Track approval status (Future)
- View assigned projects
- View personal profile

**Restrictions:**
- ❌ Cannot view bill rates or payroll information
- ❌ Cannot access admin or CMG functions
- ❌ Cannot view other employees' data

---

### 2. Admin Role (Administrative)
**Access Level:** Full system configuration

**Sub-categories:**
- Accounts Team Admin
- Time Management Team Admin
- Leadership Admin

**Capabilities:**
- ✅ Add/edit/deactivate employee records
- ✅ Configure employee details and project assignments
- ✅ Set and manage pay rates (admin-only visibility)
- ✅ Configure bill rates per employee/project
- ⏳ Manage approval workflows (Future)
- ⏳ Configure timesheet recipients (Future)
- ✅ View and export data
- ✅ Generate reports
- ✅ Manage user access and permissions

**Restrictions:**
- ❌ Cannot access CMG document management functions
- Bill rates are segregated and not visible to employees

---

### 3. Contract Management Group (CMG) Role
**Access Level:** Document management

**Capabilities:**
- ✅ Upload and manage contract documents (MSA, PO, SOW, NDAs)
- ✅ Associate documents with employees and projects
- ✅ Set document expiration dates and renewal periods
- ✅ Receive automated renewal notifications
- ⏳ Track document versions (Future)
- ✅ Generate contract status reports
- ✅ Search and filter documents
- ✅ Export contract data

**Restrictions:**
- ❌ Cannot access timesheet data
- ❌ Cannot view employee pay/bill rates
- ❌ Cannot modify employee records
- Read-only access to employee-project assignments

---

## Core Modules

### Module 1: Authentication & Authorization ✅ (Implemented)

**Requirements:**
- Company SSO integration (OAuth 2.0 / SAML 2.0)
- Multi-factor authentication support
- Session management and token refresh
- Password reset and account recovery
- Role-based access control (RBAC)

**Current Status:**
- ✅ JWT-based authentication
- ✅ Role-based access control
- ✅ Secure password hashing (bcrypt)
- ⏳ SSO integration (Future - Azure AD/Okta)
- ⏳ MFA support (Future)

---

### Module 2: Timesheet Management ⏳ (Future Phase)

#### 2.1 Timesheet Creation
**Requirements:**
- Dynamic form based on assigned format (weekly/monthly)
- Project-based time entry with task descriptions
- Support for multiple projects per timesheet
- Draft save functionality
- Time validation rules
- Comments and notes section

#### 2.2 Approval Workflow
**Requirements:**
- Employee submits timesheet
- Auto-routed to reporting manager
- Manager reviews and approves/rejects
- Upon approval, distributed to configured recipients
- All parties notified of final status

**Features:**
- Bulk approval for managers
- Rejection with mandatory comments
- Edit and resubmit functionality
- Approval deadline reminders
- Escalation for overdue approvals

#### 2.3 Timesheet Distribution
**Requirements:**
- Configurable recipient lists per employee
- Automatic distribution to teams (Time Management, Accounts, Leadership)
- Email delivery with PDF attachment
- Secure portal access
- Read receipts and tracking

**Current Status:** Not yet implemented

---

### Module 3: Contract Management ✅ (Implemented - Phase 1)

#### 3.1 Contract Tracking
**Requirements:**
- Track client contracts with full details
- Contract status management (Active, Expired, Pending)
- Contract value and date tracking
- Associate contracts with employees
- Search and filter capabilities

**Current Status:**
- ✅ Full CRUD operations
- ✅ Contract listing with status
- ✅ Contract details view
- ✅ Expiration tracking
- ✅ Search and filter

#### 3.2 Resource Management
**Requirements:**
- Assign employees/resources to contracts
- Track resource roles and skills
- Resource status management
- Multiple resources per contract
- Resource assignment history

**Current Status:**
- ✅ Resource CRUD operations
- ✅ Contract association
- ✅ Status tracking
- ✅ Resource listing and details

#### 3.3 Purchase Order Management
**Requirements:**
- Track POs for each resource
- PO expiration monitoring
- PO value tracking
- Associate POs with resources and contracts
- Status management

**Current Status:**
- ✅ Full PO CRUD operations
- ✅ Expiration tracking
- ✅ Contract and resource association
- ✅ Status management

---

### Module 4: Document Management ⏳ (Partial - Future Enhancement)

#### 4.1 Document Upload & Organization
**Requirements:**
- Support multiple file formats (PDF, Word, Excel, images)
- Document categorization (MSA, PO, SOW, NDA, Disclosures)
- Metadata capture (name, type, employee, project, dates)
- Bulk upload capability
- Document templates

**Current Status:**
- ⏳ Partially implemented (structure exists)
- Future enhancement needed for file uploads

#### 4.2 Document Association
**Requirements:**
- Link documents to employees
- Associate with specific projects
- Tag system for categorization
- Search by employee, project, or document attributes

#### 4.3 Renewal Tracking & Notifications ✅ (Implemented)
**Requirements:**
- Automated notifications at intervals:
  - 90 days before expiration
  - 60 days before expiration
  - 30 days before expiration
  - 15 days before expiration
  - 7 days before expiration
  - Day of expiration and daily thereafter

**Notification Content:**
- Document/contract type and name
- Associated employee and project
- Expiration date
- Days remaining
- Action items

**Current Status:**
- ✅ Email notification system implemented
- ✅ Scheduled cron jobs (daily at 9 AM)
- ✅ 30-day expiration alerts
- ⏳ Multi-tier notification schedule (Future)

#### 4.4 Document Version Control ⏳ (Future)
**Requirements:**
- Upload new versions with history
- Compare versions side-by-side
- Track who uploaded and when
- Rollback capability

---

### Module 5: Admin Configuration ⏳ (Partial - Future Enhancement)

#### 5.1 Employee Management ✅ (Basic Implementation)
**Requirements:**
- Create new employee records
- Edit existing employee information
- Deactivate employees (soft delete)
- Import from CSV/Excel
- Export employee data

**Employee Information Fields:**
- Personal details (name, ID, email, phone)
- Employment details (department, designation, join date)
- Project assignments
- Timesheet settings (format, reporting manager)
- Compensation (pay rate - admin only)
- Bill rate (per project or default - admin only)

**Current Status:**
- ✅ Basic resource management
- ⏳ Full employee profile management (Future)
- ⏳ Import/export functionality (Future)
- ⏳ Pay/bill rate configuration (Future)

#### 5.2 Project Management ⏳ (Future)
**Requirements:**
- Create and manage projects
- Assign employees to projects
- Set project-specific bill rates
- Define project duration and milestones
- Archive completed projects

#### 5.3 Workflow Configuration ⏳ (Future)
**Requirements:**
- Define approval hierarchies
- Set up reporting manager relationships
- Configure timesheet recipient groups
- Create custom approval rules

#### 5.4 Rate Management ⏳ (Future - Critical)
**Pay Rate Configuration:**
- Set default pay rates per employee
- Override rates for specific projects
- Support hourly, daily, or monthly rates
- Effective date ranges for rate changes
- Audit trail of rate modifications

**Bill Rate Configuration:**
- Set default bill rates per employee
- Project-specific bill rate overrides
- Client-based billing configurations
- Rate card management

**Security Requirements:**
- Pay and bill rates encrypted at rest
- Access logs for viewing/modification
- Visible only to authorized admin users
- Excluded from all employee and CMG exports

---

### Module 6: Reporting & Analytics ⏳ (Partial - Future Enhancement)

#### 6.1 Employee Reports ⏳
- Timesheet submission history
- Project time breakdown
- Personal timesheet statistics

#### 6.2 Admin Reports ⏳
- Timesheet submission compliance rates
- Approval turnaround times
- Time spent by project/employee
- Labor cost analysis (using pay rates)
- Revenue analysis (using bill rates)
- Employee utilization rates
- Custom report builder

#### 6.3 CMG Reports ✅ (Basic Implementation)
**Requirements:**
- Documents expiring in next 30/60/90 days
- Expired documents requiring action
- Documents by employee/project
- Renewal completion rates
- Compliance status reports
- Document upload activity

**Current Status:**
- ✅ Expiring contracts dashboard
- ✅ Contract status reports
- ⏳ Advanced filtering and custom reports (Future)

#### 6.4 Export Capabilities ⏳
- PDF, Excel, CSV formats
- Scheduled report delivery via email
- Custom date ranges and filters
- Data visualization with charts

---

## Data Security & Privacy Requirements

### 1. Authentication & Authorization ✅ (Partial)
- ✅ SSL/TLS encryption for data in transit
- ✅ Encrypted storage for sensitive data
- ✅ Role-based access control
- ⏳ Session timeout and automatic logout (Future)
- ⏳ IP whitelisting for admin access (Future)

### 2. Data Segregation ✅ (Implemented)
- ✅ Logical separation of employee, admin, and CMG data
- ✅ Database-level access controls
- ✅ API-level permission checks
- ✅ Audit logging for data access

### 3. Document Security ⏳ (Future)
- Secure document storage with access controls
- Virus scanning on upload
- Watermarking for sensitive documents
- Download tracking and restrictions
- Document retention policies

### 4. Compliance Requirements ⏳
- GDPR compliance for personal data handling
- SOC 2 Type II considerations
- Regular security audits and penetration testing
- Data backup and disaster recovery procedures
- Audit trails for all critical operations

---

## Technical Requirements

### Technology Stack

**Backend:**
- ✅ Node.js with Express.js
- ✅ SQLite database with Sequelize ORM
- ✅ JWT tokens for session management
- ⏳ Redis for caching (Future)

**Frontend:**
- ✅ React.js for responsive web application
- ✅ Vite for build tooling
- ✅ Context API for state management
- ⏳ React Native for mobile apps (Future)

**Authentication:**
- ✅ JWT-based authentication
- ⏳ OAuth 2.0 / SAML 2.0 for SSO (Future)
- ⏳ Azure AD or Okta integration (Future)

**Infrastructure:**
- ⏳ Cloud hosting (AWS, Azure, or GCP) (Future)
- ⏳ Docker containers for microservices (Future)
- ⏳ CI/CD pipeline (Future)

**Additional Services:**
- ✅ Nodemailer for email notifications
- ⏳ SMS notifications via Twilio (Future)
- ⏳ Logging and monitoring (Future)

---

## Integration Requirements

### Required Integrations ⏳
- Company SSO/Identity Provider (Azure AD, Okta)
- Email service (SMTP, SendGrid, AWS SES)
- Document storage (AWS S3, Azure Blob Storage)

### Optional Integrations ⏳
- Payroll systems (ADP, SAP)
- Project management tools (Jira, Asana)
- CRM systems (Salesforce)
- Accounting software (QuickBooks, Xero)
- Calendar systems (Google Calendar, Outlook)
- Slack/Teams for notifications

---

## Development Phases

### Phase 1: Foundation (CURRENT) ✅
**Timeline:** Weeks 1-4 (Completed)
- ✅ Architecture setup and infrastructure
- ✅ Database schema design
- ✅ Authentication and authorization framework
- ✅ Basic UI framework

### Phase 2: Contract Management (CURRENT) ✅
**Timeline:** Weeks 5-8 (Completed)
- ✅ Contract CRUD operations
- ✅ Resource management
- ✅ Purchase order tracking
- ✅ Basic notification system

### Phase 3: Timesheet Module ⏳
**Timeline:** Weeks 9-15 (Upcoming)
- Timesheet creation interface
- Submission workflow
- Employee dashboard
- Approval workflow engine

### Phase 4: Admin Module ⏳
**Timeline:** Weeks 16-19 (Future)
- Employee management interface
- Project and assignment management
- Rate configuration (pay and bill)
- Workflow configuration

### Phase 5: CMG Module Enhancement ⏳
**Timeline:** Weeks 20-22 (Future)
- Document upload and storage
- Advanced renewal tracking
- Version control

### Phase 6: Reporting & Analytics ⏳
**Timeline:** Weeks 23-26 (Future)
- Report builder
- Dashboard visualizations
- Export functionality

### Phase 7: Testing & Refinement ⏳
**Timeline:** Weeks 27-28 (Future)
- Comprehensive testing
- Performance optimization
- Security audit

### Phase 8: Deployment & Training ⏳
**Timeline:** Weeks 29-30 (Future)
- Production deployment
- User training
- Go-live support

---

## Success Metrics & KPIs

### Key Performance Indicators

**Timesheet Management:**
- Submission rate target: 95% on-time ⏳
- Average approval turnaround: <48 hours ⏳
- User adoption rate: 90% within first month ⏳

**Contract Management:**
- Document renewal compliance: 100% before expiration ✅
- Notification accuracy: 100% ✅
- System uptime: 99.9% ✅

**User Experience:**
- User satisfaction score: 4.5/5 ⏳
- Training completion rate: 100% ⏳

---

## Business Impact Goals

1. ✅ Reduction in manual contract processing time
2. ✅ Improved contract compliance and renewal rates
3. ⏳ Enhanced visibility into labor costs and billing
4. ⏳ Reduced administrative overhead
5. ✅ Better audit trail and compliance reporting

---

## Future Enhancements (Post-MVP)

### Phase 2 Features
- ⏳ Mobile application (native iOS and Android)
- ⏳ Advanced analytics with ML insights
- ⏳ Chatbot for support
- ⏳ Email-based approvals
- ⏳ Biometric authentication for mobile

### Phase 3 Features
- ⏳ Multi-currency support
- ⏳ Advanced workflow automation
- ⏳ Time tracking tool integration
- ⏳ E-signature integration
- ⏳ Document OCR for data extraction
- ⏳ Predictive analytics for resource planning

---

## Risk Management

### Identified Risks
1. Data security breach
2. System downtime during critical periods
3. User adoption resistance
4. Integration challenges with existing systems
5. Performance issues with large data volumes

### Mitigation Strategies
- ✅ Comprehensive security measures
- ✅ Regular backups
- ⏳ High availability architecture (Future)
- ⏳ Change management and training programs (Future)
- ⏳ Performance testing and optimization (Future)

---

## Glossary

| Term | Definition |
|------|------------|
| **MSA** | Master Service Agreement |
| **PO** | Purchase Order |
| **SOW** | Statement of Work |
| **NDA** | Non-Disclosure Agreement |
| **SSO** | Single Sign-On |
| **RBAC** | Role-Based Access Control |
| **CMG** | Contract Management Group |
| **JWT** | JSON Web Token |
| **CRUD** | Create, Read, Update, Delete |

---

## Status Legend

- ✅ **Implemented** - Feature is complete and functional
- ⏳ **Future** - Planned for future development
- 🔄 **In Progress** - Currently being developed
- ❌ **Restricted** - Intentionally blocked for role

---

## Document References

For more detailed information, refer to:

1. **Technical Specification PDF** - Complete system requirements (included in repository)
2. **PROJECT_STRUCTURE.md** - Repository structure and architecture
3. **DEVELOPER_ONBOARDING.md** - Developer setup and workflow guide
4. **DEPLOYMENT.md** - Deployment instructions
5. **SECURITY.md** - Security guidelines and best practices

---

## Questions & Clarifications

For requirement clarifications or questions:
1. Review the Technical Specification PDF
2. Check with the project manager
3. Create a GitHub issue for tracking
4. Document decisions in project wiki

---

**Document Owner:** Technical IT Manager  
**Last Updated:** November 11, 2025  
**Next Review:** December 11, 2025  
**Version:** 1.0
