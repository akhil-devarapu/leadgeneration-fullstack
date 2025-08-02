# Lead Generation System with CrewAI

A full-stack lead generation application built with React frontend and Flask backend, powered by CrewAI for intelligent lead processing and email automation.

## 🚀 Features

- **CrewAI Workflow**: Intelligent lead processing with specialized agents
- **Lead Scoring**: Automated scoring based on education and engagement
- **Personalized Emails**: Dynamic email content based on lead category
- **CSV Storage**: Persistent data storage with CSV files
- **Real-time Updates**: Lead updates trigger re-scoring and new emails
- **Modern UI**: Beautiful React interface with Shadcn/ui components

## 🏗️ Architecture

### Backend (Flask + CrewAI)
- **Lead Reader Agent**: Manages CSV data storage
- **Scoring Agent**: Calculates lead scores (50-100)
- **Summary Agent**: Generates personalized email content
- **Email Agent**: Sends emails (with test mode support)

### Frontend (React + Vite)
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Shadcn/ui**: Beautiful, accessible components
- **Real-time Updates**: Dynamic form handling and validation

## 🛠️ Tech Stack

### Backend
- **Flask**: Python web framework
- **CrewAI**: Multi-agent workflow system
- **Pandas**: Data manipulation and CSV handling
- **Gunicorn**: Production WSGI server

### Frontend
- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: High-quality React components

## 📦 Installation

### Prerequisites
- Python 3.11+
- Node.js 18+
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd leadgeneration-fullstack
   ```

2. **Backend Setup**
   ```bash
   pip install -r requirements.txt
   python app.py
   ```

3. **Frontend Setup**
   ```bash
   npm install
   npm run dev
   ```

4. **Environment Variables**
   Create a `.env` file:
   ```env
   SMTP_SERVER=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USERNAME=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   ```

## 🚀 Deployment

### Render Deployment

1. **Backend Service**
   - Create new Web Service on Render
   - Environment: Python
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app --bind 0.0.0.0:$PORT`

2. **Frontend Service**
   - Create new Static Site on Render
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

3. **Environment Variables**
   - `SMTP_SERVER`: `smtp.gmail.com`
   - `SMTP_PORT`: `587`
   - `SMTP_USERNAME`: Your Gmail address
   - `SMTP_PASSWORD`: Your Gmail app password
   - `VITE_API_URL`: Your backend URL

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

## 🔧 Configuration

### Email Setup
1. Enable 2FA on your Gmail account
2. Generate an App Password
3. Use the App Password in SMTP_PASSWORD

### CORS Configuration
- Backend allows all origins for production
- Frontend automatically connects to backend

## 📊 API Endpoints

- `GET /health`: Health check
- `POST /submit_lead`: Submit new lead
- `PATCH /update_lead`: Update existing lead

## 🧪 Testing

Run the test suite:
```bash
python test_crewai_workflow.py
```

## 📁 Project Structure

```
leadgeneration-fullstack/
├── app.py                 # Flask backend
├── requirements.txt       # Python dependencies
├── Procfile             # Render deployment
├── runtime.txt          # Python version
├── agents/              # CrewAI agents
│   ├── lead_reader.py
│   ├── scoring_agent.py
│   ├── summary_agent.py
│   └── email_agent.py
├── crew/                # CrewAI configuration
│   ├── crew_definition.py
│   ├── agents.py
│   └── tasks.py
├── src/                 # React frontend
│   ├── pages/
│   ├── components/
│   └── App.tsx
├── package.json         # Node.js dependencies
└── vite.config.ts       # Vite configuration
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For deployment issues, see `DEPLOYMENT_GUIDE.md`.
For development issues, check the logs and test files.
