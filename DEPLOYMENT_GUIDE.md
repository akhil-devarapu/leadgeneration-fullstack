# Render Deployment Guide

## Prerequisites
- Render account
- GitHub repository with your project

## Backend Deployment

### 1. Create Backend Service on Render
1. Go to Render Dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `lead-generation-backend`
   - **Environment**: `Python`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app --bind 0.0.0.0:$PORT`

### 2. Environment Variables
Add these environment variables in Render:
- `SMTP_SERVER`: `smtp.gmail.com`
- `SMTP_PORT`: `587`
- `SMTP_USERNAME`: Your Gmail address
- `SMTP_PASSWORD`: Your Gmail app password

### 3. Deploy Backend
Click "Create Web Service" and wait for deployment.

## Frontend Deployment

### 1. Create Frontend Service on Render
1. Go to Render Dashboard
2. Click "New +" → "Static Site"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `lead-generation-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

### 2. Environment Variables
Add this environment variable:
- `VITE_API_URL`: `https://your-backend-service-name.onrender.com`

### 3. Deploy Frontend
Click "Create Static Site" and wait for deployment.

## Important Notes

### Email Configuration
- Use Gmail App Passwords (not regular password)
- Enable 2FA on your Gmail account
- Generate app password for this application

### CORS Configuration
- Backend is configured to allow all origins
- Frontend will automatically connect to backend

### File Storage
- CSV files will be stored in the Render filesystem
- Data will persist between deployments

## Testing Deployment

1. **Backend Health Check**: Visit `https://your-backend.onrender.com/health`
2. **Frontend**: Visit `https://your-frontend.onrender.com`
3. **Test Lead Submission**: Use the frontend to submit a test lead

## Troubleshooting

### Common Issues
1. **Build Failures**: Check Python/Node.js versions
2. **Email Not Sending**: Verify SMTP credentials
3. **CORS Errors**: Ensure backend allows all origins
4. **API Connection**: Verify VITE_API_URL is correct

### Logs
- Check Render logs for both services
- Backend logs will show email sending status
- Frontend logs will show build status 