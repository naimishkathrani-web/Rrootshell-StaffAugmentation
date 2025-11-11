# Quick Start Guide

Get the Rrootshell Staff Augmentation Tracking System up and running in 5 minutes!

## For Development

```bash
# 1. Clone the repository
git clone https://github.com/naimishkathrani-web/Rrootshell-StaffAugmentation.git
cd Rrootshell-StaffAugmentation

# 2. Install dependencies
npm run install-all

# 3. Seed the database with sample data
npm run seed

# 4. Start the backend server (in one terminal)
npm run dev

# 5. Start the frontend (in another terminal)
npm run client
```

Access the application at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Default Login Credentials

**Admin Account:**
- Username: `admin`
- Password: `admin123`

**Director Account:**
- Username: `director`
- Password: `director123`

⚠️ **Change these passwords immediately after first login!**

## Quick Test

1. Login with admin credentials
2. Navigate to **Contracts** page
3. Click **Add Contract** to create a new contract
4. Navigate to **Resources** page to add employees
5. Navigate to **Purchase Orders** page to track POs
6. Check the **Dashboard** for expiration alerts

## Features to Try

- ✅ Create contracts with different expiration dates
- ✅ Add resources and associate them with contracts
- ✅ Create purchase orders for each resource
- ✅ View expiring contracts on the dashboard (items expiring within 30 days)
- ✅ Check notification system in server logs

## Email Notifications Setup (Optional)

To enable email notifications:

1. Copy `.env.example` to `.env`
2. Add your SMTP credentials:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```
3. Restart the server

The system will automatically check for expiring contracts daily at 9 AM and send email alerts to all directors.

## Need Help?

- 📖 See [README.md](README.md) for detailed documentation
- 🚀 See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- 🐛 For issues, check the server logs with `pm2 logs` or console output

## Next Steps

1. Customize the application for your specific needs
2. Set up production environment following [DEPLOYMENT.md](DEPLOYMENT.md)
3. Configure email notifications
4. Add your actual contracts and resources
5. Set up automated backups
