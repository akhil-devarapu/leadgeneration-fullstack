import requests
import json

def test_crewai_workflow():
    """Test the complete CrewAI workflow"""
    
    base_url = "http://localhost:5000"
    
    # Test 1: Submit a new lead
    print("🧪 Testing Lead Submission...")
    new_lead = {
        "name": "Alice Johnson",
        "email": "alice@example.com", 
        "education": "B.Tech",
        "attended_webinar": "Yes",
        "downloaded_brochure": "Yes"
    }
    
    try:
        response = requests.post(f"{base_url}/submit_lead", json=new_lead)
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Lead submitted successfully!")
            print(f"   Message: {result['message']}")
            print(f"   Score: {result['score']}")
            print(f"   Summary: {result['summary'][:100]}...")
        else:
            print(f"❌ Error: {response.text}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    print("\n" + "="*50 + "\n")
    
    # Test 2: Update existing lead
    print("🧪 Testing Lead Update...")
    update_data = {
        "email": "alice@example.com",
        "update": {
            "Attended Webinar": "Yes",
            "Downloaded Brochure": "No"
        }
    }
    
    try:
        response = requests.patch(f"{base_url}/update_lead", json=update_data)
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Lead updated successfully!")
            print(f"   Message: {result['message']}")
            print(f"   Score: {result['score']}")
            print(f"   Summary: {result['summary'][:100]}...")
        else:
            print(f"❌ Error: {response.text}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    print("\n" + "="*50 + "\n")
    
    # Test 3: Submit another lead
    print("🧪 Testing Another Lead...")
    another_lead = {
        "name": "Bob Smith",
        "email": "bob@example.com",
        "education": "B.Sc",
        "attended_webinar": "No",
        "downloaded_brochure": "No"
    }
    
    try:
        response = requests.post(f"{base_url}/submit_lead", json=another_lead)
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Second lead submitted successfully!")
            print(f"   Message: {result['message']}")
            print(f"   Score: {result['score']}")
            print(f"   Summary: {result['summary'][:100]}...")
        else:
            print(f"❌ Error: {response.text}")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_crewai_workflow() 