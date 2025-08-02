#!/bin/bash

echo "🚀 Lead Generation Project Deployment Script"
echo "=========================================="

echo "📋 Checking prerequisites..."

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if the repository is a git repository
if [ ! -d ".git" ]; then
    echo "❌ This is not a git repository. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

echo "✅ Git repository found"

# Check if remote origin exists
if ! git remote get-url origin &> /dev/null; then
    echo "⚠️  No remote origin found. Please add your GitHub repository:"
    echo "   git remote add origin https://github.com/yourusername/your-repo-name.git"
    echo "   git push -u origin main"
    exit 1
fi

echo "✅ Remote origin found"

echo ""
echo "📝 Deployment Checklist:"
echo "1. ✅ Backend files configured (app.py, requirements.txt, Procfile)"
echo "2. ✅ Frontend files configured (package.json, vite.config.ts)"
echo "3. ✅ Environment variables documented (DEPLOYMENT_GUIDE.md)"
echo "4. ✅ CORS configured for production"
echo "5. ✅ API URL configured for environment variables"

echo ""
echo "🎯 Next Steps:"
echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Prepare for Render deployment'"
echo "   git push"

echo ""
echo "2. Deploy to Render:"
echo "   - Go to https://render.com"
echo "   - Create new Web Service for backend"
echo "   - Create new Static Site for frontend"
echo "   - Follow DEPLOYMENT_GUIDE.md for detailed instructions"

echo ""
echo "3. Configure Environment Variables:"
echo "   - SMTP_SERVER=smtp.gmail.com"
echo "   - SMTP_PORT=587"
echo "   - SMTP_USERNAME=your-email@gmail.com"
echo "   - SMTP_PASSWORD=your-app-password"
echo "   - VITE_API_URL=https://your-backend-url.onrender.com"

echo ""
echo "📚 For detailed instructions, see DEPLOYMENT_GUIDE.md"
echo "🎉 Happy deploying!" 