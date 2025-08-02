# Lead Generation Application Testing Script
# Run this script to test all functionality

Write-Host "🧪 LEAD GENERATION APPLICATION TESTING" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan

# Test 1: Backend Health Check
Write-Host "`n1. Testing Backend Health..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:5000/health" -Method GET
    Write-Host "✅ Backend is healthy: $($health.message)" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend health check failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 2: Submit New Lead
Write-Host "`n2. Testing Lead Submission..." -ForegroundColor Yellow
try {
    $newLead = @{
        name = "Alice Johnson"
        email = "alice.johnson@example.com"
        education = "B.Sc"
        attended_webinar = "No"
        downloaded_brochure = "No"
    } | ConvertTo-Json
    
    $result = Invoke-RestMethod -Uri "http://localhost:5000/submit_lead" -Method POST -ContentType "application/json" -Body $newLead
    Write-Host "✅ Lead submitted successfully:" -ForegroundColor Green
    Write-Host "   Score: $($result.score)" -ForegroundColor White
    Write-Host "   Summary: $($result.summary)" -ForegroundColor White
} catch {
    Write-Host "❌ Lead submission failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Update Lead (Download Brochure)
Write-Host "`n3. Testing Lead Update (Brochure Download)..." -ForegroundColor Yellow
try {
    $update = @{
        email = "alice.johnson@example.com"
        update = @{
            "Downloaded Brochure" = "Yes"
        }
    } | ConvertTo-Json
    
    $result = Invoke-RestMethod -Uri "http://localhost:5000/update_lead" -Method PATCH -ContentType "application/json" -Body $update
    Write-Host "✅ Lead updated successfully:" -ForegroundColor Green
    Write-Host "   Score: $($result.score)" -ForegroundColor White
    Write-Host "   Summary: $($result.summary)" -ForegroundColor White
} catch {
    Write-Host "❌ Lead update failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Update Lead (Webinar Attendance)
Write-Host "`n4. Testing Lead Update (Webinar Attendance)..." -ForegroundColor Yellow
try {
    $update = @{
        email = "alice.johnson@example.com"
        update = @{
            "Attended Webinar" = "Yes"
        }
    } | ConvertTo-Json
    
    $result = Invoke-RestMethod -Uri "http://localhost:5000/update_lead" -Method PATCH -ContentType "application/json" -Body $update
    Write-Host "✅ Lead updated successfully:" -ForegroundColor Green
    Write-Host "   Score: $($result.score)" -ForegroundColor White
    Write-Host "   Summary: $($result.summary)" -ForegroundColor White
} catch {
    Write-Host "❌ Lead update failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 5: Check Data Storage
Write-Host "`n5. Checking Data Storage..." -ForegroundColor Yellow
try {
    $leads = Get-Content "leads_data.json" | ConvertFrom-Json
    Write-Host "✅ Data storage working. Total leads: $($leads.Count)" -ForegroundColor Green
    foreach ($lead in $leads) {
        Write-Host "   - $($lead.Name) ($($lead.Email)): Score $($lead.Score)" -ForegroundColor White
    }
} catch {
    Write-Host "❌ Data storage check failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 6: Frontend Access
Write-Host "`n6. Testing Frontend Access..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080" -Method GET
    Write-Host "✅ Frontend is accessible (Status: $($response.StatusCode))" -ForegroundColor Green
} catch {
    Write-Host "❌ Frontend access failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 7: Test Different Education Levels
Write-Host "`n7. Testing Different Education Levels..." -ForegroundColor Yellow
$educationLevels = @("B.Tech", "B.Sc", "B.Com", "Diploma", "Other")
foreach ($education in $educationLevels) {
    try {
        $testLead = @{
            name = "Test $education User"
            email = "test.$($education.ToLower())@example.com"
            education = $education
            attended_webinar = "No"
            downloaded_brochure = "No"
        } | ConvertTo-Json
        
        $result = Invoke-RestMethod -Uri "http://localhost:5000/submit_lead" -Method POST -ContentType "application/json" -Body $testLead
        Write-Host "✅ $education - Score $($result.score)" -ForegroundColor Green
    } catch {
        Write-Host "❌ $education test failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n🎉 TESTING COMPLETE!" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "Frontend URL: http://localhost:8080" -ForegroundColor Green
Write-Host "Backend URL: http://localhost:5000" -ForegroundColor Green
Write-Host "Data File: leads_data.json" -ForegroundColor Green 