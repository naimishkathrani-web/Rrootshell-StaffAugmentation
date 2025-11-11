# Deployment Guide - Rrootshell Staff Augmentation System

This guide provides step-by-step instructions for deploying the Staff Augmentation Tracking System to production.

## Prerequisites

- Node.js v14 or higher
- npm or yarn
- Domain/subdomain configured (e.g., https://staffaug.rrootshell.com)
- SMTP server access for email notifications (optional but recommended)

## Deployment Steps

### 1. Clone the Repository

```bash
git clone https://github.com/naimishkathrani-web/Rrootshell-StaffAugmentation.git
cd Rrootshell-StaffAugmentation
```

### 2. Install Dependencies

```bash
npm run install-all
```

This will install dependencies for both backend and frontend.

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your production values:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# JWT Secret - IMPORTANT: Change this to a strong random string
JWT_SECRET=your-very-secure-random-secret-key-here

# SMTP Configuration for Email Notifications
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@rrootshell.com
SMTP_PASS=your-app-specific-password

# Frontend URL (for CORS if needed)
FRONTEND_URL=https://staffaug.rrootshell.com
```

**Important Security Notes:**
- Generate a strong JWT secret: `openssl rand -base64 32`
- Never commit the `.env` file to version control
- Use app-specific passwords for Gmail or other SMTP providers
- For Gmail: Enable 2FA and create an app password at https://myaccount.google.com/apppasswords

### 4. Set Up Frontend Environment

Create `client/.env`:

```bash
cp client/.env.example client/.env
```

Edit `client/.env`:

```env
VITE_API_URL=https://staffaug.rrootshell.com/api
```

Or if running on the same domain/subdomain:

```env
VITE_API_URL=/api
```

### 5. Build the Frontend

```bash
npm run build
```

This creates an optimized production build in `client/dist/`.

### 6. Initialize the Database

Run the seeding script to create the database and add sample data:

```bash
npm run seed
```

This will create:
- An admin user (username: admin, password: admin123)
- A director user (username: director, password: director123)
- Sample contracts, resources, and purchase orders

**IMPORTANT:** After first login, immediately change these default passwords!

### 7. Start the Server

For production:

```bash
npm start
```

Or use a process manager like PM2:

```bash
npm install -g pm2
pm2 start server/index.js --name rrootshell-staffaug
pm2 save
pm2 startup
```

### 8. Configure Reverse Proxy (Recommended)

#### Using Nginx

Create a new Nginx configuration file:

```nginx
server {
    listen 80;
    server_name staffaug.rrootshell.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name staffaug.rrootshell.com;
    
    # SSL Configuration
    ssl_certificate /path/to/ssl/certificate.crt;
    ssl_certificate_key /path/to/ssl/private.key;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Test and reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

#### Using Apache

Enable required modules:

```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod ssl
```

Create a virtual host configuration:

```apache
<VirtualHost *:80>
    ServerName staffaug.rrootshell.com
    Redirect permanent / https://staffaug.rrootshell.com/
</VirtualHost>

<VirtualHost *:443>
    ServerName staffaug.rrootshell.com
    
    SSLEngine on
    SSLCertificateFile /path/to/ssl/certificate.crt
    SSLCertificateKeyFile /path/to/ssl/private.key
    
    ProxyPreserveHost On
    ProxyPass / http://localhost:5000/
    ProxyPassReverse / http://localhost:5000/
    
    # Security headers
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-XSS-Protection "1; mode=block"
</VirtualHost>
```

Reload Apache:

```bash
sudo systemctl reload apache2
```

### 9. Set Up SSL/TLS Certificate

Use Let's Encrypt for free SSL certificates:

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d staffaug.rrootshell.com
```

Or for Apache:

```bash
sudo apt-get install certbot python3-certbot-apache
sudo certbot --apache -d staffaug.rrootshell.com
```

### 10. Configure Firewall

If using UFW:

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 11. Set Up Automated Backups

Create a backup script `backup.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/rrootshell-staffaug"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup database
cp /path/to/project/database.sqlite $BACKUP_DIR/database_$DATE.sqlite

# Keep only last 30 days of backups
find $BACKUP_DIR -name "database_*.sqlite" -mtime +30 -delete
```

Add to crontab for daily backups:

```bash
chmod +x backup.sh
crontab -e
# Add: 0 2 * * * /path/to/backup.sh
```

### 12. Monitor the Application

Using PM2:

```bash
pm2 logs rrootshell-staffaug
pm2 monit
```

Set up monitoring and restart on failure:

```bash
pm2 startup
pm2 save
```

### 13. Post-Deployment Checklist

- [ ] Change default admin and director passwords
- [ ] Test login functionality
- [ ] Create a test contract and verify it appears on dashboard
- [ ] Add a test resource and purchase order
- [ ] Verify email notifications are being sent (check logs)
- [ ] Test all CRUD operations
- [ ] Verify rate limiting is working (make multiple rapid requests)
- [ ] Check that HTTPS is working correctly
- [ ] Test mobile responsiveness
- [ ] Set up monitoring alerts

## Maintenance

### Regular Updates

```bash
cd /path/to/project
git pull origin main
npm install
cd client && npm install
npm run build
pm2 restart rrootshell-staffaug
```

### Database Backup

Regular backups are crucial. The SQLite database is stored in `database.sqlite`.

### Log Rotation

Configure log rotation for PM2 logs:

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
```

## Troubleshooting

### Server Won't Start

1. Check if port 5000 is available:
   ```bash
   sudo lsof -i :5000
   ```

2. Check environment variables:
   ```bash
   cat .env
   ```

3. Check logs:
   ```bash
   pm2 logs rrootshell-staffaug
   ```

### Email Notifications Not Working

1. Verify SMTP settings in `.env`
2. Check server logs for email errors
3. Test SMTP credentials manually
4. For Gmail, ensure "Less secure app access" is enabled or use app-specific password

### Database Errors

1. Check file permissions:
   ```bash
   ls -la database.sqlite
   ```

2. Verify the database is not corrupted:
   ```bash
   sqlite3 database.sqlite "PRAGMA integrity_check;"
   ```

### Frontend Not Loading

1. Verify the build was successful:
   ```bash
   ls -la client/dist/
   ```

2. Check NODE_ENV is set to "production"
3. Clear browser cache
4. Check reverse proxy configuration

## Security Best Practices

1. **Keep Dependencies Updated**: Regularly run `npm audit` and update packages
2. **Monitor Logs**: Set up log monitoring and alerting
3. **Backup Database**: Implement automated daily backups
4. **Use Strong Passwords**: Enforce strong password policies
5. **Enable HTTPS**: Always use SSL/TLS in production
6. **Rate Limiting**: The system has rate limiting enabled by default
7. **Regular Security Audits**: Periodically review security settings

## Support

For issues and questions:
- Check the main README.md
- Review server logs
- Contact the development team

## License

ISC
