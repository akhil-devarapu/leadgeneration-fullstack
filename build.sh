#!/bin/bash

echo "🚀 Building Lead Generation System for Render..."

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

# Install Node.js dependencies and build frontend
echo "📦 Installing Node.js dependencies..."
npm install

echo "🔨 Building frontend..."
npm run build

echo "✅ Build completed successfully!"
echo "📁 Frontend build output: ./dist"
echo "🐍 Python backend ready: app.py" 