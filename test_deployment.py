#!/usr/bin/env python3
"""
Simple deployment test for the lead generation system
"""

import requests
import json

def test_deployment():
    """Test the deployment endpoints"""
    
    # Test health endpoint
    try:
        response = requests.get("http://localhost:5000/health")
        if response.status_code == 200:
            print("✅ Health check passed")
        else:
            print(f"❌ Health check failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Health check error: {e}")
    
    # Test lead submission
    test_lead = {
        "name": "Test User",
        "email": "test@example.com",
        "education": "B.Tech",
        "attended_webinar": "Yes",
        "downloaded_brochure": "Yes"
    }
    
    try:
        response = requests.post("http://localhost:5000/submit_lead", json=test_lead)
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Lead submission passed: {result.get('message', 'Success')}")
        else:
            print(f"❌ Lead submission failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Lead submission error: {e}")

if __name__ == "__main__":
    test_deployment() 