# 📧 Email Setup Guide for Lead Generation Application

## 🔧 **Email Configuration**

Your application now includes email functionality that sends personalized emails based on lead scores. Here's how to set it up:

### **1. Gmail Setup (Recommended)**

#### **Step 1: Enable 2-Factor Authentication**
1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. This is required to generate an App Password

#### **Step 2: Generate App Password**
1. Go to Google Account → Security
2. Under "2-Step Verification" → "App passwords"
3. Generate a new app password for "Mail"
4. Copy the 16-character password

#### **Step 3: Update .env File**
Edit your `.env` file with your Gmail credentials:

```env
# Email Configuration
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-16-character-app-password

# Application Settings
FLASK_ENV=development
FLASK_DEBUG=True
```

### **2. Email Templates by Score**

#### **High Priority (Score 80-100)**
- Subject: "NxtWave - Your Lead Score: [Score]"
- Content: Premium program invitation
- Next Steps: Consultation call, advanced courses

#### **Medium Priority (Score 60-79)**
- Subject: "NxtWave - Your Lead Score: [Score]"
- Content: Program exploration invitation
- Next Steps: Course catalog, webinar, advisor connection

#### **Standard (Score 0-59)**
- Subject: "NxtWave - Your Lead Score: [Score]"
- Content: General program information
- Next Steps: Brochure, introductory webinar, beginner courses

### **3. Testing Email Functionality**

#### **Test with Real Email:**
```powershell
# Test lead submission with email
Invoke-RestMethod -Uri "http://localhost:5000/submit_lead" -Method POST -ContentType "application/json" -Body '{"name":"Test User","email":"your-real-email@example.com","education":"B.Tech","attended_webinar":"No","downloaded_brochure":"No"}'
```

#### **Check Email Status:**
The API response now includes `email_sent` field:
```json
{
  "message": "New lead saved successfully.",
  "score": 30,
  "summary": "Test User is a B.Tech student...",
  "email_sent": true
}
```

### **4. Alternative Email Providers**

#### **Outlook/Hotmail:**
```env
SMTP_SERVER=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USERNAME=your-email@outlook.com
SMTP_PASSWORD=your-password
```

#### **Yahoo:**
```env
SMTP_SERVER=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USERNAME=your-email@yahoo.com
SMTP_PASSWORD=your-app-password
```

### **5. Troubleshooting**

#### **Email Not Sending:**
1. Check `.env` file exists and has correct credentials
2. Verify Gmail App Password is correct
3. Check console logs for error messages
4. Ensure 2-Factor Authentication is enabled

#### **Common Errors:**
- `Authentication failed`: Wrong password or username
- `Connection refused`: Check SMTP server and port
- `SSL/TLS required`: Use port 587 with STARTTLS

### **6. Security Notes**

⚠️ **Important:**
- Never commit `.env` file to version control
- Use App Passwords, not your main password
- Keep your credentials secure
- Consider using environment variables in production

### **7. Production Setup**

For production deployment:
1. Use environment variables instead of `.env` file
2. Set up proper email service (SendGrid, Mailgun, etc.)
3. Implement email templates with HTML formatting
4. Add email tracking and analytics

## 🚀 **Ready to Send Emails!**

Once you've configured your `.env` file with valid email credentials:

1. **Restart the backend**: `python app.py`
2. **Test with a real email address**
3. **Check your email inbox** for the personalized message
4. **Monitor console logs** for email status

**Your lead generation application now sends personalized emails based on engagement scores!** 📧✨ 