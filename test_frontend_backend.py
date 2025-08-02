import requests
import webbrowser

def test_frontend_backend():
    """Test frontend and backend connectivity"""
    
    print("🧪 Testing Frontend and Backend Connectivity...")
    
    # Test backend
    try:
        backend_response = requests.get("http://localhost:5000/health")
        if backend_response.status_code == 200:
            print("✅ Backend is running on http://localhost:5000")
        else:
            print("❌ Backend is not responding properly")
    except Exception as e:
        print(f"❌ Backend error: {e}")
    
    # Test frontend
    try:
        frontend_response = requests.get("http://localhost:8082")
        if frontend_response.status_code == 200:
            print("✅ Frontend is running on http://localhost:8082")
        else:
            print("❌ Frontend is not responding properly")
    except Exception as e:
        print(f"❌ Frontend error: {e}")
    
    print("\n" + "="*50)
    print("🌐 Opening Frontend in Browser...")
    print("Frontend URL: http://localhost:8082")
    print("Backend URL: http://localhost:5000")
    print("="*50)
    
    # Open frontend in browser
    webbrowser.open("http://localhost:8082")

if __name__ == "__main__":
    test_frontend_backend() 