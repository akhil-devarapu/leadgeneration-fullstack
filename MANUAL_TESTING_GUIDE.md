# 🧪 Manual Testing Guide for Lead Generation Application

## 📋 **Quick Test Summary**
✅ **All Automated Tests PASSED!**
- Backend API: ✅ Working
- Frontend: ✅ Accessible  
- Data Storage: ✅ Working
- Lead Scoring: ✅ Working
- Lead Updates: ✅ Working

## 🌐 **Access URLs**
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 🎯 **Manual Testing Steps**

### **1. Frontend Testing**

#### **Step 1: Open the Application**
1. Open your browser
2. Navigate to: `http://localhost:8080`
3. You should see the NxtWave dashboard

#### **Step 2: Test Student Registration**
1. Fill in the registration form:
   - **Name**: Your full name
   - **Email**: Your email address
   - **Education**: Select from dropdown (B.Tech, B.Sc, B.Com, Diploma, Other)
2. Click "Submit"
3. **Expected Result**: 
   - Form should be disabled after submission
   - "✓ Registration Complete" should appear
   - Download Brochure and Attend Webinar buttons should become enabled

#### **Step 3: Test Brochure Download**
1. Click "Download Brochure" button
2. **Expected Result**:
   - Google Drive link should open in new tab
   - Toast notification should appear: "Brochure opened!"
   - Lead score should increase (check backend logs)

#### **Step 4: Test Webinar Attendance**
1. Click "Join Webinar" button
2. **Expected Result**:
   - YouTube video should open in modal
   - Watch the video (or skip)
   - Click "Mark as Completed"
   - Toast notification should appear: "Webinar attended!"
   - Lead score should increase further

### **2. Backend API Testing**

#### **Test Lead Submission**
```bash
curl -X POST http://localhost:5000/submit_lead \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "education": "B.Tech",
    "attended_webinar": "No",
    "downloaded_brochure": "No"
  }'
```

#### **Test Lead Update**
```bash
curl -X PATCH http://localhost:5000/update_lead \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "update": {
      "Downloaded Brochure": "Yes"
    }
  }'
```

### **3. Data Verification**

#### **Check Stored Data**
```bash
# View the leads_data.json file
Get-Content leads_data.json | ConvertFrom-Json | Format-Table
```

#### **Expected Data Structure**
```json
[
  {
    "Name": "Student Name",
    "Email": "student@example.com",
    "Education": "B.Tech",
    "Attended Webinar": "Yes/No",
    "Downloaded Brochure": "Yes/No",
    "Created_At": "2025-08-01 17:34:23",
    "Score": 80,
    "Summary": "Student summary..."
  }
]
```

## 📊 **Scoring System Verification**

### **Base Scores by Education:**
- **B.Tech**: 30 points (10 base + 20 education)
- **B.Sc**: 30 points (10 base + 20 education)  
- **B.Com**: 20 points (10 base + 10 education)
- **Diploma**: 25 points (10 base + 15 education)
- **Other**: 20 points (10 base + 10 education)

### **Engagement Bonuses:**
- **Downloaded Brochure**: +20 points
- **Attended Webinar**: +30 points

### **Maximum Score**: 100 points

## 🔍 **Troubleshooting**

### **If Frontend Doesn't Load:**
1. Check if Node.js is running: `Get-Process | Where-Object {$_.ProcessName -like "*node*"}`
2. Restart frontend: `npm run dev`

### **If Backend Doesn't Respond:**
1. Check if Python is running: `Get-Process | Where-Object {$_.ProcessName -like "*python*"}`
2. Restart backend: `python app.py`

### **If Data Isn't Saving:**
1. Check file permissions for `leads_data.json`
2. Verify the file exists: `Get-ChildItem leads_data.json`

## 🎯 **Test Scenarios**

### **Scenario 1: New Student Registration**
1. Register a new student
2. Verify score calculation
3. Download brochure
4. Verify score increase
5. Attend webinar
6. Verify final score

### **Scenario 2: Returning Student**
1. Try to register with existing email
2. Verify data is updated, not duplicated
3. Check score recalculation

### **Scenario 3: Different Education Levels**
1. Test each education level
2. Verify different base scores
3. Test engagement activities

## ✅ **Success Criteria**

- [ ] Frontend loads without errors
- [ ] Registration form works
- [ ] Brochure download opens external link
- [ ] Webinar modal opens YouTube video
- [ ] Lead scores calculate correctly
- [ ] Data persists in JSON file
- [ ] API endpoints respond correctly
- [ ] CORS allows frontend-backend communication

## 🚀 **Ready to Test!**

Your application is fully functional and ready for testing. All automated tests have passed, and the system is working as expected.

**Happy Testing! 🎉** 