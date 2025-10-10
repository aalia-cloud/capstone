# BeeSure Deployment Guide

## Overview

This guide covers deployment strategies for both the frontend React application and backend API server across different platforms and environments.

## Prerequisites

- Node.js 18+ installed
- Git repository access
- Domain name (for production)
- SSL certificate (for production)
- Cloud platform account (AWS, Vercel, Netlify, etc.)

## Environment Setup

### Environment Variables

#### Frontend (.env)
```bash
# API Configuration
VITE_API_BASE_URL=https://api.beesure.com
VITE_APP_NAME=BeeSure
VITE_APP_VERSION=1.0.0

# Blockchain Configuration
VITE_BLOCKCHAIN_NETWORK=polygon
VITE_CONTRACT_ADDRESS=0x742d35Cc6634C0532925a3b8D4C0C8b3C2e1e1e1
VITE_INFURA_PROJECT_ID=your_infura_project_id

# Analytics (Optional)
VITE_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
VITE_SENTRY_DSN=https://your-sentry-dsn
```

#### Backend (.env)
```bash
# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/beesure_db
SQLITE_DB_PATH=/app/data/beesure.db

# Security
SECRET_KEY=your-super-secret-key-here
JWT_SECRET=your-jwt-secret-key

# CORS Configuration
CORS_ORIGINS=https://beesure.com,https://www.beesure.com

# External Services
IPFS_GATEWAY_URL=https://gateway.pinata.cloud
BLOCKCHAIN_RPC_URL=https://polygon-rpc.com

# File Storage
UPLOAD_FOLDER=/app/uploads
MAX_FILE_SIZE=10485760  # 10MB
```

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login and deploy
   vercel login
   cd honey-marketplace
   vercel
   ```

2. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install --legacy-peer-deps`

3. **Environment Variables**
   Add environment variables in Vercel dashboard or via CLI:
   ```bash
   vercel env add VITE_API_BASE_URL production
   ```

### Option 2: Netlify

1. **Build Configuration** (netlify.toml)
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"
   
   [build.environment]
     NODE_VERSION = "18"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy via Git**
   - Connect GitHub repository
   - Set build command and publish directory
   - Add environment variables

### Option 3: AWS S3 + CloudFront

1. **Build Application**
   ```bash
   cd honey-marketplace
   npm run build
   ```

2. **Upload to S3**
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

3. **Configure CloudFront**
   - Create distribution pointing to S3 bucket
   - Set up custom error pages for SPA routing
   - Configure SSL certificate

### Option 4: Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   # Frontend Dockerfile
   FROM node:18-alpine as builder
   
   WORKDIR /app
   COPY package*.json ./
   RUN npm install --legacy-peer-deps
   
   COPY . .
   RUN npm run build
   
   FROM nginx:alpine
   COPY --from=builder /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/nginx.conf
   
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Build and Run**
   ```bash
   docker build -t beesure-frontend .
   docker run -p 80:80 beesure-frontend
   ```

## Backend Deployment

### Option 1: Heroku (Flask)

1. **Create Procfile**
   ```
   web: gunicorn -w 4 -b 0.0.0.0:$PORT src.main:app
   ```

2. **Requirements.txt**
   ```
   gunicorn==20.1.0
   # ... other dependencies
   ```

3. **Deploy**
   ```bash
   heroku create beesure-api
   heroku config:set SECRET_KEY=your-secret-key
   git push heroku main
   ```

### Option 2: AWS EC2

1. **Launch EC2 Instance**
   - Choose Ubuntu 20.04 LTS
   - Configure security groups (ports 80, 443, 22)
   - Set up Elastic IP

2. **Server Setup**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install dependencies
   sudo apt install python3 python3-pip nginx -y
   
   # Clone repository
   git clone <your-repo-url>
   cd honey-marketplace/honey-backend
   
   # Install Python dependencies
   pip3 install -r requirements.txt
   
   # Install Gunicorn
   pip3 install gunicorn
   ```

3. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name api.beesure.com;
   
       location / {
           proxy_pass http://127.0.0.1:5000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

4. **Create Systemd Service**
   ```ini
   [Unit]
   Description=BeeSure API
   After=network.target
   
   [Service]
   User=ubuntu
   WorkingDirectory=/home/ubuntu/honey-marketplace/honey-backend
   ExecStart=/usr/local/bin/gunicorn -w 4 -b 127.0.0.1:5000 src.main:app
   Restart=always
   
   [Install]
   WantedBy=multi-user.target
   ```

### Option 3: Docker (Backend)

1. **Create Dockerfile**
   ```dockerfile
   FROM python:3.9-slim
   
   WORKDIR /app
   
   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt
   
   COPY . .
   
   EXPOSE 5000
   
   CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "src.main:app"]
   ```

2. **Docker Compose**
   ```yaml
   version: '3.8'
   
   services:
     backend:
       build: ./honey-backend
       ports:
         - "5000:5000"
       environment:
         - DATABASE_URL=sqlite:///app.db
         - SECRET_KEY=your-secret-key
       volumes:
         - ./data:/app/data
   
     frontend:
       build: ./honey-marketplace
       ports:
         - "80:80"
       depends_on:
         - backend
   ```

### Option 4: Serverless (Vercel Functions)

1. **Convert to Serverless Functions**
   ```javascript
   // api/products.js
   export default function handler(req, res) {
     if (req.method === 'GET') {
       // Handle GET request
       res.json({ products: [] });
     }
   }
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

## Database Deployment

### SQLite (Development)
- File-based database
- Suitable for small applications
- Easy backup and migration

### PostgreSQL (Production)

1. **Managed Database (Recommended)**
   - AWS RDS
   - Google Cloud SQL
   - Heroku Postgres

2. **Self-hosted**
   ```bash
   # Install PostgreSQL
   sudo apt install postgresql postgresql-contrib
   
   # Create database and user
   sudo -u postgres createdb beesure_db
   sudo -u postgres createuser beesure_user
   ```

## SSL/HTTPS Configuration

### Let's Encrypt (Free SSL)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d api.beesure.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### CloudFlare (Recommended)
- Free SSL certificates
- CDN and DDoS protection
- Easy DNS management

## Monitoring and Logging

### Application Monitoring
```bash
# Install monitoring tools
npm install @sentry/react @sentry/node

# Configure error tracking
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
});
```

### Server Monitoring
```bash
# Install monitoring agents
sudo apt install htop iotop nethogs

# Log rotation
sudo nano /etc/logrotate.d/beesure
```

## Backup Strategy

### Database Backup
```bash
# PostgreSQL backup
pg_dump beesure_db > backup_$(date +%Y%m%d).sql

# SQLite backup
cp /app/data/beesure.db /backups/beesure_$(date +%Y%m%d).db
```

### File Backup
```bash
# Automated backup script
#!/bin/bash
tar -czf /backups/beesure_files_$(date +%Y%m%d).tar.gz /app/uploads
```

## Performance Optimization

### Frontend Optimization
- Enable gzip compression
- Implement CDN for static assets
- Use lazy loading for images
- Minimize bundle size

### Backend Optimization
- Database indexing
- Caching with Redis
- Connection pooling
- Load balancing

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Database credentials encrypted
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Input validation enabled
- [ ] Security headers configured
- [ ] Regular security updates

## Rollback Strategy

### Blue-Green Deployment
1. Deploy to staging environment
2. Test thoroughly
3. Switch traffic to new version
4. Keep old version for quick rollback

### Database Migrations
```bash
# Create migration backup
pg_dump beesure_db > pre_migration_backup.sql

# Run migration
python manage.py migrate

# Rollback if needed
psql beesure_db < pre_migration_backup.sql
```

## Troubleshooting

### Common Issues
1. **Build failures**: Check Node.js version compatibility
2. **CORS errors**: Verify origin configuration
3. **Database connection**: Check connection strings
4. **SSL issues**: Verify certificate installation

### Debug Commands
```bash
# Check application logs
tail -f /var/log/beesure/app.log

# Monitor system resources
htop

# Test API endpoints
curl -I https://api.beesure.com/health
```
